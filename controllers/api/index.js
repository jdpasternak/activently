const router = require('express').Router();

const activityRoutes = require("./activity-routes");
const commentsRoutes = require("./comments-routes");
const profileRoutes = require("./profile-routes");
router.use("/activity", activityRoutes);
router.use("/comments", commentsRoutes);
router.use("/profile", profileRoutes);

module.exports = router;