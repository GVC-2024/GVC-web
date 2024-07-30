import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./MyConference.css";
import { useNavigate } from 'react-router-dom';

function MyConference() {
    const navigate = useNavigate();
    // 회의 일정 데이터 예시
    const initialMeetings = [
        { id: 1, title: '2024년 4월 15일 회의', time: '10:00' },
        { id: 2, title: '2024년 4월 16일 회의', time: '14:00' },
    ];

    const [meetings, setMeetings] = useState(initialMeetings);

    // 예약, 수정, 공유편집, AI 요약 버튼 클릭 시 동작 함수들
    const handleReserveClick = () => {
        navigate('/reservation');
    };

    const handleEditClick = () => {
        // 수정하기 버튼 클릭 시 동작
        console.log('수정하기 버튼 클릭');
    };

    const onClickButtonMeetingSum = (id) => {
     navigate(`/meeting-summary/${id}`);
    };

     const onClickButtonAISummary = (id) => {
        navigate(`/ai-summary/${id}`);
    };

    return (
        <div className="MyConference">
            <h1>나의 회의 일정</h1>

            {/* 캘린더 섹션 */}
            <div className="calendar-section">
                <div className="calendar">
                    <h3>캘린더</h3>
                    <hr className="divider" />
                    <div className="calendar-body">
                        {/* 여기에 달력을 만들거나 캘린더 컴포넌트를 추가할 수 있습니다. */}
                        <Calendar />
                    </div>
                    <div className="buttons-container">
                        <button className="reserve-button" onClick={handleReserveClick}>회의 예약</button>
                        <button className="edit-button" onClick={handleEditClick}>수정하기</button>
                    </div>
                </div>
            </div>
            <hr className="divider" />
            {/* 나의 회의 기록 섹션 */}
            <div className="meeting-record-section">
                <h3>나의 회의 기록 보기</h3>
                <ul className="meeting-list">
                    {meetings.map((meeting) => (
                        <li key={meeting.id} className="meeting-item">
                            <strong>{meeting.title}</strong> {meeting.time}
                            <button
                                className="share-button"
                                onClick={() => onClickButtonMeetingSum(meeting.id)}>공유편집
                            </button>
                            <button
                                className="summary-button"
                                onClick={() => onClickButtonAISummary(meeting.id)}>AI 요약
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MyConference;
