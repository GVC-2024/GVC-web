import React, { useEffect } from 'react';
import './HomeMeetingPage.css';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000'; // 서버 주소와 포트

function HomeMeetingPage() {
  useEffect(() => {

    //화면 요소 가져오기.
    const seeVideoLogButton = document.getElementById('see_video_log');
    const chatDiv = document.getElementById('chat');
    const videoGrid = document.querySelector('.video_grid');
    const chatArea = document.getElementById('chatArea');
    const chatBox =  document.getElementById('send_message');
    const chatMessage =  chatBox.querySelector('textarea');
    const settingDropdownMenu =  document.getElementById('setting_dropdown_menu');
    const muteImg = document.getElementById('muteImg');
    const videoImg = document.getElementById('videoImg');

    //버튼
    const mute = document.getElementById('mute');
    const video = document.getElementById('video');
    const chatSendBtn =  chatBox.querySelector('button');
    const chatExitBtn = document.getElementById('chat_exit');
    const exitBtn = document.getElementById('exit');
    const videoSettingBtn = document.getElementById("settingButton");
    //소켓 전송 .
    //정보 가져오기.
    const urlParams = new URLSearchParams(window.location.search);
    const inputRoomID = urlParams.get('roomID'); //방 이름
    const inputUserNick = urlParams.get('userNick'); //유저 이름
    const inputUserID = "1"; //유저 식별 번호.

    //변수 선언하기
    let myVideoStream=null; //현재 자신의 카메라 스트림.
    let peersConnection = {}; // peerSocketId //자신과 연결중인 peer소켓.
    let isDisplayChatLog = true; //chat log 보이기 숨기기
    const socket = io(SERVER_URL);

    // 연결이 성공했을 때 실행되는 핸들러
    socket.on('connect', () => {
      
      console.log("start");
      requestServerEnterRoom(inputRoomID, inputUserNick);
    });

    // 연결이 끊겼을 때 실행되는 핸들러
    socket.on('disconnect', () => {

    });

//
    
//
//페이지 전체 행동
//
// 페이지 시작-방 들어가기 요청. 

// 페이지 리로드 방지. 
document.addEventListener('keydown', function(event) {if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {event.preventDefault();}});
// beforeunload 이벤트- 사용자가 현재 페이지를 벗어나려고 할 때 발생하는 이벤트
// 주소창 재입력을 통한 페이지 리로드 시, 처리하기 위함- 리로드시 소켓이 끊어지기 때문.
// 현재 페이지에서 나가면, 자동으로 연결을 끊어버린다.  
window.addEventListener('beforeunload', function() {socket.emit("leaveRoom", inputRoomID, inputUserNick, socket.id);socket.disconnect();});
//
//페이지 컨트롤 버튼 관련
//
//페이지 종료 버튼 클릭 시 창 닫기. 
exitBtn.addEventListener('click', function() {socket.emit("leaveRoom", inputRoomID,inputUserNick, socket.id);socket.disconnect();window.close();}); 
//비디오 채팅 창 열고 닫기.
seeVideoLogButton.addEventListener('click', showVideoLog);
chatExitBtn.addEventListener('click', showVideoLog);
//댓글 보내기
chatSendBtn.addEventListener('click', sendMyMessage);
//공유 메모장은 share_note에 있음.
//일정관리는 아직 작성하지 않음.
videoSettingBtn.addEventListener('click', showSettingOption);//자기 비디오 설정.
mute.addEventListener('click', handleAudioOn); // 오디오 on off.
video.addEventListener('click', handleMyVideoOn); //비디오 on off


//
//socket 정리
//
//소켓 수신
//인원수 초과로 인한 방 참가 거부
socket.on("denialFull", async() => {alert("full member. denial enter");});
//방에 정상적으로 들어감. 
socket.on("enterRoom", async (users) => {handleEnter(users);});
// peer의 SDP를 수락하고 처리. SDP 형식을 받으면 이를 수용한다. 
socket.on("receiveAnswerOffer", async (answer,peerSocketId) => { console.log("received the answer"); peersConnection[peerSocketId].setRemoteDescription(answer); });
// peer의 addIceCandidate 설정 적용.  IceCandidate- 피어 간 통신에 사용할 수 있는 네트워크 경로 정보
socket.on("ice", async (ice,peerSocketId) => {console.log("received candidate"); peersConnection[peerSocketId].addIceCandidate(ice); });
//피어에게 정보 받기
socket.on("receiveOffer", async (offer, peerUser) => {console.log("get offer");handlePeerOffer(offer, peerUser)});
// 공지 받기
socket.on("getAnouncment",writeChatAnnouncement);
//메세지 받기
socket.on("getMessage", writeOtherMessage); 
//방에 들어갈때 이전 챗 기록 가져오기
socket.on("enterRoomChat", async(chatLog) => {handleEnterchat(chatLog);});
//피어방 나가기
socket.on("leavePeer",async(peerSocktId)=>{handleLeavePeer(peerSocktId)});
/*
//내방 나가기peerSocktId
socket.on("leaveMyRoom",async()=>{
    console.log("종료");
});
*/

//
//소켓 관련 함수
//
//비디오 관련
//
// 처음 방에 들어갈 수 있도록 요청
async function requestServerEnterRoom(roomName, userNickName) {  
    if (socket.disconnected) {socket.connect();}
    await socket.emit("requestServerEnterRoom", roomName, userNickName);
}
// 방에 들어가도 된다고 허락받음 => 정보 전송.
async function handleEnter(users){
    const usersNum = users.length;
    //let message=`${inputUserNick} enter`;
    //socket.emit("sendAnouncment", inputRoomID,inputUserNick, message);
    console.log(`usersNum: ${usersNum} handleEnter come`);
    await showMyVideo(); //자기 화면 송출
    console.log(`usersNum: ${usersNum} handleEnter come`);
    //혼자만 있는 경우 자기 화면만 자신에게 보여주고 끝.
    if (usersNum === 1) {
        console.log(`handleEnter-you first ${usersNum}`);
    }else{
    //다른 peer가 있는 경우, 각각에 대해 offer을 신청 해줘야 한다. 
        console.log(`handleEnter-other is in here ${usersNum}`);
        for (let i = 0; i < usersNum - 1; ++i) {
            try{
                console.log(`handleEnter-users- ${users[i].socketId}`);
                const newPeerConnection = createConnection(users[i]);
                const offer = await newPeerConnection.createOffer();
                await newPeerConnection.setLocalDescription(offer);
                //alert(`usersNum: enter: ${users[i].socketId}`);
                const myUserInformation ={socketId: socket.id, userNickName: inputUserNick};
                socket.emit("offer", offer, users[i].socketId, myUserInformation);
            }catch(e){
                console.log(`handleEnter-users-error ${e}`);
            }

        }
    }    
}
//peer의 연결 방식을 설정한다. 
async function handlePeerOffer(offer,peerUser){
        const peerSocketId=peerUser.socketId;
        
        const newPeer = createConnection(peerUser);
        await newPeer.setRemoteDescription(offer); // offer는 원격 피어로부터 전달된 SDP (Session Description Protocol) 형식의 설명서
        //alert(`${socket.id} / ${peerSocketId}`);
        const answer = await newPeer.createAnswer(); //Answer는 원격 피어의 Offer에 응답하는 SDP
        await newPeer.setLocalDescription(answer); // peer의 SDP를 설정하고 처리
        console.log("sent the answer");
        socket.emit("answerOffer", answer, peerSocketId);
}

function createConnection(peerUser) {
    const peerSocketId=peerUser.socketId;
    //RTCPeerConnection 객체를 생성하여 연결 방식 설정. IP 주소를 찾기 위한 프로토콜.
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    peerConnection.addEventListener("icecandidate", (data) => {sendIce(data, peerSocketId);}); // 연결방식 설정
    peerConnection.addEventListener("addstream", (data) => {newParticipant(data.stream,peerUser,"red");}); //비디오 레이아웃 생성
    myVideoStream.getTracks().forEach((track) => peerConnection.addTrack(track, myVideoStream)); //내 비디오 스트림 전달
    peersConnection[peerSocketId] = peerConnection;
    return peerConnection;
}

// ice 보내기
function sendIce(data, targetSocketID) {
    console.log("sent candidate");
    socket.emit("ice", data.candidate, targetSocketID);
}
//
//댓글 보내기.
//
function sendMyMessage(){
    //event.preventDefault();
    let message = chatMessage.value;
    if(message.length==0){
      console.log(`send message:noen`);
        return;
    }
    else{
        console.log(`send message:${message}`);
        socket.emit("sendMessage", inputRoomID,inputUserNick, message);
        writeMyMessage(message);
        chatMessage.value="";
    }
}
//피어가 나갈 때 수행할 것. 
function handleLeavePeer(peerSocktId) {
    //소켓 삭제
    peersConnection[peerSocktId].close();
    delete peersConnection[peerSocktId];
    removeVideo(peerSocktId);    //레이아웃 갱신
}
//방에 들어올 때 댓글 기록 가져오기. 
function handleEnterchat(chatLog){
    let chatNum=chatLog.length;
    for(let i=0;chatNum>i;i++){
        writeOtherMessage(chatLog[i].chatLogUser,chatLog[i].chatLogContent);
    }
}
//
//레이아웃 관리 함수
//
//
//채팅 관련 함수
//
//메세지 생성하기
//
//chat 중앙에 공지-떠남 등.
function writeChatAnnouncement(message){
    //event.preventDefault();
    let chat_announcement_container = document.createElement('div');
    chat_announcement_container.id = 'chat_announcement'; //css 설정 가져오기
    chat_announcement_container.innerText=message;
    chatArea.appendChild(chat_announcement_container);
}
// 내 메세지 생성
function writeMyMessage(message){

    let my_message_container = document.createElement('div');
    my_message_container.classList.add('show_my_message'); //css 설정 가져오기
    //html 생성하기
    my_message_container.innerHTML=`
    <div id="show_my_message">
        <div id="my_profile">
            <div id="my_name">me</div>
            <div id="my_img"></div>
        </div>
        <div id="my_text">${message}</div>
    </div>`;
    chatArea.appendChild(my_message_container);
}
// 남 메세지 생성
function writeOtherMessage(nick, message){
    //event.preventDefault();
    let other_message_container = document.createElement('div');
    
    other_message_container.classList.add('show_other_message');
    other_message_container.innerHTML=`
        <div id="show_other_message">
            <div id="other_profile">
                <div id="other_img"></div>
                <div id="other_name">${nick}</div>
            </div>
            <div id="other_text">${message}</div>
        </div>`;
    chatArea.appendChild(other_message_container);
}

//채팅창 숨기기/보이기
function showVideoLog() {
    if (isDisplayChatLog === false) {
        chatDiv.classList.remove('hide_out_screen');
        isDisplayChatLog=true;
    } else {
        chatDiv.classList.add('hide_out_screen');
        isDisplayChatLog=false;
        
    }

}
//
//자기 카메라 설정 관련
//
//자신의 비디오를 화면에 반영하기.
async function showMyVideo() {
    // 웹 페이지에서 카메라와 마이크 스트림을 관리하며, 특정 카메라를 선택하거나 기본적으로 사용자의 얼굴을 보여줄 수 있는 기능을 제공
    // initialConstrains: 초기 제약 조건. 카메라:끄기, 오디오: 끄기
    // facingMode: "user"로 설정하여 사용자가 자신의 얼굴을 보기.
    // navigator.mediaDevices.getUserMedia를 호출하고, 선택적으로 deviceId가 전달되면 cameraConstraints를 사용하고, 그렇지 않으면 initialConstrains를 사용
    // 성공적으로 스트림을 가져온 경우, myStream 변수에 스트림을 할당하고, myFace 요소의 srcObject를 설정하여 스트림을 표시
    // deviceId가 없는 경우(!deviceId), getCameras() 함수를 호출하여 사용 가능한 카메라 목록을 업데이트
    // 예외가 발생한 경우에는 콘솔에 에러 메시지를 출력
        const videoSetting={audio: true, video: true};
        myVideoStream = await navigator.mediaDevices.getUserMedia(videoSetting);
        const myUserInformation ={socketId: socket.id, userNickName: inputUserNick};
        newParticipant(myVideoStream, myUserInformation, "white");  
        //newParticipant에 의해, 비디오와 오디오가 켜져있으므로, 다시 끈다. 
        chageMyVideoOn();
        chageAudioOn();
}
//
//비디오 관련 함수
//
//
//음소거 하기
//
//소리 끊기
function chageAudioOn() { 
    myVideoStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
}
////음소거 버튼  숨기기 보이기
function chageMuteImg() {
    
    if (muteImg.classList.contains('fa-microphone')) {
        muteImg.classList.remove('fa-microphone');
        muteImg.classList.add('fa-microphone-slash');
    } else {
        muteImg.classList.remove('fa-microphone-slash');
        muteImg.classList.add('fa-microphone');
    }
}
//음소거 토글-이미지,소리.
function handleAudioOn(){
    chageMuteImg();
    chageAudioOn();
}
//
//자기 비디오 보이기 숨기기
//
//비디오 이미지 숨기기 보이기
function chageVideoImg() {
    
    if (videoImg.classList.contains('fa-video-slash')) {
        videoImg.classList.remove('fa-video-slash');
        videoImg.classList.add('fa-video');
    } else {
        videoImg.classList.remove('fa-video');
        videoImg.classList.add('fa-video-slash');
    }
}
//비디오 송출 하기 말기
function chageMyVideoOn() { 
    myVideoStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
}
//비디오 토글
function handleMyVideoOn(){
    chageVideoImg();
    chageMyVideoOn();
}

//
//비디오 화면 만들기
//
// 참여자의 비디오 생성 및 추가하기
function newParticipant(participantVideoStream, user, participantColor) {
    const VideosocketId=user.socketId;

    //유저 아이콘 생성하기
    let userIcon=makeUserIcon(participantColor);

    //유저 비디오 생성하기.
    let userVideo=makeUserVedio(participantVideoStream);

    //컨테이너 생성하기
    const newVideoContainer = document.createElement('div');
    newVideoContainer.setAttribute('socketId',VideosocketId );
    let newid=newVideoContainer.getAttribute('socketId',VideosocketId );
    newVideoContainer.classList.add('video_space');
    //컨테이너에 추가하기
    newVideoContainer.appendChild(userIcon);
    newVideoContainer.appendChild(userVideo);
    
    videoGrid.appendChild(newVideoContainer);
    //화면 조정
    adjustGrid();
    
    
}

//비디오 제거하기 
function removeVideo(deleteeSocketId) {
    const videoContainers = document.querySelectorAll('.video_space');
    videoContainers.forEach((videoContainer) => {
        let id=videoContainer.getAttribute('socketId');
        if (id === deleteeSocketId) {
            videoGrid.removeChild(videoContainer);
          }
        else{
        }
    });
    adjustGrid();
}
//비디오 유저 아이콘 만들기
function makeUserIcon(color) {
    const userIcon = document.createElement('i');
    userIcon.classList.add('fas', 'fa-user');
    userIcon.style.backgroundColor = color; // 배경 색 설정

    return userIcon;
}
//
//비디오 데이터 처리
function makeUserVedio(videoStream) {
    const video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    video.srcObject = videoStream;
    if (!(videoStream instanceof MediaStream)) {
        console.log("Not a valid MediaStream:");
    }
    else{
        console.log("valid MediaStream:");
    }
    return video;
}
// 비디오 화면 조정
function adjustGrid() {
    //videoContainers 에 있는 인원수를 구한다.
    const videoContainers = document.querySelectorAll('.video_space').length;
    //비디오 행 열을 구해 크기를 잘 맞춰주기 위한 작업들
    //행과 열의 개수를 구한다.
    const video_n = Math.ceil(Math.sqrt(videoContainers));
    let col = video_n;
    let row = 1;
    let n = 1;
    for (let i = 1; i < videoContainers; i++) {
        if (n >= col) {
            row++;
            n = 1;
        } else {
            n++;
        }
    }
    //구한 행 열로 비디오 그리드(행,열)에 조정한다.
    videoGrid.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    videoGrid.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    //각각의 비디오 크기 조절.
    document.querySelectorAll('.video_space').forEach(container => {
        //행열에 맞게 비디오 컨테이너의 크기는 조정이 된다
        container.style.height = `auto`;
        container.style.width = `auto`;
        const videoElement = container.querySelector('video');
        //비디오를 컨테이너의 크기에 맞춰 설정. 
        videoElement.style.width = '100%'; // 비디오 요소의 너비 설정
        videoElement.style.height = '100%'; // 비디오 요소의 높이 설정
        
    });
}
  //비디오 옵션 표시 토글
  function showSettingOption(){
    alert(`cl:${settingDropdownMenu.style.display}`);
    settingDropdownMenu.style.display = (settingDropdownMenu.style.display === "block") ? "none" : "block" ; 
  }

    return () => {
      socket.disconnect(); // 컴포넌트가 언마운트될 때 연결 해제
      //페이지 종료 버튼 클릭 시 창 닫기. 
      exitBtn.removeEventListener('click', function() {socket.emit("leaveRoom", inputRoomID,inputUserNick, socket.id);socket.disconnect();window.close();}); 
      //비디오 채팅 창 열고 닫기.
      seeVideoLogButton.removeEventListener('click', showVideoLog);
      chatExitBtn.removeEventListener('click', showVideoLog);
      //댓글 보내기
      chatSendBtn.removeEventListener('click', sendMyMessage);
      //공유 메모장은 share_note에 있음.
      //일정관리는 아직 작성하지 않음.
      videoSettingBtn.removeEventListener('click', showSettingOption);//자기 비디오 설정.
      mute.removeEventListener('click', handleAudioOn); // 오디오 on off.
      video.removeEventListener('click', handleMyVideoOn); //비디오 on off
    };
  }, []);

//페이지

return (
  <div>
    <HelmetProvider>
    <Helmet>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    </Helmet>
    </HelmetProvider>

    <div id="screen">
      <main>
        <div className="content">
          <div className="video_grid_wrapper">
            <div className="video_grid"></div>
          </div>
          <div className="tool_container">
            <button className="button" id="schedule_Meeting">일정 관리</button>
            <button className="button" id="share_note">공유 메모장</button>
            <button className="button" id="see_video_log">발표자 내용 기록 및 번역</button>
          </div>
          <div id="chat">
            <header>
              <div id="chat_title">Chat</div>
              <button id="chat_exit">X</button>
            </header>
            <main id="chatArea"></main>
            <footer>
              <div id="send_message">
                <textarea placeholder="message" required></textarea>
                <button type="submit">send</button>
              </div>
            </footer>
          </div>
        </div>
      </main>

      <footer>
        <div className="control_icon_container">
          <button className="control_icon" id="mute">
            <i id="muteImg" className="fas fa-microphone-slash"></i>
            voice
          </button>
          <button className="control_icon" id="video">
            <i id="videoImg" className="fas fa-video-slash"></i>
            video
          </button>
          {/* 
            HTML comments like this are not allowed inside JSX.
            If you need to comment out JSX, use curly braces and JavaScript comments.
          */}
          {/* 
          <i className="fas fa-desktop"></i>
          <i className="fas fa-hand-pointer"></i>
          */}
          <div id="settings">
            <div id="setting_dropdown_menu">
              <div id="setting_dropdown_item">사용자 초대</div>
              {/* 
              <div id="setting_dropdown_item">배경설정</div>
              <div id="setting_dropdown_item">비디오/마이크 설정</div>
              */}
              <div id="setting_dropdown_item">회의링크 복사</div>
            </div>
            <button className="control_icon" id="settingButton">
              <i className="fas fa-cog"></i>
              setting
            </button>
          </div>
        </div>
        <button className="div" id="exit">
          <i className="fas fa-power-off"></i>
        </button>
      </footer>
      

    </div>
  </div>
);
}

export default HomeMeetingPage;