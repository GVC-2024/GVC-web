import "./Header.css";
import logo from '../image/G.V.C Logo.png';
import MyPage from "./MyPage"; //로그인 페이지SignUp
import HomePage from "./HomePage";

//모듈 가져오기
import React from "react"; //기본 리엑트 모듈
import { Routes, Route } from 'react-router-dom'; //페이지 이동 .
import { useNavigate } from "react-router-dom"; //페이지 이동 시키는 모듈

const Header = () => {
    const navigate = useNavigate();

    const onClickButtonMyPage = () => {
        navigate("/myPage");
    };
    const navigateHomePage = () => {
        navigate("/");
    };
    
    return (


        <div>
            <div style={{
                    width: "100%",
                    textAlign: "center",
                    lineHeight: "0.1em",
                    margin: "40px 0 0px",
            }}
            >
                <div className="header-content">
                    <img src={logo} alt="G.V.C Logo" className="logo" />
                    <span className="site-name">GlobalVirtualConference.com</span>
                </div>
            </div>

            <nav className="wrapper">
            <div style={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                    textAlign: 'center',
                    cursor: 'pointer' 
                }} onClick={navigateHomePage}>G.V.C</div>
                <div>마이페이지</div>
                <div className="div_hover" onClick={onClickButtonMyPage}>나의 회의</div>
            </nav>

            <Routes>
                <Route path="/myPage" element={<MyPage />} />
            </Routes>




        </div>

    );
}

export default Header;