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
        attributes: ["id", "username"],
        foreignKey: "user_id",
      },
      {
        model: Activity,
        attributes: ["id", "title"],
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

/* 
    GET /api/invitations/:id
*/
router.get("/:id", (req, res) => {
  Invitation.findOne({
    where: { id: req.params.id },
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
      if (!dbInvitationData) {
        res.status(404).json({ message: "No invitation found with that ID" });
      }
      res.json(dbInvitationData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* 
    POST /api/invitations
    CREATEs an invitation record
*/
router.post("/", (req, res) => {
  Invitation.create({
    user_id: req.body.user_id,
    activity_id: req.body.activity_id,
  })
    .then((dbInvitationData) => {
      res.json(dbInvitationData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* 
    DELETE /api/invitations/:id
*/
router.delete("/:id", (req, res) => {
  Invitation.destroy({ where: { id: req.params.id } })
    .then((dbInvitationData) => {
      if (!dbInvitationData) {
        res.status(404).json({ message: "No invitation with that ID" });
      }
      res.json(dbInvitationData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
