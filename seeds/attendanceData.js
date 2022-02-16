
const { Attendance } = require("../models");

const attendanceData = [
  { user_id: 1, activity_id: 2 },
  { user_id: 1, activity_id: 3 },
  { user_id: 1, activity_id: 5 },
  { user_id: 2, activity_id: 1 },
  { user_id: 2, activity_id: 4 },
  { user_id: 2, activity_id: 5 },
  { user_id: 2, activity_id: 3 },
  { user_id: 3, activity_id: 1 },
  { user_id: 3, activity_id: 2 },
];

const seedAttendance = () => Attendance.bulkCreate(attendanceData);

module.exports = seedAttendance;

const { Attendance } = require("../models");

const attendanceData = [
  { user_id: 1, activity_id: 2 },
  { user_id: 1, activity_id: 3 },
  { user_id: 1, activity_id: 5 },
  { user_id: 2, activity_id: 1 },
  { user_id: 2, activity_id: 4 },
  { user_id: 2, activity_id: 5 },
  { user_id: 2, activity_id: 3 },
  { user_id: 3, activity_id: 1 },
  { user_id: 3, activity_id: 2 },
];

const seedAttendance = () => Attendance.bulkCreate(attendanceData);

module.exports = seedAttendance;

