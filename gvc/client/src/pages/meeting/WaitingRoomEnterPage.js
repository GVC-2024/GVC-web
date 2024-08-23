import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeMeetingPage from './HomeMeetingPage';

import { useNavigate } from "react-router-dom"; 

const WaitingRoomEnterPage = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {


    const enterbtn = document.getElementById('enterRoom');

    function handleEnterRoom(event) {
      event.preventDefault();
      openMeeting(roomName, nickName);
    }

    if (enterbtn) {
      enterbtn.addEventListener('click', handleEnterRoom);
    }

    return () => {
      if (enterbtn) {
        enterbtn.removeEventListener('click', handleEnterRoom);
      }
    };
  }, [nickName, roomName]);



  function openMeeting(roomID, userNick) {

    const url = `/HomeMeetingPage?roomID=${encodeURIComponent(roomID)}&userNick=${encodeURIComponent(userNick)}`;
    window.open(url, '_blank', 'width=800,height=1000');
  }

  return (
    <div>
      <header>
        <h1>Meeting</h1>
      </header>
      <main>
        <form>
          <input id="nickName" type="text" required placeholder="Your Nickname" value={nickName} onChange={(e) => setNickName(e.target.value)} />
          <input id="roomName" type="text" required placeholder="Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          <input id="userID" type="text" required placeholder="User ID" value={userID} onChange={(e) => setUserID(e.target.value)} />
          <button id="enterRoom" type="submit">Enter Room</button>
        </form>
      </main>
      <Routes unmountOnNavigate>
        <Route path="/homeMeetingPage" element={<HomeMeetingPage />} />
      </Routes>
    </div>
  );
};

export default WaitingRoomEnterPage;
/*
    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();
  async function checkLoginStatus() {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/loginCheck',
        null,
        { withCredentials: true } // 클라이언트에서 쿠키와 세션을 사용하도록 설정
      );
      if (response.status === 200) {
        // 로그인 되어 있는 경우: 클라이언트에서 할 일
        alert('User logged in:', response.data);
      }
    } catch (error) {
      // 로그인 되어 있지 않은 경우: 로그인 페이지로 리디렉션 또는 다른 처리
      console.log('User not logged in, redirecting to login page', error.response.data.message);
      navigate("/loginPage");
    }
  }
*/