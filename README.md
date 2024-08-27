#공유 노트 추가
1. 서버 폴더에 
server_note.js,Document.js 추가

2. 서버 폴더의 pakcage.json의 scripts에  "note": "node server_note.js", 추가


3. pages에 sharnote 폴더 파일들 추가
4. meeting 폴더에 HomeMeetingPage.css 변경.
5. homemeetingpage.js 변경
import TextEditor from "../share_note/TextEditor";
    //화면 요소 가져오기. <-파일 주석 쓰인 부분. 
    const noteDiv = document.getElementById('note');
    //버튼
    const shareNoteBtn = document.getElementById("share_note");
    //변수 선언하기
    let isDisplayNote = true; //chat log 보이기 숨기기
    //공유 메모장 창 열고 닫기
    shareNoteBtn.addEventListener('click', showNote);
아래 쪽에 함수 추가
//채팅창 숨기기/보이기
function showNote() {
  if (isDisplayNote === false) {
      noteDiv.classList.remove('hide_out_screen');
      isDisplayNote=true;
  } else {
    noteDiv.classList.add('hide_out_screen');
      isDisplayNote=false;
      
  }

}
1. settings 프론트 수정
          <div id="settings">
            <div id="seetings2">
              <div id="setting_dropdown_menu">
                <div id="setting_dropdown_item">사용자 초대</div>
                {/* 
                <div id="setting_dropdown_item">배경설정</div>
                <div id="setting_dropdown_item">비디오/마이크 설정</div>
                */}
                <div id="setting_dropdown_item">회의링크 복사</div>
              </div>
            </div>

            <button className="control_icon" id="settingButton">
              <i className="fas fa-cog"></i>
              setting
            </button>
          </div>
2. tool 부분 수정
          <div className="tool_container">
            <button className="button" id="schedule_Meeting">일정 관리</button>
            <button className="button" id="share_note">공유 메모장</button>
            <button className="button" id="see_video_log">발표자 내용 기록 및 번역</button>
          </div>
          <div id="note">
          <div class="notebook">

Meeting 관련 파일 설명. 

npm run dev: meeting 프로그램 실행 명령어.

scripts에 정의된 dev는 nodemon.json은 nodemon.json에 저장된 명령어를 실행. 
npm start를 사용하고 싶을 경우를 대비해  scripts에 start를 정의함.

src 코드 파일: 
  
    public 폴더 중 css 폴더
    home_meeting.css: meeting and chat css
    
    public 폴더 중 js 폴더
    waiting_room_enter.js: 임시파일. 중요한 점은 사용자의 닉네임과, 방 아이디를 home_meeting에게 전달해주거나 home_meeting이 데이터 베이스에서 가져오면 됨.  
    share_note.js: 임시 파일2. ShareNote 창을 여는 코드가 적혀있음
    home_meeting.js: 화상회의 및 채팅 코드. waiting_room_enter에게 사용자의 닉네임과, 방 아이디를 전달 받음.
    
    
    views 폴더 중
    waiting_room_enter.pug: 임시파일. 사용자의 닉네임과, 방 아이디를 입려받는 페이지
    share_note.pug: 임시파일2. 공유 노트 페이지
    home_meeting.pug: 화상회의 및 채팅 화면. 
    
    video_server.js: video_server 서버. 포트 번호는 9000으로 지정했으며, port_video=9000를 수정해서 사용할 수 있음. 


코드를 수정하면 자동으로 프로그램이 재실행 되도록 도와주는 것이 nodemon 패키지. 
 nodemon.json: nodemon.json은 npm run dev 입력시 실행시킬 명령어. babel-node로 video_server.js를 실행. 
 package.json: 
babel.config.json : babel.config.js 사용에 의한 API 노출로 인해 이에 대한 노출 방지와 복잡도를 줄이기 위해 정적 구성 형태로 설정하는 방법
    babel-JavaScript, JSX, TypeScript 코드를 하위 버전의 JavaScript 문법으로 변환시켜주는 역할. 이를 통해서 다른 플랫폼 브라우저에서도 원활한 동작
    Preset : 이 규칙을 모아 놓은 세트. 이러한 설정 세팅은 한번 하고난 뒤 바벨 옵션을 빌드 시 마다 주지 않아도 규칙과 함께 실행 
