import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 

import './Mypage.css';
import { MyPageCorrection } from './pages/MyPageCorrection';

export function MyPage() {
  const navigate = useNavigate();

  const [emailConsent, setEmailConsent] = useState(false);

  const handleEditClick = () => {
    // 수정하기 버튼 클릭 시 동작
    navigate("/mypagecorrection")
  };

  const handleCheckboxChange = () => {
    setEmailConsent(!emailConsent);
  };

  return (
    <div className="Mypage">
      <h1>마이페이지</h1>
        <div className="MyInfo">
            <h3>나의 정보</h3>
            <div className="buttons-container">
              <button className="editbutton" onClick={() => handleEditClick()}>수정하기</button>
            </div>  
            <hr className="divider" />
            <div>
              <label>아이디&nbsp;</label>
              <input type="email" required defaultValue="user123" disabled />
            </div>
            <br />
            <div>
              <label>비밀번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="password" required defaultValue="********" disabled />
            </div>
            <br />
            <div>
              <label>이름(실명)&nbsp;</label>
              <input type="text" required defaultValue="홍길동" disabled />
            </div>
            <br />
            <div>
              <label>이메일&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="email" required defaultValue="honggildong@example.com" disabled />
            </div>
            <br />
            <div>
              <label>휴대전화&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="tel" required defaultValue="010-1234-5678" disabled />
            </div>
            <br />
        </div>    
      <hr className="divider" />
      <h3>수신설정</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={emailConsent}
            onChange={handleCheckboxChange}
          />
          이메일 수신 동의
        </label>
      </div>

      <Routes unmountOnNavigate>
        <Route path="/mypagecorrection" element={<MyPageCorrection />} />
      </Routes>
    </div>
  );
}

export default MyPage;
