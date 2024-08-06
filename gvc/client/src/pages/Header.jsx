import logo from '../image/gvc logo.png';
import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import styled from 'styled-components';
import profileIcon from '../image/profileIcon.png';

const Header = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태 변수
    const [showProfileMenu, setShowProfileMenu] = useState(false); // 프로필 메뉴 표시 여부를 관리하는 상태 변수
    const [userInfo, setUserInfo] = useState({ uid: '', uemail: '' }); // 사용자 정보를 저장하는 상태 변수

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
            const user = localStorage.getItem('user'); // 로컬 스토리지에서 사용자 정보 가져오기
            setIsLoggedIn(!!token); // 토큰이 존재하면 로그인 상태로 설정
            if (user) {
                try {
                    const parsedUser = JSON.parse(user);
                    setUserInfo(parsedUser); // 사용자 정보를 JSON 파싱하여 상태 변수에 설정
                } catch (error) {
                    console.error('Error parsing user info:', error); // JSON 파싱 오류 발생 시 콘솔에 로그 출력
                }
            }
        };

        checkLoginStatus(); // 컴포넌트가 마운트될 때 로그인 상태 체크
        window.addEventListener('storage', checkLoginStatus); // 로컬 스토리지 변경 이벤트 리스너 추가

        return () => {
            window.removeEventListener('storage', checkLoginStatus); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        };
    }, []);

    const onClickButtonMyConference = () => {
        navigate("/myconference"); // "나의 회의" 페이지로 이동
    };

    const onClickButtonMyPage = () => {
        navigate("/myPage"); // "마이페이지"로 이동
    };
    const onClickBOpenMeeting = () => {
        navigate("/waitingRoomEnterPage"); // "마이페이지"로 이동
    };

    const navigateHomePage = () => {
        navigate("/"); // 홈 페이지로 이동
    };

    const onClickLogin = () => {
        navigate('/loginPage'); // 로그인 페이지로 이동
    };

    const onClickSignUp = () => {
        navigate('/SignUp'); // 회원가입 페이지로 이동
    };

    const onClickLogout = () => {
        localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 제거
        setIsLoggedIn(false); // 로그인 상태 해제
        setShowProfileMenu(false); // 프로필 메뉴 숨기기
        navigate('/'); // 홈 페이지로 이동
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu); // 프로필 메뉴 표시 여부 토글
    };

    return (
        <div>
            <TopBar>
                <TopBarContent>
                    {isLoggedIn ? (
                        <>
                            <ProfileIcon src={profileIcon} onClick={toggleProfileMenu} /> {/* 프로필 아이콘 클릭 시 메뉴 토글 */}
                            <LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton> {/* 로그아웃 버튼 */}
                        </>
                    ) : (
                        <>
                            <LoginButton onClick={onClickLogin}>로그인</LoginButton> {/* 로그인 버튼 */}
                            <SignButton onClick={onClickSignUp}>회원가입</SignButton> {/* 회원가입 버튼 */}
                        </>
                    )}
                </TopBarContent>
                {showProfileMenu && (
                    <ProfileMenu>
                        <ProfileItem>{userInfo.uid}님 환영합니다</ProfileItem> {/* 사용자 아이디 표시 */}
                        <ProfileItem>{userInfo.uemail}</ProfileItem> {/* 사용자 이메일 표시 */}
                        <ProfileButton onClick={onClickButtonMyPage}>마이페이지</ProfileButton> {/* 마이페이지 버튼 */}
                    </ProfileMenu>
                )}
            </TopBar>
            <NavBar>
                <NavBarContent>
                    <LogoContainer onClick={navigateHomePage}>
                        <Logo src={logo} alt='gvc logo' /> {/* 로고 클릭 시 홈 페이지로 이동 */}
                    </LogoContainer>
                    <NavItem onClick={onClickButtonMyPage}>마이페이지</NavItem> {/* 네비게이션 아이템 */}
                    <NavItem onClick={onClickButtonMyConference}>나의 회의</NavItem> {/* 네비게이션 아이템 */}
                    <NavItem onClick={onClickButtonMyPage}>참여하기</NavItem> {/* 네비게이션 아이템 */}
                    <NavItem onClick={onClickBOpenMeeting}>주최하기</NavItem> {/* 네비게이션 아이템 */}
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


const ProfileIcon = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-right: 10px;
`;

const LogoutButton = styled.div`
    color: white;
    cursor: pointer;
    margin-right: 20px;
    padding: 5px;
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
    justify-content: space-between;
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
const ProfileMenu = styled.div`
    position: absolute;
    top: 50px;
    right: 40px;
    background-color: white;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1000;
`;

const ProfileItem = styled.div`
    margin: 15px 20px;
    font-size: 14px;
`;

const ProfileButton = styled.button`
    width: 50%;
    padding: 10px;
    margin: 10px;
    background-color: #7CD7CA;
    color: #00031F;
    align-items: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 10px;
    font-family: 'SpoqaHanSansNeo-Regular', 'sans-serif'; 
`;