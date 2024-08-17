const enterRoomName = document.getElementById("roomName");
const userNickName = document.getElementById("nickName");
const enterbtn = document.getElementById("enterRoom");

function handleEnterRoom() {
  const roomID=enterRoomName.value;
  const userNick=userNickName.value;
  openMeeting(roomID,userNick);
}

enterbtn.addEventListener("click", handleEnterRoom);

window.open('Result.html','null',winFeature); 

function openMeeting(roomID,userNick) {
  const url = `/home_meeting?roomID=${encodeURIComponent(roomID)}&userNick=${encodeURIComponent(userNick)}`;
  var winFeature ='width=800,height=600,location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes';
  window.open(url, 'null', winFeature);  
}