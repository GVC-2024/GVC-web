const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Link = require('./link');
const User = require('./user');

const LinkUser = sequelize.define('LinkUser', {
    linkId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Link,
            key: 'lid'
        }
    },
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: User,
            key: 'uid'
        }
    }
});

module.exports = LinkUser;
