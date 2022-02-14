const sequelize = require('../config/connection.js');
const { Model, DataTypes } = require('sequelize');

class Events_has_Users extends Model {}

Events_has_Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
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
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Events',
            key: 'id'
        }
    }
}
)

module.exports = Events_has_Users;