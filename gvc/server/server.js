const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우트 설정
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Sequelize 및 데이터베이스 모델 설정
const sequelize = require('./models/db');
const User = require('./models/user');

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
