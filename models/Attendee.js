const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Attendee extends Model{};

Attendee.init({
    id: {
        type: DataTypes.INTEGER
    }
})