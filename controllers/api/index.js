const router = require('express').Router();

<<<<<<< HEAD
const activityRoutes = require("./activity-routes");
const commentsRoutes = require("./comments-routes");
const profileRoutes = require("./profile-routes");
router.use("/activity", activityRoutes);
router.use("/comments", commentsRoutes);
router.use("/profile", profileRoutes);
=======
const userRoutes = require('./user-routes');
const activityRoutes = require('./activity-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/activities', activityRoutes);
router.use('/comments', commentRoutes);
>>>>>>> main

module.exports = router;