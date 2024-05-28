import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import './LoginPage.css';

import SignUp from "./SignUp"; //로그인 페이지SignUp
import { useNavigate } from "react-router-dom"; //페이지 이동 시키는 모듈

const Admin = {
    email: 'noonsong@sookmyung.ac.kr',
    pw: 'a1234'
}

function Login() {
    //페이지 이동시키는 모듈
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    
    useEffect(()=>{
        if (emailValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, pwValid]); 

    const handleEmail = (e)=> {
        setEmail(e.target.value)
        const regex = 
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }

    const handlePw = (e) => {
        setPw(e.target.value)
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    }

    const onClickConfirmButton = ()=> {
        if (email === Admin.email && pw === Admin.pw) {
            alert('로그인에 성공했습니다.');
            navigate('/');
        } else {
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
                    <Image source={require('../image/icon-login.png')}
                        style={{ width: 200, height: 200 }}
                        resizeMode="stretch" />
                </View>
            </div>
            <div className='titleWrap'>
                로그인
            </div>
            
            <div className='contentWrap'>
                <div className='inputTitle'>이메일 주소</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        placeholder='noonsong@sookmyung.ac.kr'
                        value={email} 
                        onChange={handleEmail}/>
                </div>
                <div className='errorMessageWrap'>
                {!emailValid && email.length>0 && (
                        <div>올바른 이메일을 입력해주세요.</div>
                )}
                </div>

                <div style={{marginTop:"28px"}} className='inputTitle'>비밀번호</div>
                <div className='inputWrap'>
                    <input 
                        //type='password'
                        className='input'
                        placeholder='영문 숫자 포함 4자 이상 입력해주세요.'
                        value = {pw} 
                        onChange={handlePw}/>
                </div>
                <div className='errorMessageWrap'>
                {!pwValid && pw.length>0 && (
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
                    disabled={notAllow} 
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
