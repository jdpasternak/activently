const router = require("express").Router();

const userRoutes = require("./user-routes");
const activityRoutes = require("./activity-routes");
const commentRoutes = require("./comment-routes");
const userDietaryPrefRoutes = require("./user-dietary-pref-routes");
const userInterestRoutes = require("./user-interest-routes");
const interestRoutes = require("./interest-routes");
const dietaryPrefRoutes = require("./dietaryPrefs-routes");
const invitationRoutes = require("./invitation-routes");

router.use("/users", userRoutes);
router.use("/activities", activityRoutes);
router.use("/comments", commentRoutes);
router.use("/userDietaryPrefs", userDietaryPrefRoutes);
router.use("/userInterests", userInterestRoutes);
router.use("/interests", interestRoutes);
router.use("/dietaryPrefs", dietaryPrefRoutes);
router.use("/invitations", invitationRoutes);

module.exports = router;
