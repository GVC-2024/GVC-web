import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginPage() {
    const navigate = useNavigate();

    const [uid, setUid] = useState('');
    const [pw, setPw] = useState('');

    const [uidValid, setUidValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const [errorMessage, setErrorMessage] = useState(''); // 추가된 부분

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
                navigate('/'); // HomePage로 이동
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message); // 추가된 부분
            } else {
                setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 추가된 부분
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
        <div className='page'>
            <div className='title'> 로그인 </div>
            <div className='contentWrap'>
                <br>
                </br>
                <br>
                </br>
                <div className='inputTitle'>아이디</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        placeholder='아이디를 입력해주세요'
                        value={uid} 
                        onChange={handleUid}/>
                </div>

                <div style={{ marginTop: "28px" }} className='inputTitle'>비밀번호</div>
                <div className='inputWrap'>
                    <input 
                        type='password'
                        className='input'
                        placeholder='비밀번호를 입력해주세요'
                        value={pw} 
                        onChange={handlePw}/>
                </div>
                <div className='errorMessageWrap'>
                    {!pwValid && pw.length > 0 && (
                        <div>올바른 비밀번호를 입력해주세요 </div>
                    )}
                    {errorMessage && (
                        <div>{errorMessage}</div> // 추가된 부분
                    )}
                </div>
            </div>

            <div className='buttonWrap'>
                <button 
                    onClick={onClickConfirmButton}
                    disabled={notAllow} 
                    className='bottomButton' >
                    로그인
                </button>
            </div>
            <div className='sub' onClick={handleNavigateToLoginSearch}>아이디/비밀번호 찾기</div>
            <div className='sub1'> 아직 회원이 아니신가요?</div>
            <div className='buttonWrap'>
                <button
                    onClick={handleNavigateToSignUp}
                    className='bottomButton1'>
                    회원가입
                </button>
            </div>
        </div>
    )
}

export default LoginPage;
