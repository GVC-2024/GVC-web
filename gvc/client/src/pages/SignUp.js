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
    const [showPhoneWarning, setShowPhoneWarning] = useState(false);
    const [formError, setFormError] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const usernameRef = useRef(null);

    const validateForm = () => {
        return userDetails.username && userDetails.password && userDetails.confirmPassword && passwordMatch && !showPhoneWarning;
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
                navigate('/home');
            } catch (error) {
                console.error('Error registering user:', error);
                setFormError(true);
            }
        } else {
            setFormError(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));

        if (name === 'password' || name === 'confirmPassword') {
            const password = name === 'password' ? value : userDetails.password;
            const confirmPassword = name === 'confirmPassword' ? value : userDetails.confirmPassword;
            setPasswordMatch(password === confirmPassword);
        }

        if (name === 'username') {
            setUsernameAvailable(null); // Reset username availability check
        }

        if (name === 'phoneNumber') {
            if (/^[0-9]*$/.test(value) || value === '') {
                setShowPhoneWarning(false);
            } else {
                setShowPhoneWarning(true);
            }
        }
    };

    const checkUsernameAvailability = async () => {
        if (!userDetails.username) {
            setUsernameAvailable(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/check-username', {
                uid: userDetails.username,
            });
            setUsernameAvailable(true);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setUsernameAvailable(false);
            } else {
                console.error('Error checking username:', error);
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
                    <button type="button" className="check-username-btn" onClick={checkUsernameAvailability}>중복확인</button>
                    {usernameAvailable === false && <div style={{ color: 'red' }}>아이디가 이미 존재합니다.</div>}
                    {usernameAvailable === true && <div style={{ color: 'green' }}>아이디를 사용할 수 있습니다.</div>}
                </div>
                <div className="input-group">
                    <label>비밀번호</label>
                    <input type="password" name="password" placeholder="비밀번호" onChange={handleInputChange} />
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
