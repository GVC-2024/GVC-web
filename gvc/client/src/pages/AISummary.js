import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AISummary() {
    const { id } = useParams();
    const [meetingName, setMeetingName] = useState(() => localStorage.getItem(`ai_meetingName_${id}`) || '');
    const [meetingDate, setMeetingDate] = useState(() => localStorage.getItem(`ai_meetingDate_${id}`) || '');
    const [summary, setSummary] = useState(() => localStorage.getItem(`ai_summary_${id}`) || '');

    useEffect(() => {
        localStorage.setItem(`ai_meetingName_${id}`, meetingName);
        localStorage.setItem(`ai_meetingDate_${id}`, meetingDate);
        localStorage.setItem(`ai_summary_${id}`, summary);
    }, [id, meetingName, meetingDate, summary]);

    const handleSubmit = () => {
        alert('저장되었습니다!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', margin: 'auto', paddingTop: '5vh' }}>
            <div style={{ width: '100%', maxWidth: '800px', border: '1px solid #ccc', padding: '30px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px' }}>AI 회의 요약</h1>  
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
                        <label style={{ fontWeight: 'bold', fontSize: '20px' }}>회의 요약</label>  
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            style={{ width: '100%', border: 'none', borderBottom: '2px solid #ccc', padding: '10px', outline: 'none', resize: 'none', height: '400px', fontSize: '16px' }}  
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '8px 16px', backgroundColor: '#007BFF', color: 'white', border: 'none', fontSize: '18px', margin: '0 auto', display: 'block' }}>수정하기</button> 
                </form>
            </div>
        </div>
    );
}

export default AISummary;
