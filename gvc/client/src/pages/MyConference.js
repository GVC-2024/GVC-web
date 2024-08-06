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
    border: 1px solid #7CD7CA;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    border-radius: 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 10px;
  margin: 0 10px;
  font-size: 13px;
  background-color:#7192c6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
padding: 10px 10px;
  margin: 0 10px;
  font-size: 13px;
  background-color: #344b47;
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
        setCurrentUserId(decodedToken.uid); // 현재 사용자 ID 설정

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
    window.open('https://www.when2meet.com', '_blank'); // When2Meet 사이트를 새 탭에서 열기
  };

  const handleSaveLink = () => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰을 가져옴
    axios.post('http://localhost:5000/api/link/save-link', {
      url: eventLink,
      allowedUsers: [],
      ownerId: currentUserId // 링크 소유자 ID 설정
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // 인증 헤더 추가
      }
    }).then(response => {
      const newLink = {...response.data, LinkUsers: []}; // 새 링크 데이터 생성 및 초기화
      setLinks([...links, newLink]); // 링크 목록 업데이트
      setEventLink(''); // 이벤트 링크 입력 필드 초기화
      setAllowedUserInputs({...allowedUserInputs, [newLink.lid]: ''}); // 허용된 사용자 입력 필드 초기화
    }).catch(error => {
      console.error('Error saving link:', error); // 링크 저장 오류 발생 시 콘솔에 로그 출력
    });
  };

     // 허용된 사용자 추가 함수
  const handleAddAllowedUser = (linkId) => {
    const userId = allowedUserInputs[linkId]; // 허용된 사용자 ID 가져옴
    const link = links.find(link => link.lid === linkId); // 링크 ID로 링크 데이터 찾기
    
    if (userId && link && link.ownerId === currentUserId) {
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰을 가져옴
      axios.post(`http://localhost:5000/api/link/add-user/${linkId}`, {
        userId: userId
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // 인증 헤더 추가
        }
      }).then(response => {
        const updatedLinks = links.map(link =>
          link.lid === linkId ? {...link, LinkUsers: [...(link.LinkUsers || []), {userId}]} : link
        ); // 링크 목록 업데이트
        setLinks(updatedLinks); // 링크 목록 상태 업데이트
        setAllowedUserInputs({...allowedUserInputs, [linkId]: ''}); // 허용된 사용자 입력 필드 초기화
      }).catch(error => {
        console.error('사용자 추가 오류:', error); // 사용자 추가 오류 발생 시 콘솔에 로그 출력
      });
    } else if (link.ownerId !== currentUserId) {
      console.error('링크 주최자만 사용자를 추가할 수 있습니다.'); // 주최자가 아닐 경우 오류 메시지 출력
    }
  };

    // 링크 삭제 함수
  const handleDeleteLink = (linkId) => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰을 가져옴
    axios.delete(`http://localhost:5000/api/link/delete-link/${linkId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // 인증 헤더 추가
      }
    }).then(() => {
      setLinks(links.filter(link => link.lid !== linkId)); // 링크 목록에서 삭제된 링크 제거
    }).catch(error => {
      console.error('링크 삭제 오류:', error); // 링크 삭제 오류 발생 시 콘솔에 로그 출력
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
              <DeleteButton onClick={() => handleDeleteLink(link.lid)}>링크 삭제</DeleteButton>
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
