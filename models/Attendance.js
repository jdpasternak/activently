const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Attendance extends Model {}

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    activity_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "activity",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "attendance",
    underscored: true,
  }
);

module.exports = Attendance;
