const { UserInterest } = require("../models");

const userInterestData = [
  { user_id: 1, interest_id: 1 },
  { user_id: 2, interest_id: 3 },
  { user_id: 3, interest_id: 4 },
  { user_id: 4, interest_id: 2 },
  { user_id: 5, interest_id: 3 },
  { user_id: 6, interest_id: 3 },
  { user_id: 6, interest_id: 2 },
  { user_id: 6, interest_id: 1 },
  { user_id: 7, interest_id: 1 },
  { user_id: 8, interest_id: 4 },
  { user_id: 9, interest_id: 3 },
  { user_id: 10, interest_id: 4 },
];

const seedUserInterests = () => UserInterest.bulkCreate(userInterestData);

module.exports = seedUserInterests;
