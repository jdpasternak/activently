const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserDietaryPref extends Model {}

UserDietaryPref.init(
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
    dietary_pref_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "dietary_pref",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user_dietary_pref",
  }
);

module.exports = UserDietaryPref;
