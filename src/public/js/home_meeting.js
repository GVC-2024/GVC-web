//요소 가져오기.
const seeVideoLogButton = document.getElementById('see_video_log');
const videoGrid = document.querySelector('.video-grid');
const chatArea = document.getElementById('chatArea');
const chatBox =  document.getElementById('send_message');
const chatMessage =  chatBox.querySelector('textarea');
const chatSendBtn =  chatBox.querySelector('button');
const mute = document.getElementById('mute');
const video = document.getElementById('video');
const exitBtn = document.getElementById('exit');
const videoOption = document.getElementById("control");
//소켓 전송 .
const socket = io();
//정보 가져오기.
const urlParams = new URLSearchParams(window.location.search);
const inputRoomID = urlParams.get('roomID'); //방 이름
const inputUserNick = urlParams.get('userNick'); //유저 이름
//변수 선언하기
let myVideoStream; //현재 자신의 카메라 스트림.
let peersConnection = {}; // peerSocketId
let mypeers={};

//페이지 
//페이지 
requestServerEnterRoom(inputRoomID,inputUserNick);

function startMeeting(){
    showMyVideo(); //자기 화면 송출
    requestServerEnterRoom(inputRoomID,inputUserNick);
    
}

function getMessage(nick, message, color){
    console.log("get message:${message} from ${nick} color ${color} ");
}

//비디오 채팅 창 열고 닫기.
seeVideoLogButton.addEventListener('click', showVideoLog);
//자신의 비디오 설정하기
mute.addEventListener('click', handleAudioOn); // 오디오 on off.
video.addEventListener('click', handleMyVideoOn); //비디오 on off
exitBtn.addEventListener('click', ()=>{socket.emit("leaveRoom", inputRoomID, socket.id);self.close();}); 

//자신의 카메라를 화면에 반영하기.
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
    newParticipant(myVideoStream, socket.id, "white");
    
    adjustGrid();
    //newParticipant에 의해, 비디오와 오디오가 켜져있으므로, 다시 끈다. 
    chageMyVideoOn();
    chageAudioOn();
}


function showVideoLog() {
    const isDisplay = chatBox.style.display;
    if (isDisplay === "none") {
        chatBox.style.display = "flex"; 
    } else {
        chatBox.style.display = "none";
    }

}

function chageMuteImg() {
    
    if (muteImg.classList.contains('fa-microphone')) {
        muteImg.classList.remove('fa-microphone');
        muteImg.classList.add('fa-microphone-slash');
    } else {
        muteImg.classList.remove('fa-microphone-slash');
        muteImg.classList.add('fa-microphone');
    }
}

function chageAudioOn() { 
    myVideoStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
}

function handleAudioOn(){
    chageMuteImg();
    chageAudioOn();
}

//handleMyvideo  on off
function chageVideoImg() {
    
    if (videoImg.classList.contains('fa-video-slash')) {
        videoImg.classList.remove('fa-video-slash');
        videoImg.classList.add('fa-video');
    } else {
        videoImg.classList.remove('fa-video');
        videoImg.classList.add('fa-video-slash');
    }
}


function chageMyVideoOn() { 
    myVideoStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
}

function handleMyVideoOn(){
    chageVideoImg();
    chageMyVideoOn();
}
//// 참여자의 비디오 컨테이너 생성기.
function newParticipant(participantVideoStream, VideosocketId, participantColor) {

    //유저 아이콘 생성하기
    userIcon=makeUserIcon(participantColor);

    //유저 비디오 생성하기.
    userVideo=makeUserVedio(participantVideoStream);

    //컨테이너 생성하기
    const newVideoContainer = document.createElement('div');
    newVideoContainer.setAttribute('socketId',VideosocketId );
    newid=newVideoContainer.getAttribute('socketId',VideosocketId );
    newVideoContainer.classList.add('video-container');
    //컨테이너에 추가하기
    newVideoContainer.appendChild(userIcon);
    newVideoContainer.appendChild(userVideo);
    
    videoGrid.appendChild(newVideoContainer);
    
    
}
//벼경색에 따라 유저 설정
function makeUserIcon(color) {
    const userIcon = document.createElement('i');
    userIcon.classList.add('fas', 'fa-user');
    userIcon.style.backgroundColor = color; // 배경 색 설정

    return userIcon;
}

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
// 그리드 조정 함수
function adjustGrid() {
    //videoContainers 에 있는 인원수를 구한다.
    const videoContainers = document.querySelectorAll('.video-container').length;
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
    document.querySelectorAll('.video-container').forEach(container => {
        //행열에 맞게 비디오 컨테이너의 크기는 조정이 된다
        container.style.height = `auto`;
        container.style.width = `auto`;
        const videoElement = container.querySelector('video');
        //비디오를 컨테이너의 크기에 맞춰 설정. 
        videoElement.style.width = '100%'; // 비디오 요소의 너비 설정
        videoElement.style.height = '100%'; // 비디오 요소의 높이 설정
        
    });
}

//
//socket 정리
//

