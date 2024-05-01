//페이지 로드.
import HomePage from "./pages/HomePage"; //로그인 페이지
import LoginPage from "./pages/LoginPage"; //로그인 페이지SignUp
import SignUp from "./pages/SignUp"; //로그인 페이지SignUp
//스타일 로드
import "./App.css";
//모듈 가져오기
import React from "react"; //기본 리엑트 모듈
import { Routes, Route, Link } from 'react-router-dom'; //페이지 이동 .
//import styled from "styled-components"; //버튼 만들기 위한 모듈
//import { View, Dimensions, Image } from 'react-native'; //사진 크기 변화시키기 위한 모듈
//import { useNavigate } from "react-router-dom"; //페이지 이동 시키는 모듈

//함수 정의

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/loginPage" element={<LoginPage />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>

        </div>
    );
}

export default App;