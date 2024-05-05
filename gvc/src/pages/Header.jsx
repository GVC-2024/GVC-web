import "./Header.css";
import logo from '../image/G.V.C Logo.png';
import React from "react"; 
import { useNavigate } from "react-router-dom"; 

const Header = () => {
    const navigate = useNavigate();

    const onClickButtonMyPage = () => {
        navigate("/myconference");
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
                <div className="div_hover" onClick={onClickButtonMyPage}>나의 회의</div>
            </nav>
        </div>
    );
}

export default Header;
