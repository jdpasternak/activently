const User = require("./User");
// const Activity = require("./Activity");
// const Comment = require("./Comment");
// const Attendance = require("./Attendance");
// const Interest = require("./Interest");
// const UserDietaryPref = require("./UserDietaryPref");
// const UserInterest = require("./UserInterest");
// const DietaryPref = require("./DietaryPref");

// User < UserDietaryPref
// User.hasMany(UserDietaryPref, {
//   foreignKey: "user_id",
// });

// UserDietaryPref.belongsTo(User, {
//   foreignKey: "user_id",
// });
// User < UserInterest
// User < Attendance
// User < Activity
// User < Comment

// DietaryPref < UserDietaryPref
// DietaryPref.hasMany(UserDietaryPref, {
//   foreignKey: "dietary_pref_id",
// });

// UserDietaryPref.belongsTo(DietaryPref, {
//   foreignKey: "dietary_pref_id",
// });

// User.belongsToMany(DietaryPref, {
//   through: UserDietaryPref,
//   as: "dietary_preferences",
//   foreignKey: "user_id",
// });

// Interest < UserInterest
// Interest < Activity

// Activity < Attendance
// Activity < Comment

// Activity.organizer_id > User.id
// User.hasMany(Activity, {
//   foreignKey: "organizer_id",
// });

// Activity.belongsTo(User, {
//   foreignKey: "organizer_id",
// });

// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Comment.belongsTo(Activity, {
//   foreignKey: "activity_id",
// });

// User.hasMany(Comment, {
//   foreignKey: "user_id",
// });

// Activity.hasMany(Comment, {
//   foreignKey: "activity_id",
// });

// User.belongsToMany(Activity, {
//   through: Attendance,
//   as: "Attendance_activities",
//   foreignKey: "user_id",
// });

// Activity.belongsToMany(User, {
//   through: Attendance,
//   as: "Attendance_activities",
//   foreignKey: "activity_id",
// });

// Attendance.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Attendance.belongsTo(Activity, {
//   foreignKey: "activity_id",
// });

// User.hasMany(Attendance, {
//   foreignKey: "user_id",
// });

// Activity.hasMany(Attendance, {
//   foreignKey: "activity_id",
// });

module.exports = {
  User,
  // Activity,
  // Comment,
  // Attendance,
  // Interest,
  // UserInterest,
  // DietaryPref,
  // UserDietaryPref,
};
