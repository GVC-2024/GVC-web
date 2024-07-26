import React, { useState, useRef } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phoneNumber: '',
        birthYear: '',
        birthMonth: '',
        birthDay: ''
    });

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [usernameValid, setUsernameValid] = useState(true);
    const [showPhoneWarning, setShowPhoneWarning] = useState(false);
    const [formError, setFormError] = useState(false);
    const [usernameStatus, setUsernameStatus] = useState(null);
    const [emailStatus, setEmailStatus] = useState(null);
    const [phoneStatus, setPhoneStatus] = useState(null);
    const usernameRef = useRef(null);

    const validateForm = () => {
        return userDetails.username && userDetails.password && userDetails.confirmPassword && passwordMatch && passwordValid && !showPhoneWarning && usernameStatus === 'available' && emailStatus === 'available' && phoneStatus === 'available';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const birthDate = `${userDetails.birthYear}-${userDetails.birthMonth}-${userDetails.birthDay}`;
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    uid: userDetails.username,
                    uname: userDetails.name,
                    uemail: userDetails.email,
                    upassword: userDetails.password,
                    utel: userDetails.phoneNumber,
                    ubirth: birthDate,
                });
                console.log('User registered:', response.data);
                setFormError(false);
                navigate('/');
            } catch (error) {
                console.error('Error registering user:', error);
                setFormError(true);
            }
        } else {
            setFormError(true);
        }
    };

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));

        if (name === 'password') {
            // Validate password: minimum 6 characters, must include letters and numbers
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/; 
            setPasswordValid(passwordRegex.test(value));
            setPasswordMatch(value === userDetails.confirmPassword);
        }

        if (name === 'confirmPassword') {
            setPasswordMatch(value === userDetails.password);
        }

        if (name === 'username') {
            const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
            setUsernameValid(usernameRegex.test(value));

            setUsernameStatus(null); 
            try {
                const response = await axios.post('http://localhost:5000/api/auth/check-username', { uid: value });
                setUsernameStatus('available');
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    setUsernameStatus('unavailable');
                } else {
                    console.error('Error checking username:', error);
                }
            }
        }

        if (name === 'email') {
            setEmailStatus(null); // Reset email availability check
            try {
                const response = await axios.post('http://localhost:5000/api/auth/check-email', { uemail: value });
                setEmailStatus('available');
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    setEmailStatus('unavailable');
                } else {
                    console.error('Error checking email:', error);
                }
            }
        }

        if (name === 'phoneNumber') {
            setPhoneStatus(null); // Reset phone number availability check
            if (/^[0-9]*$/.test(value) || value === '') {
                setShowPhoneWarning(false);
                try {
                    const response = await axios.post('http://localhost:5000/api/auth/check-phoneNumber', { utel: value });
                    setPhoneStatus('available');
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        setPhoneStatus('unavailable');
                    } else {
                        console.error('Error checking phone number:', error);
                    }
                }
            } else {
                setShowPhoneWarning(true);
            }
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-title">회원가입</div>
                <div className="input-group">
                    <label>아이디</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="아이디"
                        ref={usernameRef}
                        onChange={handleInputChange}
                        value={userDetails.username}
                    />
                    {!usernameValid && <div style = {{color: 'red'}}> 영문 또는 숫자를 포함하여 4자리 이상 입력해주세요.</div>} 
                    {usernameStatus === 'unavailable' && <div style={{ color: 'red' }}>이미 존재하는 아이디입니다.</div>}
                    {usernameStatus === 'available' && <div style={{ color: 'green' }}>사용 가능한 아이디입니다.</div>}
                </div>
                <div className="input-group">
                    <label>비밀번호</label>
                    <input type="password" name="password" placeholder="비밀번호" onChange={handleInputChange} />
                    {!passwordValid && <div style={{ color: 'red' }}>영문과 숫자를 포함하여 6자리 이상으로 입력해주세요.</div>}
                </div>
                <div className="input-group">
                    <label>비밀번호 확인</label>
                    <input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleInputChange} />
                    {!passwordMatch && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다</div>}
                </div>
                <div className="input-group">
                    <label>이름</label>
                    <input type="text" name="name" placeholder="이름" onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label>이메일</label>
                    <input type="email" name="email" placeholder="이메일" onChange={handleInputChange} />
                    {emailStatus === 'unavailable' && <div style={{ color: 'red' }}>이미 존재하는 이메일입니다.</div>}
                    {emailStatus === 'available' && <div style={{ color: 'green' }}>이메일을 사용할 수 있습니다.</div>}
                </div>
                <div className="input-group">
                    <label>전화번호</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="전화번호"
                        value={userDetails.phoneNumber}
                        onChange={handleInputChange}
                    />
                    {showPhoneWarning && <div style={{ color: 'red' }}>숫자로 입력해주세요.</div>}
                    {phoneStatus === 'unavailable' && <div style={{ color: 'red' }}>이미 가입된 전화번호입니다.</div>}
                    {phoneStatus === 'available' && <div style={{ color: 'green' }}>전화번호를 사용할 수 있습니다.</div>}
                </div>
                <div className="input-group">
                    <label>생년월일</label>
                    <div className="birthdate-fields">
                        <input type="text" id="birthYear" name="birthYear" placeholder="년(YYYY)" onChange={handleInputChange} />
                        <input type="text" id="birthMonth" name="birthMonth" placeholder="월(MM)" onChange={handleInputChange} />
                        <input type="text" id="birthDay" name="birthDay" placeholder="일(DD)" onChange={handleInputChange} />
                    </div>
                </div>
                {formError && <div style={{ color: 'red' }}>오류가 있습니다.</div>}
                <div className="input-group">
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
