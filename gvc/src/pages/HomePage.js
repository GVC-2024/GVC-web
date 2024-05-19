import LoginPage from "./LoginPage"; //로그인 페이지
import SignUp from "./SignUp"; //로그인 페이지SignUp

//스타일 로드
import "./HomePage.css";
//모듈 가져오기
import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'; //페이지 이동 .
import styled from "styled-components"; //버튼 만들기 위한 모듈
import { View, Dimensions, Image } from 'react-native'; //사진 크기 변화시키기 위한 모듈
import { useNavigate } from "react-router-dom"; //페이지 이동 시키는 모듈
//함수 정의

function HomePage() {

    //페이지 이동시키는 모듈
    const navigate = useNavigate();

    const [width, setWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); 

    // 버튼 클릭시 작동할 함수들
    const onClickButtonHold = () => {
        navigate("/loginPage");
    };
    const onClickButtonParticipate = () => {
        navigate("/loginPage");
    };
    const onClickButtonLogin = () => {
        navigate("/loginPage");
    };
    const onClickButtonRegister = () => {
        navigate("/signUp");
    };

    const Button = styled.button``;

    return (
        <div>
            <View style={{ flex: 1, backgroundColor: '#000000', alignItems: 'center' }}>
                <Image source={require('../image/homePage.jpg')}
                    style={{ width: width, height: 400 }}
                    resizeMode="stretch" />
                <div className="banner-txt">GLOBAL VIRTUAL Conference</div>

            </View>
            <div className="button_dv_style">
                <div  >
                    <Button className="button_style" onClick={onClickButtonHold}>Hold meeting</Button>
                </div>

                <div>
                    <Button className="button_style" onClick={onClickButtonParticipate}>participate meeting</Button>
                </div>
                <div>
                    <Button className="button_style" onClick={onClickButtonLogin}>Login</Button>
                </div>
                <div>
                    <Button className="button_style" onClick={onClickButtonRegister}>Register</Button>
                </div>
            </div>

            <Routes>
                <Route path="/loginPage" element={<LoginPage />} />
                <Route path="/loginPage" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default HomePage;