const User = require("./User");
const DietaryPref = require("./DietaryPref");
const UserDietaryPref = require("./UserDietaryPref");
const Interest = require("./Interest");
const UserInterest = require("./UserInterest");
const Activity = require("./Activity");
const Attendance = require("./Attendance");
const Comment = require("./Comment");

/* 
    User - Dietary Preference
*/
User.belongsToMany(DietaryPref, {
  through: UserDietaryPref,
  as: "dietary_preferences",
  foreignKey: "user_id",
});
DietaryPref.belongsToMany(User, {
  through: UserDietaryPref,
  as: "dietary_preferences",
  foreignKey: "dietary_pref_id",
});

UserDietaryPref.belongsTo(User, {
  foreignKey: "user_id",
});

UserDietaryPref.belongsTo(DietaryPref, {
  foreignKey: "dietary_pref_id",
});

User.hasMany(UserDietaryPref, {
  foreignKey: "user_id",
});

DietaryPref.hasMany(UserDietaryPref, {
  foreignKey: "dietary_pref_id",
});

/* 
    User - Interest
*/
User.belongsToMany(Interest, {
  through: UserInterest,
  as: "interests",
  foreignKey: "user_id",
});
Interest.belongsToMany(User, {
  through: UserInterest,
  as: "interests",
  foreignKey: "interest_id",
});

UserInterest.belongsTo(User, {
  foreignKey: "user_id",
});

UserInterest.belongsTo(Interest, {
  foreignKey: "interest_id",
});

User.hasMany(UserInterest, {
  foreignKey: "user_id",
});

Interest.hasMany(UserInterest, {
  foreignKey: "interest_id",
});

/* 
    User - Activity (organizer)
*/
User.hasMany(Activity, {
  foreignKey: "organizer_id",
});

Activity.belongsTo(User, {
  foreignKey: "organizer_id",
});

/* 
    User - Activity (attendee)
*/
User.belongsToMany(Activity, {
  through: Attendance,
  as: "attending",
  foreignKey: "user_id",
});

Activity.belongsToMany(User, {
  through: Attendance,
  as: "attending",
  foreignKey: "activity_id",
});

Attendance.belongsTo(User, {
  foreignKey: "user_id",
});

Attendance.belongsTo(Activity, {
  foreignKey: "activity_id",
});

User.hasMany(Attendance, {
  foreignKey: "user_id",
});

Activity.hasMany(Attendance, {
  foreignKey: "user_id",
});

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
  Activity,
  Comment,
  Attendance,
  Interest,
  UserInterest,
  DietaryPref,
  UserDietaryPref,
};
