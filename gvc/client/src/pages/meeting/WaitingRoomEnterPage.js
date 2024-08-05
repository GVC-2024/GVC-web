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
    const newWindow = window.open(url, '_blank', 'width=800,height=600');
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
      </Routes>    </div>
  );
};

export default WaitingRoomEnterPage;
