// src/Popup.js
import React, { useState } from 'react';
import "./PopUpComponent.css";

//입력값
//modifyType:수정할 타입. 수정안함-false,수정-change,삭제-delete,불참-absence
//meetingName:회의 이름
//meetingparticipants: 회의 참석자들.
//meetingDay:회의 날짜.
//meetingTime: 회의 개최 시간: hh:mm-hh:mm
//name: 팝업창 종류



//결과값: meetingCode, modifyType,meetingName, meetingparticipants ,meetingDay, meetingTime, name
const PopUpComponentSetMeetingDetails = ({modifyType, meetingName, meetingparticipants ,meetingDay, meetingTime, name, onClose }) => {


    //modifyType, meetingName, meetingparticipants ,meetingDay, meetingTime, name,
    const [meetingDetails, setMeetingDetails] = useState({
        newMeetingName: meetingName,//
        newMeetingParticipants: meetingparticipants,//
        newMeetingDay: meetingDay,//
        newMeetingTime: meetingTime,//
    });

    

const handleMeetingDetailsChange = (e) => {
  const inputName = e.target.getAttribute('inputName');
  const value = e.target.value;
    setMeetingDetails(prev => ({ ...prev, [inputName]: value }));

  };
  //최종적인 입력값이 유효한지 확인해야함.
  //시간이 맞는지 확인한다.
  const CheckValidDataPatternTime = (timeData) => {
        // 시간 데이터의 형식을 확인
        const timeFormat = /^\d{2}:\d{2}-\d{2}:\d{2}$/;
        if (!timeFormat.test(timeData)) {
            return false; // 올바르지 않은 형식이면 유효하지 않음을 반환합니다.
        }
    
        // 시작 시간과 끝 시간을 분리합니다.
        const [startTime, endTime] = timeData.split("-");
        
        // 시간과 분을 분리하여 숫자로 변환합니다.
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);
        
        // 시간 범위가 올바른지 확인합니다.
        if (startHour < 0 || startHour > 24 || startMinute < 0 || startMinute >= 60 ||
            endHour < 0 || endHour > 24 || endMinute < 0 || endMinute >= 60) {
              
            return false; // 올바르지 않은 시간 범위이면 유효하지 않음을 반환합니다.
        }
    
        // 시작 시간이 끝 시간보다 이전인지 확인합니다.
        if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
            return false; // 시작 시간이 끝 시간보다 뒤에 있으면 유효하지 않음을 반환합니다.
        }
    
        return true; // 모든 조건을 만족하면 유효한 시간 데이터입니다.
  };

  //날짜 패턴에 맞는지 확인한다
  const CheckValidDataPatternday = (dayData) => {
    var dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormat.test(dayData);
    
  };
  //
const CheckValidDataTimeDayOverToday = (dateData) => {
    // 입력된 날짜를 JavaScript Date 객체로 변환합니다.
    const selectedDate = new Date(dateData);
    
    // 오늘 날짜를 가져옵니다.
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 정보를 제외하고 오늘의 시작 시간을 설정합니다.

    // 입력된 날짜가 오늘 이전인지 확인합니다.
    if (selectedDate < today) {
        return false; // 오늘 이전인 경우 유효하지 않음을 반환합니다.
    }

    return true; // 오늘 이후의 날짜인 경우 유효합니다.
};

const handleClose= (e) => {
  const { value } = e.target;
  if(value=="delete"){
    return onClose(modifyType=value, meetingDetails.newMeetingName, meetingDetails.newMeetingParticipants ,meetingDetails.newMeetingDay, meetingDetails.newMeetingTime,  name);
  }
  else if(value=="absence"){
    return onClose(modifyType=value, meetingDetails.newMeetingName, meetingDetails.newMeetingParticipants ,meetingDetails.newMeetingDay, meetingDetails.newMeetingTime,  name);
   
  }
  else if(value=="change"|| value=="add"){

    if(CheckValidDataPatternday(meetingDetails.newMeetingDay)==false){
      alert ("시간 날짜가 맞지 않습니다");
    }

    else if(CheckValidDataPatternTime(meetingDetails.newMeetingTime)==false){
      alert ("시간 형식이 맞지않습니다");
    }
    
    else if(CheckValidDataTimeDayOverToday(meetingDetails.newMeetingDay)==false){
      alert ("시간이 오늘 이후여야 합니다");
    }

    else{
      return onClose(modifyType=value, meetingDetails.newMeetingName, meetingDetails.newMeetingParticipants ,meetingDetails.newMeetingDay, meetingDetails.newMeetingTime,  name);

    }
  }

};

  return (
    
    <div className='overlayScreen_style'>
      <div className='popupBig_style'>
        <div className='popupHeader_style'>
        <p></p>
          <button onClick={() => onClose(modifyType=false, meetingDetails.newMeetingName, meetingDetails.newMeetingParticipants ,meetingDetails.newMeetingDay, meetingDetails.meetingTime,  name)} className='headerCloseButton_style'>X</button>
        </div>
        <div className='popupBigBody_style'>
            <p className='popupBigBody_p_style'>회의 이름</p>
            <div>
                <input className='inputMeetingName_style' inputName = "newMeetingName" type="text" value={meetingDetails.newMeetingName} onChange={handleMeetingDetailsChange} />
            </div>
            <p className='popupBigBody_p_style'>회의 참석자</p>
            <div>
                <input className='inputMeetingName_style' inputName = "newMeetingParticipants"  type="text" value={meetingDetails.newMeetingParticipants} onChange={handleMeetingDetailsChange} />
            </div>
            <p className='popupBigBody_p_style'>회의 날짜</p>
            <div>
                <input className='inputMeetingName_style' type="text" inputName = "newMeetingDay" value={meetingDetails.newMeetingDay} onChange={handleMeetingDetailsChange} />
            </div>
            <p className='popupBigBody_p_style'>회의 시간</p>
            <div>
                <input className='inputMeetingName_style' type="text" inputName = "newMeetingTime" value={meetingDetails.newMeetingTime} onChange={handleMeetingDetailsChange} />
            </div>
            <div className='checkButton_style_div_for_right'>
          {name=="modifyMeetingDetails" && (<div>
          <button onClick={handleClose} value="change" className='checkButton_style' >수정</button>
          <button onClick={handleClose} value="delete" className='checkButton_style' >삭제</button>
          <button onClick={handleClose} value="absence" className='checkButton_style'>불참</button>
          </div>
          )}

          {name=="addMeetingDetails" && (
          <button onClick={handleClose} value="add" className='checkButton_style'>추가</button>
          )}
          
          

            </div>
        </div>
      </div>
    </div>
  );
};  
  

export default PopUpComponentSetMeetingDetails;