// 방에 들어갈 수 있도록 요청
async function requestServerEnterRoom(roomName, userNickName) {  
    
    if (socket.disconnected) {socket.connect();}
    socket.emit("requestServerEnterRoom", roomName, userNickName);
}

//인원수 초과로 인한 방 참가 거부
socket.on("denialFull", async() => {alert("full member. denial enter");});

//방에 정상적으로 들어감. 
socket.on("enterRoom", async (users) => {handleEnter(users);});

// peer의 SDP를 수락하고 처리. SDP 형식을 받으면 이를 수용한다. 
socket.on("receiveAnswerOffer", async (answer,peerSocketId) => { console.log("received the answer"); peersConnection[peerSocketId].setRemoteDescription(answer); });

// peer의 addIceCandidate 설정 적용.  IceCandidate- 피어 간 통신에 사용할 수 있는 네트워크 경로 정보
socket.on("ice", async (ice,peerSocketId) => {console.log("received candidate"); peersConnection[peerSocketId].addIceCandidate(ice); });

socket.on("receiveOffer", async (offer, peerSocketId) => {handlePeerOffer(offer, peerSocketId)});

socket.on("getAnouncment",writeChatAnnouncement);// 공지 받기

socket.on("getMessage", writeOtherMessage); //메세지 받기

//피어방 나가기
socket.on("leavePeer",async(peerSocktId)=>handleLeavePeer(peerSocktId));
//내방 나가기
socket.on("leaveMyRoom",async()=>{self.close();});

async function handleEnter(users){
    const usersNum = users.length;
    //let message=`${inputUserNick} enter`;
    //socket.emit("sendAnouncment", inputRoomID,inputUserNick, message);
    await showMyVideo(); //자기 화면 송출
    //혼자만 있는 경우 자기 화면만 자신에게 보여주고 끝.
    if (usersNum === 1) {
        console.log(`handleEnter-you first ${usersNum}`);
    }else{
    //다른 peer가 있는 경우, 각각에 대해 offer을 신청 해줘야 한다. 
        console.log(`handleEnter-other is in here ${usersNum}`);
        for (let i = 0; i < usersNum - 1; ++i) {
              const newPeerConnection = createConnection(users[i].socketId);
              const offer = await newPeerConnection.createOffer();
              await newPeerConnection.setLocalDescription(offer);
              socket.emit("offer", offer, users[i].socketId);
        }
    }    
}

//peer의 연결 방식을 설정한다. 
async function handlePeerOffer(offer,peerSocketId){
        const newPeer = createConnection(peerSocketId);
        await newPeer.setRemoteDescription(offer); // offer는 원격 피어로부터 전달된 SDP (Session Description Protocol) 형식의 설명서
        const answer = await newPeer.createAnswer(); //Answer는 원격 피어의 Offer에 응답하는 SDP
        await newPeer.setLocalDescription(answer); // peer의 SDP를 설정하고 처리
        console.log("sent the answer");
        socket.emit("answerOffer", answer, peerSocketId);
}



function createConnection(peerSocketId) {
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
    peerConnection.addEventListener("addstream", (data) => {addVideo(data,peerSocketId,"red");}); //비디오 생성
    myVideoStream.getTracks().forEach((track) => peerConnection.addTrack(track, myVideoStream)); //내 비디오 스트림 전달
    peersConnection[peerSocketId] = peerConnection;
    return peerConnection;
}

// ice 보내기
function sendIce(data, targetSocketID) {
    console.log("sent candidate");
    socket.emit("ice", data.candidate, targetSocketID);
}

//peer-다른 참가자의 스트림을 입력값으로 주면, 이를 화면에 추가한다. 
function addVideo(data,vedioSocketId) {
    console.log(`addVideo: ${vedioSocketId}`);
    newParticipant(data.stream, vedioSocketId, "red");
    adjustGrid(); // 화면 조정 함수 호출
}

//댓글.
chatSendBtn.addEventListener('click', (event)=>sendMyMessage(event,inputRoomID,inputUserNick));
//
function sendMyMessage(event,roomName,myNick){
    event.preventDefault();
    let message = chatMessage.value;
    if(message.length==0){
        return;
    }
    else{
        console.log(`send message:${message}`);
        socket.emit("sendMessage", roomName, myNick, message);
        writeMyMessage(message);
        chatMessage.value="";
    }
}
writeChatAnnouncement("message");
//chat 중앙에 공지-떠남 등.
function writeChatAnnouncement(message){
    //event.preventDefault();
    let chat_announcement_container = document.createElement('div');
    chat_announcement_container.classList.add('chat_announcement'); //css 설정 가져오기
    chat_announcement_container.innerText=message;
    chatArea.appendChild(chat_announcement_container);
}
// 내 메세지 쓰기
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
// 남 메세지 쓰기
function writeOtherMessage(nick, message){
    event.preventDefault();
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
//비디오 제거하기 
function removeVideo(deleteeSocketId) {
    const videoContainers = document.querySelectorAll('.video-container')
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
//피어가 나갈 때 수행할 것. 
function handleLeavePeer(peerSocktId) {
    removeVideo(peerSocktId);
}
