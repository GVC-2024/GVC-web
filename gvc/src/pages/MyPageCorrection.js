import './MyPageCorrection.css';

import { MyPage } from './MyPage';
import React, { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 


export function MyPageCorrection() {
  const navigate = useNavigate();

  const handleGoToMyPage = () => {
    navigate("/myPage");
  }

 
  const handleEditClick = () => {
    // 수정하기 버튼 클릭 시 동작
    console.log('수정하기 버튼 클릭');
  };

  return (
    <div className="MyPageCorrection">
      <h1>마이페이지</h1>
        <div className="MyInfo">
            <h3>나의 정보</h3>
            <div className="buttons-container">
              <button className="editbutton" onClick={() => handleEditClick()}>확정하기</button>
            </div>  
            <hr className="divider" />
            <label>아이디 &nbsp;</label>
            <input type="email" autofocus required />
            <br/>
            <label>비밀번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input type="text" autofocus required/>
            <br/>
            <label>이름(실명) &nbsp;</label>
            <input type="text" autofocus required/>
            <br/>
            <label>이메일  &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" autofocus required/>
            <br/>
            <label>휴대전화  &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" autofocus required/>
            <br/>
        </div>    
      <hr className="divider" />
      <h3>수신설정</h3>

      <Routes unmountOnNavigate>
            <Route path="/myPage" element={<MyPage />} />
      </Routes>
        
      </div>
  );
}

export default MyPageCorrection;
