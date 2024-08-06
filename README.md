gvc 통합 사항 변경사항 정리 
- 화상회의 통합한 부분만 있음. 로그인 x

클라이언트 쪽
	1. pages-meeting에 페이지들 추가.
	
	2. pages-PopupPage- 이전에 만들어둔 팝업페이지 추가
	app.js에 이동할 수 있는 페이지 추가
		import WaitingRoomEnterPage from "./pages/meeting/WaitingRoomEnterPage";
	                <Route path="/WaitingRoomEnterPage" element={<WaitingRoomEnterPage/>}/>
	
	사용방법 popupguide.js 참고
		1. 종류: 단순 메세지 전달/ 회의 주최하기 수락 취소/ /언어 선택/ 미팅 세부 사항-시간 등 설정.

1.     const [isPopupOpen, setIsPopupOpen] = useState({
        noID:false,//안내 메세지를 전달하는 팝업창입니다.
    }); 에서 필요한 열 팝업창 변수를 정의한다.
  
    //팝업 열기 함수 정의
    const handleOpenPopup = (e) => { 
        const { name } = e.target;
        setIsPopupOpen(prev => ({ ...prev, [name]: true }));
    };

    //상태 안내 팝업 닫기  함수 정의
    const handleClosePopup = (name) => { 
        setIsPopupOpen(prev => ({ ...prev, [name]: false }));
    };
   //팝업창을 뷰 <div> 에 넣어준다. + 닫기 함수 등록,  name은 일관성이 있어야 한다. 
    {isPopupOpen.noID && (<PopUpComponentMessage message="존재하지 않는 아이디입니다" name ="noID" onClose={handleClosePopup} />)}


	3. Header.jsx에 일시적으로 주최하기2 버튼 추가
	    //샘솔 추가
	    const onClickOpenConference = () => {
	        navigate('/WaitingRoomEnterPage');
	    };
	//HomeMeetingPage
	                    <NavItem onClick={onClickOpenConference}>주최하기2 </NavItem>
	
	4. src에 PageRender.js 추가.
	app/사이드바가 담긴 파일-기존 index.js 내용 등.
	
	5. index.js 전반적으로 수정: 새로운 창-화상회의화면을 열때, app/사이드바를 보이게 하지 않게 하기 위해
	기본 페이지를  PageRender.js-(app/사이드바가 담김)와 HomeMeetingPage로 이동할 수 있게 함.
	
	
	import React from 'react';
	import ReactDOM from 'react-dom';
	import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
	import PageRender from './PageRender';
	import './index.css';
	import HomeMeetingPage from "./pages/meeting/HomeMeetingPage";
	
	import { createRoot } from 'react-dom/client';
	const container = document.getElementById('root');
	const root = createRoot(container);
	root.render(
	  <React.StrictMode>
	    <Router>
	      <Routes>
	        <Route path="/HomeMeetingPage" element={<HomeMeetingPage/>}/>
	        <Route path="/*" element={<PageRender/>}/>
	      </Routes>
	    </Router>
	  </React.StrictMode>
	);
	
	
	
	모듈 정리
	
	# Install Socket.IO client
	npm install socket.io-client
	
	# Install React Helmet Async
	npm install react-helmet-async
	
	1.
	import React, { useEffect } from 'react';
	import './HomeMeetingPage.css';
	import {Helmet, HelmetProvider} from 'react-helmet-async';
	import ReactDOM from 'react-dom';
	import { createRoot } from 'react-dom/client';
	import { useParams } from 'react-router-dom';
	import io from 'socket.io-client';
	2. 
	import React, { useEffect, useState } from 'react';
	import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
	import HomeMeetingPage from './HomeMeetingPage';
	import LoginPage from '../LoginPage';
	import axios from 'axios';
	import { useNavigate } from "react-router-dom"; 
	
	3.
	import React from 'react';
	import ReactDOM from 'react-dom';
	import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
	import PageRender from './PageRender';
	import { createRoot } from 'react-dom/client';
 
서버쪽

 서버 아래에 video_server추가.
 
3.package.json에 "video": "node video_server.js" 추가
  
2.실행 명령어: npm run video
   
1.설치한 모듈들:
  	npm install express
	npm install socket.io
	npm install cors
