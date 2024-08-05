import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MeetingSummary() {
    const { id } = useParams(); // URL에서 회의 ID를 가져옴
    const [meetingName, setMeetingName] = useState(() => localStorage.getItem(`meetingName_${id}`) || '');
    const [meetingDate, setMeetingDate] = useState(() => localStorage.getItem(`meetingDate_${id}`) || '');
    const [summary, setSummary] = useState(() => localStorage.getItem(`summary_${id}`) || '');

    useEffect(() => {
        // 로컬 스토리지에 데이터 저장
        localStorage.setItem(`meetingName_${id}`, meetingName);
        localStorage.setItem(`meetingDate_${id}`, meetingDate);
        localStorage.setItem(`summary_${id}`, summary);
    }, [id, meetingName, meetingDate, summary]);

    const handleSubmit = () => {
        console.log('Meeting Name:', meetingName);
        console.log('Meeting Date:', meetingDate);
        console.log('Summary:', summary);
        alert('저장되었습니다!');
        // 여기서 페이지 이동 대신 상태 갱신만 수행합니다.
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', margin: 'auto', paddingTop: '5vh' }}>
            <div style={{ width: '100%', maxWidth: '800px', border: '1px solid #ccc', padding: '30px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px' }}>회의 공유 노트</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '20px' }}>회의 이름</label>
                        <input
                            type="text"
                            value={meetingName}
                            onChange={(e) => setMeetingName(e.target.value)}
                            style={{ width: '100%', border: 'none', borderBottom: '2px solid #ccc', padding: '10px', outline: 'none', fontSize: '16px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '20px' }}>회의 날짜</label>
                        <input
                            type="date"
                            value={meetingDate}
                            onChange={(e) => setMeetingDate(e.target.value)}
                            style={{ width: '100%', border: 'none', borderBottom: '2px solid #ccc', padding: '10px', outline: 'none', fontSize: '16px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '20px' }}>노트내용</label>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            style={{ width: '100%', border: 'none', borderBottom: '2px solid #ccc', padding: '10px', outline: 'none', resize: 'none', height: '400px', fontSize: '16px' }}
                        />
                    </div>
                    <button type="submit"
                        style={{ width: '100%', padding: '8px 16px', backgroundColor: '#007BFF', color: 'white', margin: '0 auto', border: 'none', fontSize: '18px', display: 'block' }}>수정하기</button>
                </form>
            </div>
        </div>
    );
}

export default MeetingSummary;
