const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Comment Text 1",
    user_id: 1,
    activity_id: 3,
  },
  {
    comment_text: "Comment Text 2",
    user_id: 1,
    activity_id: 4,
  },
  {
    comment_text: "Comment Text 3",
    user_id: 2,
    activity_id: 2,
  },
  {
    comment_text: "Comment Text 4",
    user_id: 4,
    activity_id: 3,
  },
  {
    comment_text: "Comment Text 5",
    user_id: 8,
    activity_id: 1,
  },
  {
    comment_text: "Comment Text 6",
    user_id: 4,
    activity_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
