//페이지 로드.
import About from "./pages/About";
import LoginPage from "./pages/LoginPage"; //로그인 페이지

//스타일 로드
import "./App.css";
//모듈 가져오기
import React from "react"; //기본 리엑트 모듈
import { Routes, Route, Link } from 'react-router-dom'; //페이지 이동 .
import styled from "styled-components"; //버튼 만들기 위한 모듈
import { View, Dimensions, Image } from 'react-native'; //사진 크기 변화시키기 위한 모듈
import { useNavigate } from "react-router-dom"; //페이지 이동 시키는 모듈
//함수 정의

function App() {

    var { width } = Dimensions.get('window');
    //페이지 이동시키는 모듈
    const navigate = useNavigate();

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
        navigate("/loginPage");
    };

    const Button = styled.button``;

    return (
        <div className="App">
            <View style={{ flex: 1, backgroundColor: '#000000', alignItems: 'center' }}>
                <Image source={require('./image/homePage.jpg')}
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
                <Route path="/about" element={<About />} />
                <Route path="/loginPage" element={<LoginPage />} />
            </Routes>
        </div>
     );
}

export default App;