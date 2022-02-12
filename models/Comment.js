
const sequelize = require('../config/connection.js');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model { };

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrememt: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    activity_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'activity',
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})