const comment = require('./Comment');
const user = require('./User');
const events= require('./Events');
const { DataTypes } = require('sequelize/types/index');
const { post } = require('../controllers');

// comment belongsTo user
comment.belongsTo(user, {
    foreignKey: 'user_id'
  });
// user have many comments
user.hasMany(comment, {
  foreignKey: 'comment_id',
  onDelete: 'SET NULL'
})
// COMMENT THAT BELONGS TO POST
comment.belongsTo(user, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})
//event belongs to user
events.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

user.hasMany(events, {
    foreignKey: 'Events_id',
    onDelete: 'SET NULL'

})

module.exports = {
 comment,
 events,
 user
};