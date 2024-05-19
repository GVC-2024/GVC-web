import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
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
    const [formError, setFormError] = useState(false); // 폼 오류 상태

    const validateForm = () => {
        // 기본적인 유효성 검사 로직을 추가
        if (!userDetails.username || !userDetails.password || !userDetails.confirmPassword || !passwordMatch || showPhoneWarning) {
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 폼의 유효성을 검사
        if (validateForm()) {
            console.log('Form submitted:', userDetails);
            setFormError(false);
            // 폼 제출 후, 홈페이지로 
            window.location.href = '/home'; // 홈페이지 URL로 변경
        } else { // 오류 상태를 업데이트
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
        if (name === 'phoneNumber') {
            if (/^[0-9]*$/.test(value) || value === '') {
                setShowPhoneWarning(false);
            } else {
                setShowPhoneWarning(true);
                return;
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
                        onChange={handleInputChange}
                        value={userDetails.username}
                    />
                    <button type="button" className="check-username-btn">중복확인</button>
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
