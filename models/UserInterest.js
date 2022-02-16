const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserInterest extends Model {}

UserInterest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_interest",
  }
);

module.exports = UserInterest;
