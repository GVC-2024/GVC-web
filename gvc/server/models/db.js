const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gvc', 'gvcuser', 'Password2024!', {
  host: '172.20.33.108',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
