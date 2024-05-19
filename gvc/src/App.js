import React from "react";
import { Routes, Route } from 'react-router-dom';

// 페이지와 컴포넌트 로드
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import MyConference from "./pages/MyConference";
import MeetingSummary from './pages/MeetingSummary';
import AISummary from './pages/AISummary';
import ReservationPage from "./pages/ReservationPage";

// 스타일 로드
//<Route path="/login" element={<Login />} /> 
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/loginPage" element={<LoginPage />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/myconference" element={<MyConference />} />
                <Route path="/meeting-summary/:id" element={<MeetingSummary />} />
                <Route path="/ai-summary/:id" element={<AISummary />} />
                <Route path="/reservation" element={<ReservationPage />} />
            </Routes>
        </div>
    );
}

export default App;
