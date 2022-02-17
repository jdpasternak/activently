
const { UserDietaryPref } = require("../models");

const userDietaryPrefData = [
  { user_id: 1, dietary_pref_id: 4 },
  { user_id: 2, dietary_pref_id: 5 },
  { user_id: 3, dietary_pref_id: 5 },
  { user_id: 4, dietary_pref_id: 1 },
  { user_id: 5, dietary_pref_id: 2 },
  { user_id: 6, dietary_pref_id: 2 },
  { user_id: 7, dietary_pref_id: 4 },
  { user_id: 8, dietary_pref_id: 5 },
  { user_id: 9, dietary_pref_id: 1 },
  { user_id: 10, dietary_pref_id: 1 },
];

const seedUserDietaryPref = () =>
  UserDietaryPref.bulkCreate(userDietaryPrefData);

module.exports = seedUserDietaryPref;

