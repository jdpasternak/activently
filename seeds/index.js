const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedDietaryPref = require("./dietaryPrefData");
const seedUserDietaryPref = require("./userDietaryPrefData");
const seedInterests = require("./interestData");
const seedUserInterests = require("./userInterestData");
const seedActivities = require("./activityData");
const seedAttendance = require("./attendanceData");
const seedComments = require("./commentData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedDietaryPref();
  await seedUserDietaryPref();
  await seedInterests();
  await seedUserInterests();
  await seedActivities();
  await seedAttendance();
  await seedComments();

  process.exit(0);
};

seedAll();
