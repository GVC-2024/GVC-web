const express = require('express');
const usersRouter = require('./db/userRouter');
//C:\Users\SM-PC\Desktop\GVC-web-seamsol_video\GVC-web-seamsol_video\src\db
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', usersRouter); // usersRouter를 '/users' 경로에 연결
// api/getUsers 엔드포인트가 생성. 
// 해당 엔드포인트에 GET 요청을 보내면 userRouter.js에서 정의한 로직이 실행되어 
// 사용자 정보를 반환

app.get('/', (req, res) => {
    res.send('<h2>Welcome to server</h2>');
});

app.listen(port, () => {
    console.log(`✅ Listening on http://localhost:${port}`);
});
