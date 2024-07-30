import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

const Page = styled.div`
    position: relative;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 550px;
    padding: 0 20px;
    left: 50%;
    transform: translate(-49%, 0);
    overflow: hidden;
    flex-direction: column;
`;

const Title = styled.div`
    margin: 60px auto;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    font-stretch: expanded;
    color: black;
`;

const ContentWrap = styled.div`
    margin-top: 20px;
    flex: 1;
`;

const InputTitle = styled.div`
    margin-top: 10px;
    font-size: 15px;
    font-weight: 600;
    color: #0e0e0e;
`;

const InputWrap = styled.div`
    border-radius: 10px;
    padding: 16px;
    background-color: #ADC5FA;
    margin-top: 10px;

    &:focus-within {
        border: 2px solid #3c59ea;
    }
`;

const Input = styled.input`
    width: 100%;
    outline: none;
    border: none;
    height: 17px;
    font-size: 16px;
    font-weight: 400;
    background-color: #3c59ea02;

    &::placeholder {
        color: #6E6E6E;
        font-weight: 400;
    }
`;

const ErrorMessageWrap = styled.div`
    margin-top: 8px;
    color: #ed1a3a;
    font-size: 14px;
    font-weight: 400;
`;

const ButtonWrap = styled.div`
    width: 100%;
    margin-top: 10px;
    text-align: center;
`;

const BottomButton = styled.button`
    width: 100%;
    height: 58px;
    border: none;
    border-radius: 20px;
    font-weight: 700;
    font-size: 18px;
    background-color: #2969F3;
    color: white;
    margin-top: 30px;
    cursor: pointer;
`;

const BottomButton1 = styled.button`
    width: 100%;
    height: 58px;
    border: none;
    border-radius: 20px;
    font-weight: 700;
    font-size: 18px;
    background-color: #ADC5FA;
    color: white;
    margin-top: 10px;
    cursor: pointer;
`;

const Sub = styled.div`
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    color: #030000;
    margin-top: 15px;
    cursor: pointer;
`;

const Sub1 = styled.div`
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    color: #646464;
    margin-top: 30px;
`;

function LoginPage() {
    const navigate = useNavigate();

    const [uid, setUid] = useState('');
    const [pw, setPw] = useState('');

    const [uidValid, setUidValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (uidValid && pwValid) {
            setNotAllow(false);
        } else {
            setNotAllow(true);
        }
    }, [uidValid, pwValid]);

    const handleUid = (e) => {
        setUid(e.target.value);
        const regex = /^[a-zA-Z0-9]{4,}$/;
        setUidValid(regex.test(e.target.value));
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
        setPwValid(regex.test(e.target.value));
    };

    const onClickConfirmButton = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { uid, upassword: pw });
            if (response.status === 200) {
                const token = response.data.token; // 서버에서 반환된 토큰
                localStorage.setItem('token', token); // localStorage에 토큰 저장
                navigate('/'); // HomePage로 이동
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message); 
            } else {
                setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        }
    };

    const handleNavigateToLoginSearch = () => {
        navigate('/loginSearchPage');
    };

    const handleNavigateToSignUp = () => {
        navigate('/signUp');
    };

    return (
        <Page>
            <Title>로그인</Title>
            <ContentWrap>
                <InputTitle>아이디</InputTitle>
                <InputWrap>
                    <Input 
                        type='text'
                        placeholder='아이디를 입력해주세요'
                        value={uid} 
                        onChange={handleUid}/>
                </InputWrap>

                <InputTitle style={{ marginTop: "28px" }}>비밀번호</InputTitle>
                <InputWrap>
                    <Input 
                        type='password'
                        placeholder='비밀번호를 입력해주세요'
                        value={pw} 
                        onChange={handlePw}/>
                </InputWrap>
                <ErrorMessageWrap>
                    {!pwValid && pw.length > 0 && (
                        <div>올바른 비밀번호를 입력해주세요 </div>
                    )}
                </ErrorMessageWrap>
            </ContentWrap>

            <ButtonWrap>
                <BottomButton 
                    onClick={onClickConfirmButton}
                    disabled={notAllow}>
                    로그인
                </BottomButton>
            </ButtonWrap>
            <Sub onClick={handleNavigateToLoginSearch}>아이디/비밀번호 찾기</Sub>
            <Sub1>아직 회원이 아니신가요?</Sub1>
            <ButtonWrap>
                <BottomButton1 onClick={handleNavigateToSignUp}>
                    회원가입
                </BottomButton1>
            </ButtonWrap>
        </Page>
    );
}

export default LoginPage;
