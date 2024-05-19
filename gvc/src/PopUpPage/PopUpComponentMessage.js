// src/Popup.js
import React from 'react';
import "./PopUpComponent.css";
const PopUpComponentMessage = ({ message, name,onClose }) => {
  return (
    <div className='overlayScreen_style'>
      <div className='popupSmall_style'>
        <div className='popupHeader_style'>
        <p></p>
          <button onClick={() => onClose(name)} className='headerCloseButton_style'>X</button>
        </div>
        <div className='popupBody_style'>
          <p>{message}</p>
          <button onClick={() => onClose(name)} className='checkButton_style'>확인</button>
        </div>
      </div>
    </div>
  );
};  
  

export default PopUpComponentMessage;