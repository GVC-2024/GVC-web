//PopUpPage
//스타일 로드
import "./PopUpPage.css";
//모듈 가져오기
import React, { useState } from 'react';
//안내 메세지
import PopUpComponentMessage from './PopUpComponentMessage'; //팝업창 임포트

//국가 언어 선택
import PopUpComponentSelectLanguage from './PopUpComponentSelectLanguage'; //팝업창 임포트

//회의 주최하기 수락 취소
import PopUpComponentOpenMeeting from './PopUpComponentOpenMeeting'; //팝업창 임포트

//회의 코드 입력하기
import PopUpComponentGoMeeting from './PopUpComponentGoMeeting'; //팝업창 임포트
//회의 세부내역 수정 및 삭제
import PopUpComponentSetMeetingDetails from './PopUpComponentSetMeetingDetails'; //팝업창 임포트


function PopUpPage() {
    //팝업창을 열떄 필요한 함수 및 사용방법.
//버튼 잘 작동하는지 테스트하는 페이지
//팝업창 열 것인지 아닌지의 상태를 줘야함.

    //어떤 팝업창을 열것인지에 대한 변수
    //true면 열린다.
    //noID,noMeeting,wrongPhoneNumber,wrongEmail,wrongPW
    const [isPopupOpen, setIsPopupOpen] = useState({
        noID:false,//안내 메세지를 전달하는 팝업창입니다.
        noMeeting:false,//안내 메세지를 전달하는 팝업창입니다.
        wrongPhoneNumber:false,//안내 메세지를 전달하는 팝업창입니다.
        wrongEmail:false,//안내 메세지를 전달하는 팝업창입니다.
        wrongPW:false,//안내 메세지를 전달하는 팝업창입니다.
        openMeeting:false,//미팅을 여는 팝업창입니다. 
        GoMeeting:false,//회의코드를 입력하는 팝업창입니다. 
        selectLanguage:false,//언어를 선택하는 팝업창입니다. 
        modifyMeetingDetails:false, //미팅 세부내역을 보고 수정하는 팝업창입니다. 
        addMeetingDetails:false//회의추가하는 팝업창입니다.
    });

    //미팅 세부 정보 설정
    //데이터 베이스에서 데이터를 가져와야하는 추가 코드가 필요하다.
    const [meetingDetails, setMeetingDetails] = useState({
        meetingName: "마케팅 전략",//
        meetingParticipants: "김철수",//
        meetingDay: "2024-06-18",//
        meetingTime: "10:00-11:00",//
    });

    //팝업 열기
    const handleOpenPopup = (e) => { 
        const { name } = e.target;
        setIsPopupOpen(prev => ({ ...prev, [name]: true }));

    };

    //상태 안내 팝업 닫기  
    const handleClosePopup = (name) => { 
        
        setIsPopupOpen(prev => ({ ...prev, [name]: false }));
    };

     //회의 시작할 것인지 상태 저장하는 코드
    //const [isStartMeeting, setIstartMeeting] = useState({});
    //회의 주최하기
    //isStartMeeting회의 주최할 것인지 
    const handleCloseOpenMeeting = (isStartMeeting,name) => { 
        //alert("isStartMeeting="+[isStartMeeting]); 값 알려주는 함수
        //setIstartMeeting(isStartMeeting);//그냥 변수값 변경으로 삭제 가능
        setIsPopupOpen(prev => ({ ...prev, [name]: false }));
        //
        //회의 주최하는 코드 짜야함. 
        //
    };

    //사용자에게 입력받은 회의 코드 저장하는 코드
    //const [inPutMeetintCode, setinPutMeetintCode] = useState({});

    //회의 코드 입력하고 들어하기
    //inPutMeetintCode-들어갈 회의의 코드 
    const handleCloseGoMeeting = (inPutMeetintCode,name) => { 
        //alert("inPutMeetintCode="+[inPutMeetintCode]);값알려주는 함수
        //setinPutMeetintCode(inPutMeetintCode);//그냥 변수값 변경으로 삭제 가능
        setIsPopupOpen(prev => ({ ...prev, [name]: false }));
        //
        //실제로 회의 코드가 있는지 확인하는 코드짜야함.
        //
        //회의 들어가는 코드  짜야함.
        //
    };

    //회의 언어 입력하고 들어하기
    //inPutMeetintCode-들어갈 회의의 코드 
    const handleCloseSelectLanguage = (selectLanguage,name) => { 
        //alert("inPutMeetintCode="+[inPutMeetintCode]);값알려주는 함수
        //setinPutMeetintCode(inPutMeetintCode);//그냥 변수값 변경으로 삭제 가능
        setIsPopupOpen(prev => ({ ...prev, [name]: false }));

        //회의 언어 설정하는 코드 짜야함

    };

    //회의 코드 수정하기. 
    //modifyType:수정할 타입. 수정안함-false,수정-change,삭제-delete,불참-absence
    //meetingName:회의 이름
    //meetingparticipants: 회의 참석자들.
    //meetingDay:회의 날짜.
    //meetingTime: 회의 개최 시간: hh:mm-hh:mm
    //name: 팝업창 종류
    const handleCloseModifyMeetingDetails = (modifyType, meetingName, meetingparticipants ,meetingDay, meetingTime, name) => { 
        //alert("inPutMeetintCode="+[inPutMeetintCode]);
        //setinPutMeetintCode(inPutMeetintCode);
        setIsPopupOpen(prev => ({ ...prev, [name]: false }));
        //데이터 베이스에 modifyType에 따라 
        //meetingCode, modifyType,meetingName, meetingparticipants ,meetingDay, meetingTime, name 변경해야 하는 코드 짜기
        
    };

/*안내 메세지 형태
<div>
                    <button className="button_style"  name ="버튼을 누르면 보여줄 수 있도록 이름을 임의로 지정-isPopupOpen에 창에 있는 이름이여야 한다." onClick={handleOpenPopup} >없는 아이디</button>
                </div>
                {isPopupOpen.지정한 이름 && (<PopUpComponentMessage message="전달할 메세지" name ="지정한 이름" onClose={handleClosePopup} />)}
*/

    //버튼을 설언하되, handleOpenPopup을 사용하여, isPopupOpen의 상태변수 값을 바꿔준다.
    //바꿔주었으면 팝업창이 뜰 수 있게끔 어딘가에 PopUpComponent를 선언해준다.*/
    
    return (

        <div>
            <div className="button_dv_style">
                /*없는 아이디 안내 */
                <div>
                    <button className="button_style"  name ="noID" onClick={handleOpenPopup} >없는 아이디</button>
                </div>
                {isPopupOpen.noID && (<PopUpComponentMessage message="존재하지 않는 아이디입니다" name ="noID" onClose={handleClosePopup} />)}
                /*없는 회의 안내 */
                <div>
                    <button className="button_style"  name ="noMeeting"  onClick={handleOpenPopup}>없는 회의</button>
                </div>
                {isPopupOpen.noMeeting && (<PopUpComponentMessage message="존재하지 않는 회의입니다" name ="noMeeting" onClose={handleClosePopup} />)}
                /*잘못된 전회번호 안내 */
                <div>
                    <button className="button_style" name ="wrongPhoneNumber" onClick={handleOpenPopup}>잘못된 전화번호</button>
                </div>
                {isPopupOpen.wrongPhoneNumber && (<PopUpComponentMessage  message="잘못된 전화번호입니다"  name ="wrongPhoneNumber" onClose={handleClosePopup} />)}
                /*잘못된 이메일 안내 */
                <div>
                    <button className="button_style" name ="wrongEmail" onClick={handleOpenPopup}>잘못된 이메일</button>
                </div>
                {isPopupOpen.wrongEmail && (<PopUpComponentMessage message="잘못된 이메일입니다"  name ="wrongEmail" onClose={handleClosePopup} />)}
                /*잘못된 비밀번호 안내 */
                <div>
                    <button className="button_style"   name ="wrongPW"  onClick={handleOpenPopup}>잘못된 비밀번호</button>
                </div>
                {isPopupOpen.wrongPW && (<PopUpComponentMessage message="잘못된 비밀번호입니다"  name ="wrongPW" onClose={handleClosePopup} />)}

                /*회의 주최하기 or 취소하기 팝업창 결과값: 회의 주최할 것인지 true, 회의 주최하지 않을 것인지-false*/
                <div>
                    <button className="button_style"  name ="openMeeting"  onClick={handleOpenPopup}>회의 주최하기</button>
                </div>
                {isPopupOpen.openMeeting && (<PopUpComponentOpenMeeting name ="openMeeting" onClose={handleCloseOpenMeeting} />)}

                /*회의 코드 입력하기 창 결과값: 회의코드 or false-취소*/
                <div>
                    <button className="button_style"  name ="GoMeeting"  onClick={handleOpenPopup}>회의 코드 입력하기</button>
                </div>
                {isPopupOpen.GoMeeting && (<PopUpComponentGoMeeting name ="GoMeeting" onClose={handleCloseGoMeeting} />)}

                /*회의 언어 입력하기 창 결과값: 나라이름 or false-취소*/
                <div>
                    <button className="button_style"  name ="selectLanguage"  onClick={handleOpenPopup}>회의 국가 입력하기</button>
                </div>
                {isPopupOpen.selectLanguage && (<PopUpComponentSelectLanguage name ="selectLanguage" onClose={handleCloseSelectLanguage} />)}

                /*회의 참석자 설정하기*/
                //입력값 및 결과값  meetingCode, modifyType,meetingName, meetingparticipants ,meetingDay, meetingTime, name
                <div>
                    <button className="button_style"  name ="modifyMeetingDetails"  onClick={handleOpenPopup}>회의 세부사항 편집</button>
                </div>
                {isPopupOpen.modifyMeetingDetails && (<PopUpComponentSetMeetingDetails 
                meetingName={meetingDetails.meetingName}
                meetingparticipants={meetingDetails.meetingParticipants}
                meetingDay={meetingDetails.meetingDay}
                meetingTime={meetingDetails.meetingTime}
                name ="modifyMeetingDetails" 
                onClose={handleCloseModifyMeetingDetails} />)}
                <div>
                    <button className="button_style"  name ="addMeetingDetails"  onClick={handleOpenPopup}>회의추가</button>
                </div>
                {isPopupOpen.addMeetingDetails && (<PopUpComponentSetMeetingDetails 
                meetingName={meetingDetails.meetingName}
                meetingparticipants={meetingDetails.meetingParticipants}
                meetingDay={meetingDetails.meetingDay}
                meetingTime={meetingDetails.meetingTime}
                name ="addMeetingDetails" 
                onClose={handleCloseModifyMeetingDetails} />)}
            </div>

            
        </div>
    );

}

export default PopUpPage;
