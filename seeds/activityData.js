const { Activity } = require("../models");

const activityData = [
  {
    title: "Activity 1",
    description: "Act 1 Description",
    location: "The Town",
    occurrence: 20220214,
    organizer_id: 1,
    is_private: false,
    seats: 10,
    interest_id: 1,
  },
  {
    title: "Activity 2",
    description: "Act 2 Description",
    location: "The Pier",
    occurrence: 20220216,
    organizer_id: 2,
    is_private: false,
    seats: 10,
    interest_id: 2,
  },
  {
    title: "Activity 3",
    description: "Act 3 Description",
    location: "The Mountains",
    occurrence: 20220218,
    organizer_id: 3,
    is_private: false,
    seats: 10,
    interest_id: 5,
  },
  {
    title: "Activity 4",
    description: "Act 4 Description",
    location: "The Beach",
    occurrence: 20220219,
    organizer_id: 4,
    is_private: false,
    seats: 10,
    interest_id: 4,
  },
  {
    title: "Activity 5",
    description: "Act 5 Description",
    location: "The Community Center",
    occurrence: 20220217,
    organizer_id: 5,
    is_private: false,
    seats: 10,
    interest_id: 3,
  },
];

const seedActivities = () => Activity.bulkCreate(activityData);

module.exports = seedActivities;
