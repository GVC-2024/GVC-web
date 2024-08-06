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
const linkRoutes = require('./routes/link'); // 링크 라우트 추가

app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes); // 링크 라우트 추가

// Sequelize 및 데이터베이스 모델 설정
const sequelize = require('./models/db');
const User = require('./models/user');
const Link = require('./models/link'); // 링크 모델 추가
const LinkUser = require('./models/linkUser'); // 링크 사용자 모델 추가

// 모델 관계 설정
Link.hasMany(LinkUser, { as: 'LinkUsers', foreignKey: 'linkId' });
LinkUser.belongsTo(Link, { foreignKey: 'linkId' });

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
