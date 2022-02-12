
const sequelize = require('../config/connection.js');
const { Model, DataTypes } = require('sequelize');

class Events extends Model { };

Events.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrememt: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        varchar: 50,
    },
    isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
    },
    with_catering: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
    ticket_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        validate: {
            isDecimal: true,
        }
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,   
    },
    active_by: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    creted_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    }
})

module.exports = Events;