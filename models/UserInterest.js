const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserInterest extends Model {}

UserInterest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    interest_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "interest",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user_interest",
  }
);

module.exports = UserInterest;
