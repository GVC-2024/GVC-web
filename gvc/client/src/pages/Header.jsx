import logo from '../image/gvc logo.png';
import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import styled from 'styled-components';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const onClickButtonMyConference = () => {
        navigate("/myconference");
    };

    const onClickButtonMyPage = () => {
        navigate("/myPage");
    };

    const navigateHomePage = () => {
        navigate("/");
    };

    const onClickLogin = () => {
        navigate('/loginPage');
    };

    const onClickSignUp = () => {
        navigate('/SignUp');
    };

    const onClickLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div>
            <TopBar>
                <TopBarContent>
                
                            <LoginButton onClick={onClickLogin}>로그인</LoginButton>
                            <SignButton onClick={onClickSignUp}>회원가입</SignButton>

                </TopBarContent>
            </TopBar>
            <NavBar>
                <NavBarContent>
                    <LogoContainer onClick={navigateHomePage}>
                        <Logo src={logo} alt='gvc logo' />
                    </LogoContainer>
                    <NavItem onClick={onClickButtonMyPage}>마이페이지</NavItem>
                    <NavItem onClick={onClickButtonMyConference}>나의 회의</NavItem>
                    <NavItem onClick={onClickButtonMyPage}>참여하기 </NavItem>
                    <NavItem onClick={onClickButtonMyPage}>주최하기 </NavItem>
                </NavBarContent>
            </NavBar>
        </div>
    );
}

export default Header;

const TopBar = styled.div`
    width: 100%;
    background-color: #00031F;
    text-align: right;
    padding: 10px 0;
    box-sizing: border-box;
`;

const TopBarContent = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    font-family: 'SpoqaHanSansNeo-Regular', 'sans-serif'; 
`;

const LoginButton = styled.div`
    color: white;
    cursor: pointer;
    margin-right: 20px;
`;

const SignButton = styled.div`
    color: white;
    cursor: pointer;
`;

const NavBar = styled.nav`
    border-top: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 60px;

`;

const NavBarContent = styled.div`

    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justigy-content: space-between;
    font-family: 'SpoqaHanSansNeo-Regular', 'sans-serif'; 
    font-weight: light;
`;

const LogoContainer = styled.div`
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
    margin-right: auto;
    margin-left: 40px;
`;

const Logo = styled.img`
    width: 100px;
    height: auto;
    margin-right: 10px;
`;

const NavItem = styled.div`
    font-family: 'SpoqaHanSansNeo-Regular', 'sans-serif'; 
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    width: 100px;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    margin: 0 10px;
`;