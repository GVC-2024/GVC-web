// src/Popup.js
import React, { useState } from 'react';
import "./PopUpComponent.css";

//입력값:입력할 회의 코드, 팝업창 종류 
//결과값: 입력한 회의 코드-입력 안할 거면 false,팝업창 종류 
const PopUpComponentSelectLanguage = ({country_language, name, onClose }) => {
  //입력받는 회의 나라 변수
  const [country, setCountry] = useState('');

  //입력받으면 반영
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

 

  return (
    
    <div className='overlayScreen_style'>
      <div className='popupSmall_style'>
        <div className='popupHeader_style'>
        <p></p>
          <button onClick={() => onClose(country_language=false,name)} className='headerCloseButton_style'>X</button>
        </div>
        <div className='popupBody_GoMeeting_style'>
          <p className='popupBody_GoMeeting_p_style'>회의 시작전<br/> 언어를 선택해 주세요</p>
          <div>
            
          <select 
            value={country} 
            onChange={handleCountryChange}
            className="country_comboBox_style"
          >
            
            <option value="" disabled>언어 선택</option>
            <option value="kr">한국</option>
            <option value="us">미국</option>
            <option value="jp">일본</option>
            <option value="cn">중국</option>
          </select>
            </div>
            <button onClick={() => onClose(country_language=country,name)} className='country_comboBox_style_checkButton_style'>확인</button>
        </div>
      </div>
    </div>
  );
};  
  

export default PopUpComponentSelectLanguage;