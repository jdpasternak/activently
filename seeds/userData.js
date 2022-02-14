const { User } = require("../models");

const userData = [
  {
    username: "bob",
    email: "bob@example.com",
    password: "secret123",
    zip: "96789",
  },
  {
    username: "joe",
    email: "joe@example.com",
    password: "secret123",
    zip: "96789",
  },
  {
    username: "steve",
    email: "steve@example.com",
    password: "secret123",
    zip: "96789",
  },
  {
    username: "susan",
    email: "susan@example.com",
    password: "secret123",
    zip: "96797",
  },
  {
    username: "martha",
    email: "martha@example.com",
    password: "secret123",
    zip: "96797",
  },
  {
    username: "carl",
    email: "carl@example.com",
    password: "secret123",
    zip: "96814",
  },
  {
    username: "kim",
    email: "kim@example.com",
    password: "secret123",
    zip: "96825",
  },
  {
    username: "wong",
    email: "wong@example.com",
    password: "secret123",
    zip: "96797",
  },
  {
    username: "careen",
    email: "careen@example.com",
    password: "secret123",
    zip: "96817",
  },
  {
    username: "oscar",
    email: "oscar@example.com",
    password: "secret123",
    zip: "96789",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
