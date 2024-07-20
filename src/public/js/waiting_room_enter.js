const enterRoomName = document.getElementById("roomName");
const userNickName = document.getElementById("nickName");
const enterbtn = document.getElementById("enterRoom");

function handleEnterRoom() {
  const roomID=enterRoomName.value;
  const userNick=userNickName.value;
  openMeeting(roomID,userNick);
}

enterbtn.addEventListener("click", handleEnterRoom);

function openMeeting(roomID,userNick) {
  const url = `/home_meeting?roomID=${encodeURIComponent(roomID)}&userNick=${encodeURIComponent(userNick)}`;
  window.open(url, 'home_meeting', 'fullscreen=yes');
  console.log("someone try meeting");
}