const { DietaryPref } = require("../models");

const dietaryPrefData = [
  { name: "Vegan" },
  { name: "Vegetarian" },
  { name: "Paleo" },
  { name: "Dairy-free" },
  { name: "Wheat-free" },
];

const seedDietaryPref = () => DietaryPref.bulkCreate(dietaryPrefData);

module.exports = seedDietaryPref;
