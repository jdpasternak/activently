const router = require("express").Router();
const { Invitation, User, Activity } = require("../../models");

/* 
    GET /api/invitations
    Returns all invitations
*/
router.get("/", (req, res) => {
  Invitation.findAll({
    include: [
      {
        model: User,
        foreignKey: "user_id",
      },
      {
        model: Activity,
        foreignKey: "activity_id",
      },
    ],
  })
    .then((dbInvitationData) => {
      res.json(dbInvitationData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
