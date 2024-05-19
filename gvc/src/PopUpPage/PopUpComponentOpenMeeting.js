// src/Popup.js
import React from 'react';
import "./PopUpComponent.css";
const PopUpComponentOpenMeeting = ({isStartMeeting, name, onClose }) => {



  return (
    
    <div className='overlayScreen_style'>
      <div className='popupSmall_style'>
        <div className='popupHeader_style'>
        <p></p>
          <button onClick={() => onClose(isStartMeeting=false,name)} className='headerCloseButton_style'>X</button>
        </div>
        <div className='popupBody_style'>
          <p>이 사이트에서 회의를 주최하시겠습니까?</p>
          <button onClick={() => onClose(isStartMeeting=true,name)} className='checkButton_style'>회의시작</button>
          <button onClick={() => onClose(isStartMeeting=false,name)} className='checkButton_style'>취소</button>
        </div>
      </div>
    </div>
  );
};  
  

export default PopUpComponentOpenMeeting;