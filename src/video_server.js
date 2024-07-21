import http from "http";
import SocketIO from "socket.io";
import express from "express";

const port_video=9000; //port number.
//db

//
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home_waiting_room"));
//app.get("/", (_, res) => res.render("home_chat"));
app.get("/share_note", (req, res) => res.render("share_note"));
app.get("/home_meeting", (req, res) => res.render("home_meeting"));
app.get("/*", (_, res) => res.redirect("/"));
//데이터 선언
// roomName-방id, participantsNum-참가자수, users[{socketId, nickname}], chatLog
let allRooms = [];
//상수 선언.
const MAXPEOPLE = 200; // 한 방당 참가 가능한 사람수 

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  //when someone enter
  socket.on("leaveRoom", (roomName, leaveSocketId) => {
    leaveRoomServer(roomName, leaveSocketId);
    socket.to(roomName).emit("leavePeer", leaveSocketId);
    console.log(`leave ${leaveSocketId}`);
    socket.to(leaveSocketId).emit("leaveMyRoom");
  });
  //console.log("leaveRodddom"); 
  socket.on("requestServerEnterRoom",(roomName, userNickName)=>{ answerEnterRoom(roomName, userNickName,socket);});
  //offer이 들어온 경우 해당 peer에 대해 offer을 신청해준다.
  socket.on("offer", (offer, peerSocketId) => {socket.to(peerSocketId).emit("receiveOffer", offer, socket.id);});
  //offer에 대한 answer이 들어온 경우.
  socket.on("answerOffer", (answer, peerSocketId) => {socket.to(peerSocketId).emit("receiveAnswerOffer", answer, socket.id); console.log("offer");});
  socket.on("ice", (ice, remoteSocketId) => {socket.to(remoteSocketId).emit("ice", ice, socket.id);});
  socket.on("sendMessage", (roomName, nick, message) => {socket.to(roomName).emit("getMessage", nick, message);});
socket.on("sendAnouncment",(roomName, nick, message) => {socket.to(roomName).emit("getAnouncment", message);});
  

});

function leaveRoomServer(leaveRoomName,leaveSocketId){
    // 들어가려는 방 찾기
    let leaveRoom=null;
    for (let i = 0; i < allRooms.length; ++i) {
    
      //여러 화상회의 방 중에 같은 이름이 발견된 경우
      if (allRooms[i].roomName === leaveRoomName) {
        let index = allRooms[i].users.findIndex(user => user.socketId === leaveSocketId);
        if (index !== -1) {
          console.log(`leave:${allRooms[i].users[index].userNickName}`);
          allRooms[i].users=allRooms[i].users.splice(index, 1);
          allRooms[i].participantsNum=allRooms[i].participantsNum-1;
          if(allRooms[i].participantsNum===0){
            console.log(`delete:${allRooms[i].roomName}`);
            deleteRoom(allRooms[i].roomName);
          }
        }
        
      }
    }
}

function deleteRoom(leaveRoomName){
  let index = allRooms.findIndex(room => room.roomName === leaveRoomName);
  allRooms=allRooms.splice(index, 1);

}
const handleListen = () => console.log(`video on http://localhost:${port_video}`);
httpServer.listen(port_video, handleListen);

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
  
  // 방이 없는 경우 새로운 방을 만든다. 
  if (targetRoom===null) {
    let newRoom = {
      roomName,
      participantsNum: 0,
      users: []
    };
    console.log("newRoom:create");
    allRooms.push(newRoom);
    targetRoom=newRoom;
  }

  //방 정보 갱신
  ++targetRoom.participantsNum;//인원이 추가되었으므로 갱신한다. 
  targetRoom.users.push({socketId: socket.id, userNickName});
  //방에 들어가기
  socket.join(roomName);
  socket.emit("enterRoom",targetRoom.users);
  console.log("enterRoom:accept");

}
