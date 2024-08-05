// src/Popup.js
import React, { useState } from 'react';
import "./PopUpComponent.css";

//입력값:입력할 회의 코드, 팝업창 종류 
//결과값: 입력한 회의 코드-입력 안할 거면 false,팝업창 종류 
const PopUpComponentGoMeeting = ({inPutMeetintCode, name, onClose }) => {
  //입력받는 회의 코드 변수
  const [meetingCode, setMeetingCode] = useState('');

  //입력받으면 반영
  const handleMeetingCodeChange = (e) => {
    setMeetingCode(e.target.value);
  };


  return (
    
    <div className='overlayScreen_style'>
      <div className='popupSmall_style'>
        <div className='popupHeader_style'>
        <p></p>
          <button onClick={() => onClose(inPutMeetintCode=false,name)} className='headerCloseButton_style'>X</button>
        </div>
        <div className='popupBody_GoMeeting_style'>
          <p className='popupBody_GoMeeting_p_style'>회의 코드를 입력해 주세요</p>
          <div>
          <input
          className='inputMeetingCode_style'
            type="text"
            value={meetingCode}
            onChange={handleMeetingCodeChange}
            placeholder="000-000-000"
          />
            </div>
          <button onClick={() => onClose(inPutMeetintCode=meetingCode,name)} className='checkButton_style'>회의참여</button>
          <button onClick={() => onClose(inPutMeetintCode=false,name)} className='checkButton_style'>취소</button>
        </div>
      </div>
    </div>
  );
};  
  

export default PopUpComponentGoMeeting;