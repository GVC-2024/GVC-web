import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReservationPage.css';

function ReservationPage() {
    const [participantName, setParticipantName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [meetingStartTime, setMeetingStartTime] = useState('');
    const [meetingEndTime, setMeetingEndTime] = useState('');
    const [meetingContent, setMeetingContent] = useState('');
    const [emailError, setEmailError] = useState(false);

    const navigate = useNavigate();

    const handleInviteClick = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }
        alert('초대 완료했습니다');
    };

    const handleReserveClick = () => {
        alert('회의 예약이 완료되었습니다');
    };

    const handleBackClick = () => {
        navigate('/myconference'); // MyConference.js로 이동
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(value));
    };

    return (
        <div className='page'>
            <div className='title'>회의 예약</div>

            <div className='contentWrap'>
                <div className='inputTitle'>참석자명</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        value={participantName} 
                        onChange={(e) => setParticipantName(e.target.value)}
                    />
                </div>

                <div className='inputTitle'>아이디</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>

                <div className='inputTitle'>이메일 주소</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        value={email} 
                        onChange={handleEmailChange}
                    />
                    {emailError && <div className='error'>올바른 이메일 형식으로 입력해주세요.</div>}
                </div>

                <button 
                    onClick={handleInviteClick}
                    className='bottomButton'>
                    참석자 초대하기
                </button>

                <div className='inputTitle'>회의 이름</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        value={meetingName} 
                        onChange={(e) => setMeetingName(e.target.value)}
                    />
                </div>

                <div className='inputTitle'>회의 시간 설정하기</div>
                <div className='smallInputWrap'>
                    <input 
                        type='text'
                        className='smallInput'
                        value={meetingStartTime} 
                        onChange={(e) => setMeetingStartTime(e.target.value)}
                        placeholder='시작 시간'
                    />
                    <span className='separator'>-</span>
                    <input 
                        type='text'
                        className='smallInput'
                        value={meetingEndTime} 
                        onChange={(e) => setMeetingEndTime(e.target.value)}
                        placeholder='종료 시간'
                    />
                </div>

                <div className='inputTitle'>회의 내용</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        value={meetingContent} 
                        onChange={(e) => setMeetingContent(e.target.value)}
                    />
                </div>

                <div className='buttonWrap'>
                    <button 
                        onClick={handleReserveClick}
                        className='bottomButton'>
                        회의 예약하기
                    </button>

                    <button 
                        onClick={handleBackClick}
                        className='bottomButton'>
                        뒤로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReservationPage;
