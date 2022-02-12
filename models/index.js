const User = require('./User');
const Activity = require('./Activity');
const Interested = require('./Interested');
const Comment = require('./Comment');
const Attending = require('./Attending');

User.hasMany(Activity, {
    foreignKey: 'organizer_id'
});

Activity.belongsTo(User, {
    foreignKey: 'organizer_id'
});

User.belongsToMany(Activity, {
    through: Interested,
    as: 'interested_activities',
    foreignKey: 'user_id'
});

Activity.belongsToMany(User, {
    through: Interested,
    as: 'interested_activities',
    foreignKey: 'activity_id'
});

Interested.belongsTo(User, {
    foreignKey: 'user_id'
});

Interested.belongsTo(Activity, {
    foreignKey: 'activity_id'
});

User.hasMany(Interested, {
    foreignKey: 'user_id'
});

Activity.hasMany(Interested, {
    foreignKey: 'activity_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Activity, {
    foreignKey: 'activity_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Activity.hasMany(Comment, {
    foreignKey: 'activity_id'
});

User.belongsToMany(Activity, {
    through: Attending,
    as: 'attending_activities',
    foreignKey: 'user_id'
});

Activity.belongsToMany(User, {
    through: Attending,
    as: 'attending_activities',
    foreignKey: 'activity_id'
});

Attending.belongsTo(User, {
    foreignKey: 'user_id'
});

Attending.belongsTo(Activity, {
    foreignKey: 'activity_id'
});

User.hasMany(Attending, {
    foreignKey: 'user_id'
});

Activity.hasMany(Attending, {
    foreignKey: 'activity_id'
});

module.exports = { User, Activity, Interested, Comment, Attending };