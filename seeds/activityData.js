const { Activity } = require("../models");

const activityData = [
  {
    title: "Activity 1",
    description: "Act 1 Description",
    location: "The Town",
    occurrence: new Date("02-14-2022"),
    organizer_id: 1,
    is_private: false,
    seats: 10,
    interest_id: 1,
  },
  {
    title: "Activity 2",
    description: "Act 2 Description",
    location: "The Pier",
    occurrence: new Date("02-16-2022"),
    organizer_id: 2,
    is_private: false,
    seats: 10,
    interest_id: 2,
  },
  {
    title: "Activity 3",
    description: "Act 3 Description",
    location: "The Mountains",
    occurrence: new Date("02-18-2022"),
    organizer_id: 3,
    is_private: false,
    seats: 10,
    interest_id: 5,
  },
  {
    title: "Activity 4",
    description: "Act 4 Description",
    location: "The Beach",
    occurrence: new Date("02-19-2022"),
    organizer_id: 4,
    is_private: false,
    seats: 10,
    interest_id: 4,
  },
  {
    title: "Activity 5",
    description: "Act 5 Description",
    location: "The Community Center",
    occurrence: new Date("02-17-2022"),
    organizer_id: 5,
    is_private: false,
    seats: 10,
    interest_id: 3,
  },
];

const seedActivities = () => Activity.bulkCreate(activityData);

module.exports = seedActivities;
