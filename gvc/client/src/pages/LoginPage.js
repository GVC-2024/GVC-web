import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import './LoginPage.css';

import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const [uid, setUid] = useState('');
    const [pw, setPw] = useState('');

    const [uidValid, setUidValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
        if (uidValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [uidValid, pwValid]);

    const handleUid = (e) => {
        setUid(e.target.value);
        const regex = /^[a-zA-Z0-9]{4,}$/; // 4자 이상 영문 또는 숫자
        if (regex.test(e.target.value)) {
            setUidValid(true);
        } else {
            setUidValid(false);
        }
    }

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    }

    const onClickConfirmButton = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { uid, upassword: pw });
            alert('로그인에 성공했습니다.');
            navigate('/'); // HomePage로 이동
        } catch (error) {
            alert("등록되지 않은 회원입니다.");
        }
    }

    const handleNavigateToLoginSearch = () => {
        navigate('/loginSearchPage');
    }

    const handleNavigateToSignUp = () => {
        navigate('/signUp');
    }

    return (
        <div className='page'>
            <div className='title'>
                로그인/회원가입
            </div>
            <div>
                <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                    <Image source={require('../image/logo.JPG')}
                        style={{ width: 200, height: 200 }}
                        resizeMode="stretch" />
                </View>
            </div>
            <div className='titleWrap'>
                로그인
            </div>

            <div className='contentWrap'>
                <div className='inputTitle'>아이디</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        placeholder='아이디를 입력해주세요'
                        value={uid} 
                        onChange={handleUid}/>
                </div>
                <div className='errorMessageWrap'>
                {!uidValid && uid.length > 0 && (
                        <div>올바른 아이디를 입력해주세요. (4자 이상 영문 또는 숫자)</div>
                )}
                </div>

                <div style={{ marginTop: "28px" }} className='inputTitle'>비밀번호</div>
                <div className='inputWrap'>
                    <input 
                        type='password'
                        className='input'
                        placeholder='영문 숫자 포함 4자 이상 입력해주세요.'
                        value={pw} 
                        onChange={handlePw}/>
                </div>
                <div className='errorMessageWrap'>
                {!pwValid && pw.length > 0 && (
                        <div>영문, 숫자 포함 4자 이상 입력해주세요. </div>
                )}
                </div>
            </div>

            <div className='buttonWrap'>
                <button 
                    onClick={onClickConfirmButton}
                    disabled={notAllow} 
                    className='bottomButton' >
                로그인</button>
            </div>
            <div className='sub' onClick={handleNavigateToLoginSearch}>아이디/비밀번호 찾기</div>
            <div className='sub1'> 아직 회원이 아니신가요?</div>
            <div className='buttonWrap'>
                <button
                    onClick={handleNavigateToSignUp}
                    className='bottomButton1'>
                회원가입</button>
            </div>
        </div>
    )
}

function LoginPage() {
    return (
        <div> 
            <div>
                <Login/> 
            </div>     
        </div>
    );
}

export default LoginPage;
