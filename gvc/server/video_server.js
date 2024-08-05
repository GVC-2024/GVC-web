// 서버 코드 (server.js)

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// CORS 설정
app.use(cors());
//데이터 선언
let allRooms = [
  // roomName-방id, participantsNum-참가자수, users[{socketId, nickname,userid}], chatLog
  ];
  //상수 선언.
  const MAXPEOPLE = 4; // 한 방당 참가 가능한 사람수 
wss.on("connection", (socket) => {
  //when someone enter
  socket.on("leaveRoom", (roomName, nickName, leaveSocketId) => {
    leaveRoomServer(roomName, leaveSocketId);
    socket.to(roomName).emit("leavePeer", leaveSocketId);
    socket.to(roomName).emit("getAnouncment",`${nickName} leave room`);
    //socket.to(leaveSocketId).emit("leaveMyRoom");
  });

  //console.log("leaveRodddom"); 
  socket.on("requestServerEnterRoom",(roomName, userNickName)=>{answerEnterRoom(roomName, userNickName,socket);});
  //offer이 들어온 경우 해당 peer에 대해 offer을 신청해준다.
  socket.on("offer", (offer, peerSocketId, myuser) => {socket.to(peerSocketId).emit("receiveOffer", offer, myuser);});
  //offer에 대한 answer이 들어온 경우.
  socket.on("answerOffer", (answer, peerSocketId) => {socket.to(peerSocketId).emit("receiveAnswerOffer", answer, socket.id); console.log("offer");});
  socket.on("ice", (ice, remoteSocketId) => {socket.to(remoteSocketId).emit("ice", ice, socket.id);});
  socket.on("sendMessage", (roomName, nick, message) => {console.log(`sendMessage: ${message}`);recordLogChat(roomName,nick, message); socket.to(roomName).emit("getMessage", nick, message);});
  socket.on("sendAnouncment",(roomName, nick, message) => {socket.to(roomName).emit("getAnouncment", message);});

});
/*
  socket.on("reLoadRoom",(roomName, inputUserNick, socketID)=>{
    socket.to(roomName).emit("reLoadRoom");
    console.log(`${inputUserNick} socketID: ${socketID}`);
  });
*/

function recordLogChat(chatRoomName, chatUser,chatContent){
  let chatRoomIndex=null;
  console.log("record chatContent");
  // 대화하는 방 찾기
  for (let i = 0; i < allRooms.length; ++i) {
    if (allRooms[i].roomName === chatRoomName) {
      chatRoomIndex = i;
    }
  }
  if(chatRoomIndex===null){
  }else{
    allRooms[chatRoomIndex].chatLog.push({chatLogUser:chatUser, chatLogContent:chatContent });
  }
  //console.log(`${chatRoomIndex} want record chatContent: ${chatContent}`);
  let chat_length=allRooms[chatRoomIndex].chatLog.length;
  //console.log(`chat_length: ${chat_length}`);
  /*for(let i=0;chat_length>i;i++){
    console.log(`${i} chatLogUser: ${allRooms[chatRoomIndex].chatLog[i].chatLogUser}, `, allRooms[chatRoomIndex].chatLog[i].chatLogContent);
  }*/
  
  
}

function getLogChat(chatRoomName){
  let chatRoomIndex=null;
  let chatContent=null;
  // 대화하는 방 찾기
  for (let i = 0; i < allRooms.length; ++i) {
    if (allRooms[i].roomName === chatRoomName) {
      chatRoomIndex = i;
      break;
    }
  }
  if(chatRoomIndex!==null){
    if(allRooms[chatRoomIndex].chatLog.length>0){
      chatContent=allRooms[chatRoomIndex].chatLog;
    }
    
  }
  console.log(`chatContent: ${chatContent}`);
  if(chatContent!==null){
    for(let i=0;chatContent.length>i;i++){
      console.log(`${i} chatLogUser: ${chatContent[i].chatLogUser}, chatLog: ${chatContent[i].chatLogContent}`);
    }
    return chatContent;
  }

  
  
}

function leaveRoomServer(leaveRoomName,leaveSocketId){
    // 들어가려는 방 찾기
    for (let i = 0; i < allRooms.length; ++i) {
    
      //여러 화상회의 방 중에 같은 이름이 발견된 경우
      if (allRooms[i].roomName === leaveRoomName) {
        let index = allRooms[i].users.findIndex(user => user.socketId === leaveSocketId);
        if (index !== -1) {
          console.log(`leave:${allRooms[i].users[index].userNickName}`);
          allRooms[i].users = allRooms[i].users.filter(user => user.socketId !== leaveSocketId);
          allRooms[i].participantsNum=allRooms[i].participantsNum-1;
          if(allRooms[i].participantsNum===0){
            console.log(`delete:${allRooms[i].roomName}`);
            deleteRoom(allRooms[i].roomName);
          }
        }
        break; 
      }
    }
}

function deleteRoom(leaveRoomName){
  let index = allRooms.findIndex(room => room.roomName === leaveRoomName);
  allRooms=allRooms.splice(index, 1);

}

function answerEnterRoom(roomName, userNickName, socket){
  let targetRoom = null;// 들어오려는 방
  // 들어가려는 방 찾기
  for (let i = 0; i < allRooms.length; ++i) {
    
    //여러 화상회의 방 중에 같은 이름이 발견된 경우
    if (allRooms[i].roomName === roomName) {
      // 최대 인원수로 인해 인원이 못 들어오는 경우
      if (allRooms[i].participantsNum >= MAXPEOPLE) {
        socket.emit("denialFull");
        console.log("full");
        return;
      }
      //정상적으로 방에 들어올 수 있는 경우. 
      else{
        targetRoom = allRooms[i];
        console.log("serchRoom:ok");
        break;
      }

    }
  }
  let chatLog;
  // 방이 없는 경우 새로운 방을 만든다.
  if (targetRoom===null) {
    let newRoom = {
      roomName,
      participantsNum: 0,
      users: [],
      chatLog:[]
    };
    console.log("newRoom:create");
    allRooms.push(newRoom);
    targetRoom=newRoom;
  }else{
    chatLog=getLogChat(roomName);
  }

  //방 정보 갱신
  ++targetRoom.participantsNum;//인원이 추가되었으므로 갱신한다. 
  targetRoom.users.push({socketId: socket.id, userNickName: userNickName});
  //방에 들어가기
  socket.join(roomName);
  socket.to(roomName).emit("getAnouncment",`${userNickName} enter room`);
  //자기 자신에게 보내는 메세지. 
  socket.emit("getAnouncment",`${userNickName} you enter room`);
  socket.emit("enterRoom",targetRoom.users);
  socket.emit("enterRoomChat",targetRoom.chatLog);
  console.log(`enterRoom:accept- ${socket.id}`);
  console.log(`allusers`);
  targetRoom.users.forEach(user => {
    console.log(`${user.socketId}`);
  });
  console.log(`allusers: end`);

}

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
