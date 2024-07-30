import React, { useState, useRef } from 'react'; 
import styled from 'styled-components'; 
import axios from 'axios'; // axios 임포트 (HTTP 요청을 위해)
import { useNavigate } from "react-router-dom"; 

// Container 스타일 정의 (화면 전체를 flex로 나누기)
const Container = styled.div`
    display: flex; // 좌우로 컨테이너를 나눔
    height: 100vh; // 전체 화면 높이
`;

// RightContainer 스타일 정의 (오른쪽 컨테이너)
const RightContainer = styled.div`
    flex: 1; // flex 비율 1
    display: flex; // flex 사용
    flex-direction: column; // 세로 방향 정렬
    justify-content: center; // 수직 중앙 정렬
    align-items: center; // 수평 중앙 정렬
    padding: 50px; // 내부 여백
    background-color: white; // 배경색 설정
    margin-bottom: 200px;
`;

// FormTitle 스타일 정의 (폼 제목)
const FormTitle = styled.h1`

    margin-bottom: 20px; // 아래 여백
    font-size: 40px; // 폰트 크기
    text-align: center; // 텍스트 중앙 정렬
    margin-left: 20px;
`;

// Subtitle 스타일 정의 (부제목)
const Subtitle = styled.p`
    margin-bottom: 30px; // 아래 여백
    font-size: 20px; // 폰트 크기
    color: #555; // 폰트 색상
    text-align: center; // 텍스트 중앙 정렬
    margin-left: 30px;
`;

// InputGroup 스타일 정의 (입력 그룹)
const InputGroup = styled.div`
    margin-bottom: 15px; // 아래 여백
    width: 120%; // 너비 설정
    display: flex; // flex 사용
    flex-direction: column; // 세로 방향 정렬
    align-items: center; // 수평 중앙 정렬
`;

// Input 스타일 정의 (입력 필드)
const Input = styled.input`
    width: 150%; // 너비 설정
    padding: 10px; // 내부 여백
    font-size: 19px; // 폰트 크기
    border: 1px solid #ddd; // 테두리 설정
    border-radius: 20px; // 둥근 모서리
    text-align: center; // 텍스트 중앙 정렬
`;

// ErrorMessage 스타일 정의 (에러 메시지)
const ErrorMessage = styled.div`
    color: red; // 글자 색상
    font-size: 11px; // 폰트 크기
    margin-top: 5px; // 위쪽 여백
`;

// Button 스타일 정의 (버튼)
const Button = styled.button`
    width: auto; // 너비 설정
    font-size: 25px; // 폰트 크기
    margin-left: 90px;
    background: none;
    color: #2969F3; 
    border: none; // 테두리 없음
    cursor: pointer; // 마우스 커서 모양
    margin-top: 20px; // 위쪽 여백
    font-weight: bold;
`;


