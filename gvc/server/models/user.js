const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  uid: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  uname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  uemail: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  upassword: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ubirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  utel: {
    type: DataTypes.STRING(20),
  }
}, {
  timestamps: false,
  tableName: 'User'
});

module.exports = User;