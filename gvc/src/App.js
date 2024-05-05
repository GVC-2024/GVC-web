import React from "react";
import { Routes, Route } from 'react-router-dom';

// 페이지와 컴포넌트 로드
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import MeetingSummary from './pages/MeetingSummary';
import AISummary from './pages/AISummary';

// 스타일 로드
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/loginPage" element={<LoginPage />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/myPage" element={<MyPage />} />
                <Route path="/meeting-summary/:id" element={<MeetingSummary />} />
                <Route path="/ai-summary/:id" element={<AISummary />} />
            </Routes>
        </div>
    );
}

export default App;