// SignUp 컴포넌트 정의
const SignUp = () => {
    const navigate = useNavigate(); 
    const [userDetails, setUserDetails] = useState({
        username: '', 
        password: '', 
        confirmPassword: '', 
        name: '', 
        email: '', 
        phoneNumber: '', 
        birthDate: '' 
    });

    const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태
    const [passwordValid, setPasswordValid] = useState(true); // 비밀번호 유효성 상태
    const [usernameValid, setUsernameValid] = useState(true); // 아이디 유효성 상태
    const [showPhoneWarning, setShowPhoneWarning] = useState(false); // 전화번호 경고 표시 상태
    const [formError, setFormError] = useState(false); // 폼 에러 상태
    const [usernameStatus, setUsernameStatus] = useState(null); // 아이디 상태
    const [emailStatus, setEmailStatus] = useState(null); // 이메일 상태
    const [phoneStatus, setPhoneStatus] = useState(null); // 전화번호 상태
    const usernameRef = useRef(null); // 아이디 입력 필드 참조

    // 폼 유효성 검사 함수
    const validateForm = () => {
        return userDetails.username && userDetails.password && userDetails.confirmPassword && passwordMatch && passwordValid && !showPhoneWarning && usernameStatus === 'available' && emailStatus === 'available' && phoneStatus === 'available';
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 동작 방지
        if (validateForm()) { // 폼이 유효한 경우
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    uid: userDetails.username, // 아이디
                    uname: userDetails.name, // 이름
                    uemail: userDetails.email, // 이메일
                    upassword: userDetails.password, // 비밀번호
                    utel: userDetails.phoneNumber, // 전화번호
                    ubirth: userDetails.birthDate, // 생년월일
                });
                console.log('User registered:', response.data); // 성공 시 응답 데이터 출력
                setFormError(false); // 폼 에러 상태 초기화
                navigate('/'); // 홈 페이지로 이동
            } catch (error) { // 오류 발생 시
                console.error('Error registering user:', error); // 오류 출력
                if (error.response) {
                    console.error('Server response:', error.response.data); // 서버 응답 출력
                }
                setFormError(true); // 폼 에러 상태 설정
            }
        } else {
            setFormError(true); // 폼이 유효하지 않은 경우
        }
    };
    

    // 입력 필드 변경 핸들러
    const handleInputChange = async (e) => {
        const { name, value } = e.target; // 입력 필드의 이름과 값
        setUserDetails(prev => ({ ...prev, [name]: value })); // 상태 업데이트

        if (name === 'password') { // 비밀번호 필드인 경우
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/; // 비밀번호 정규식
            setPasswordValid(passwordRegex.test(value)); // 비밀번호 유효성 검사
            setPasswordMatch(value === userDetails.confirmPassword); // 비밀번호 일치 여부 검사
        }

        if (name === 'confirmPassword') { // 비밀번호 확인 필드인 경우
            setPasswordMatch(value === userDetails.password); // 비밀번호 일치 여부 검사
        }

        if (name === 'username') { // 아이디 필드인 경우
            const usernameRegex = /^[a-zA-Z0-9]{4,}$/; // 아이디 정규식
            setUsernameValid(usernameRegex.test(value)); // 아이디 유효성 검사

            setUsernameStatus(null); // 아이디 상태 초기화
            if(usernameRegex.test(value)){ //아이디가 4자리 이상인 경우 중복 체크 

                try {
                    const response = await axios.post('http://localhost:5000/api/auth/check-username', { uid: value }); // 아이디 중복 체크
                    setUsernameStatus('available'); // 아이디 사용 가능 상태
                } catch (error) {
                    if (error.response && error.response.status === 409) { // 아이디 중복인 경우
                        setUsernameStatus('unavailable'); // 아이디 사용 불가 상태
                    } else {
                        console.error('Error checking username:', error); // 오류 출력
                    }
                }
            }
        }
           

        if (name === 'email') { // 이메일 필드인 경우
            setEmailStatus(null); // 이메일 상태 초기화
            try {
                const response = await axios.post('http://localhost:5000/api/auth/check-email', { uemail: value }); // 이메일 중복 체크
                setEmailStatus('available'); // 이메일 사용 가능 상태
            } catch (error) {
                if (error.response && error.response.status === 409) { // 이메일 중복인 경우
                    setEmailStatus('unavailable'); // 이메일 사용 불가 상태
                } else {
                    console.error('Error checking email:', error); // 오류 출력
                }
            }
        }

        if (name === 'phoneNumber') { // 전화번호 필드인 경우
            setPhoneStatus(null); // 전화번호 상태 초기화
            if (/^[0-9]*$/.test(value) || value === '') { // 숫자인지 확인
                setShowPhoneWarning(false); // 경고 표시 숨기기
                try {
                    const response = await axios.post('http://localhost:5000/api/auth/check-phoneNumber', { utel: value }); // 전화번호 중복 체크
                    setPhoneStatus('available'); // 전화번호 사용 가능 상태
                } catch (error) {
                    if (error.response && error.response.status === 409) { // 전화번호 중복인 경우
                        setPhoneStatus('unavailable'); // 전화번호 사용 불가 상태
                    } else {
                        console.error('Error checking phone number:', error); // 오류 출력
                    }
                }
            } else {
                setShowPhoneWarning(true); // 경고 표시
            }
        }
    };

    // JSX 반환
    return (
        <Container>
           
            <RightContainer>
                <FormTitle>계정 생성</FormTitle>
                <Subtitle>아래의 빈칸을 모두 입력해주세요.</Subtitle>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Input
                            type="text"
                            name="username"
                            placeholder="아이디"
                            ref={usernameRef}
                            onChange={handleInputChange}
                            value={userDetails.username}
                        />
                        {!usernameValid && <ErrorMessage> 영문 또는 숫자를 포함하여 4자리 이상 입력해주세요.</ErrorMessage>}
                        {usernameStatus === 'unavailable' && <ErrorMessage> 이미 존재하는 아이디입니다.</ErrorMessage>}
                        {usernameStatus === 'available' && <ErrorMessage style={{color: 'green'}}>사용 가능한 아이디입니다.</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Input type="password" name="password" placeholder="비밀번호" onChange={handleInputChange} />
                        {!passwordValid && <ErrorMessage> 영문과 숫자를 포함하여 6자리 이상으로 입력해주세요.</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleInputChange} />
                        {!passwordMatch && <ErrorMessage> 비밀번호가 일치하지 않습니다</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Input type="text" name="name" placeholder="이름" onChange={handleInputChange} />
                    </InputGroup>
                    <InputGroup>
                        <Input type="email" name="email" placeholder="이메일" onChange={handleInputChange} />
                        {emailStatus === 'unavailable' && <ErrorMessage> 이미 존재하는 이메일입니다.</ErrorMessage>}
                        {emailStatus === 'available' && <ErrorMessage style={{color: 'green'}}> 이메일을 사용할 수 있습니다.</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="전화번호"
                            value={userDetails.phoneNumber}
                            onChange={handleInputChange}
                        />
                        {showPhoneWarning && <ErrorMessage>숫자로 입력해주세요.</ErrorMessage>}
                        {phoneStatus === 'unavailable' && <ErrorMessage>이미 가입된 전화번호입니다.</ErrorMessage>}
                        {phoneStatus === 'available' && <ErrorMessage style={{ color: 'green' }}>전화번호를 사용할 수 있습니다.</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="text"
                            id="birthDate"
                            name="birthDate"
                            placeholder="YYYY-MM-DD 형식으로 입력해주세요."
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                    {formError && <ErrorMessage>오류가 있습니다.</ErrorMessage>}
                    <Button type="submit">회원가입</Button>
                </form>
            </RightContainer>
        </Container>
    );
};

export default SignUp; 
