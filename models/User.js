const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');
const { Hooks } = require('sequelize/types/hooks');
const { beforeCreate, beforeUpdate } = require('./Events.js');
const database = require('mime-db');

class User extends Model { };

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    famillyName: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    interests: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    skill_level: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    food_preferences: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            len: [4]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},
//hooks to manage password
{
    Hooks: {
    async beforeCreate(newUserData){
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
    },
    async beforeUpdate(updateUserData){
        updateUserData = await bcrypt.hash(updateUserData.password, 10);
        return updateUserData;
    }
}
})
module.exports = User;