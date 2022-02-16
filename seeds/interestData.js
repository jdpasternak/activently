<<<<<<< HEAD
const { Interest } = require("../models");

const interestData = [
  { name: "Hiking" },
  { name: "Cycling" },
  { name: "Knitting" },
  { name: "Poker" },
  { name: "Skiing" },
];

const seedInterests = () => Interest.bulkCreate(interestData);

module.exports = seedInterests;
=======
const { Interest } = require("../models");

const interestData = [
  { name: "Hiking" },
  { name: "Cycling" },
  { name: "Knitting" },
  { name: "Poker" },
  { name: "Skiing" },
];

const seedInterests = () => Interest.bulkCreate(interestData);

module.exports = seedInterests;
>>>>>>> feature/frontend
