import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

// 스타일 정의
const GlobalStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, h6 {
    text-align: left;
  }
`;

const MyConferenceContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CalendarSection = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

const CalendarBody = styled.div`
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: #7CD7CA;
    border: 1px solid #ffe0b6;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    border-radius: 10px;
    box-shadow: 0px 0px 20px #e0e0e0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 10px;
  margin: 0 10px;
  font-size: 15px;
  background-color: #4F99D4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
  width: 90%;
`;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 80%;
  margin-right: 10px;
`;

const MeetingList = styled.ul`
  list-style-type: none;
  padding: 20;
`;

const MeetingItem = styled.li`
  margin-bottom: 10px;
`;

function MyConference() {
  const navigate = useNavigate();

  // 회의 일정 데이터 예시
  const initialMeetings = [
    { id: 1, title: '2024년 4월 15일 회의', time: '10:00' },
    { id: 2, title: '2024년 4월 16일 회의', time: '14:00' },
  ];

  const [meetings, setMeetings] = useState(initialMeetings);
  const [eventLink, setEventLink] = useState('');
  const [allowedUserId, setAllowedUserId] = useState('');
  const [savedLink, setSavedLink] = useState({ url: '', allowedUsers: [] });
  const [links, setLinks] = useState([]);
  const [allowedUserInputs, setAllowedUserInputs] = useState({});
  const [currentUserId, setCurrentUserId] = useState('');

  // 사용자 ID 설정 (JWT 토큰에서 사용자 ID 추출)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(decodedToken.uid);

        axios.get('http://localhost:5000/api/link/get-links', {
          headers: {
            'Authorization': `Bearer ${token}` // 'Bearer ' 접두사 추가
          }
        }).then(response => {
          setLinks(response.data);
        }).catch(error => {
          console.error('Error fetching links:', error);
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const navigateToWhen2Meet = () => {
    window.open('https://www.when2meet.com', '_blank');
  };

  const handleSaveLink = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/api/link/save-link', {
    url: eventLink,
    allowedUsers: [],
    ownerId: currentUserId
    }, {
    headers: {
    'Authorization': `Bearer ${token}`
    }
    }).then(response => {
    const newLink = {...response.data, LinkUsers: []}; // LinkUsers 초기화
    setLinks([...links, newLink]);
    setEventLink('');
    setAllowedUserInputs({...allowedUserInputs, [newLink.lid]: ''});
    }).catch(error => {
    console.error('Error saving link:', error);
    });
    };
    

    const handleAddAllowedUser = (linkId) => {
        console.log('사용자를 링크에 추가:', linkId);
        const userId = allowedUserInputs[linkId];
        const link = links.find(link => link.lid === linkId);
        
        if (userId && link && link.ownerId === currentUserId) {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:5000/api/link/add-user/${linkId}`, {
        userId: userId
        }, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
        }).then(response => {
        const updatedLinks = links.map(link =>
        link.lid === linkId ? {...link, LinkUsers: [...(link.LinkUsers || []), {userId}]} : link
        );
        setLinks(updatedLinks);
        setAllowedUserInputs({...allowedUserInputs, [linkId]: ''});
        }).catch(error => {
        console.error('사용자 추가 오류:', error);
        });
        } else if (link.ownerId !== currentUserId) {
        console.error('링크 주최자만 사용자를 추가할 수 있습니다.');
        }
        };

        const handleDeleteLink = (linkId) => {
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:5000/api/link/delete-link/${linkId}`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
            }).then(() => {
            setLinks(links.filter(link => link.lid !== linkId));
            }).catch(error => {
            console.error('링크 삭제 오류:', error);
            });
            };

  const handleEditClick = () => {
    console.log('수정하기 버튼 클릭');
  };

  const onClickButtonMeetingSum = (id) => {
    navigate(`/meeting-summary/${id}`);
  };

  const onClickButtonAISummary = (id) => {
    navigate(`/ai-summary/${id}`);
  };

  return (
    <>
      <GlobalStyle />
      <MyConferenceContainer>
        <h1>나의 회의 일정</h1>
        
        {/* 캘린더 섹션 */}
        <CalendarSection>
          <h2>캘린더</h2>
          <Divider />
          <CalendarBody>
            <Calendar />
          </CalendarBody>
          <ButtonsContainer>
            <Button onClick={navigateToWhen2Meet}>회의 예약</Button>
            <Button onClick={handleEditClick}>수정하기</Button>
          </ButtonsContainer>
        </CalendarSection>
        <Divider />

        {/* When2Meet 링크 섹션 */}
        <div>
          <h3>When2Meet 링크 관리</h3>
          <InputContainer>
            <Input
              type="text"
              placeholder="When2Meet 이벤트 링크를 여기에 붙여넣기"
              value={eventLink}
              onChange={(e) => setEventLink(e.target.value)}
            />
            <Button onClick={handleSaveLink}>링크 저장</Button>
          </InputContainer>
          
          {links.map(link => (
<div key={link.lid}>
<h4>예정된 회의 일정 예약 링크</h4>
<p>주최자: {link.ownerId}</p>
<a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
<p>허용된 사용자: {link.LinkUsers ? link.LinkUsers.map(user => user.userId).join(', ') : '없음'}</p>
{link.ownerId === currentUserId && (
<>
<Input
type="text"
placeholder="접근을 허용할 사용자 ID 입력"
value={allowedUserInputs[link.lid] || ''}
onChange={(e) => setAllowedUserInputs({...allowedUserInputs, [link.lid]: e.target.value})}
/>
<Button onClick={() => handleAddAllowedUser(link.lid)}>사용자 추가</Button>
<Button onClick={() => handleDeleteLink(link.lid)}>링크 삭제</Button>
</>
)}
</div>
))}



        </div>
        <Divider />
        
        {/* 나의 회의 기록 섹션 */}
        <div>
          <h3>나의 회의 기록 보기</h3>
          <MeetingList>
            {meetings.map((meeting) => (
              <MeetingItem key={meeting.id}>
                <strong>{meeting.title}</strong> {meeting.time}
                <Button onClick={() => onClickButtonMeetingSum(meeting.id)}>공유편집</Button>
                <Button onClick={() => onClickButtonAISummary(meeting.id)}>AI 요약</Button>
              </MeetingItem>
            ))}
          </MeetingList>
        </div>
      </MyConferenceContainer>
    </>
  );
}

export default MyConference;
