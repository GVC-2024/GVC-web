const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Link = sequelize.define('Link', {
    lid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ownerId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Link;
