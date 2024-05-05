import React from "react"; //기본 리엑트 모듈
import { Routes, Route, Link } from 'react-router-dom'; //페이지 이동 .

//페이지 로드.
import HomePage from "./pages/HomePage"; //로그인 페이지
import LoginPage from "./pages/LoginPage"; //로그인 페이지SignUp
import SignUp from "./pages/SignUp"; //로그인 페이지SignUp
import MeetingSummary from './pages/MeetingSummary';
import MyPage from './pages/MyPage';
import AISummary from './pages/AISummary';
//스타일 로드
import "./App.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/loginPage" element={<LoginPage />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/MyPage" element={<MyPage />} />
                <Route path="/meeting-summary/:id" element={<MeetingSummary />} />
                <Route path="/ai-summary/:id" element={<AISummary />} />
            </Routes>
        </div>
    );
}

export default App;