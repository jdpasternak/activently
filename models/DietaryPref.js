const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class DietaryPref extends Model {}

DietaryPref.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    modelName: "dietary_pref",
  }
);

module.exports = DietaryPref;
