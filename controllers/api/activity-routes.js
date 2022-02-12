const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Activity, User, Comment } = require("../../models");

router.get("/", (req, res) => {
  Activity.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "location",
      "occurrence",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM attending WHERE activity.id = attending.activity_id)"
        ),
        "attending_count",
      ],
    ],
    order: [["occurrence", "ASC"]],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "activity_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbActivityData) => res.json(dbActivityData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Activity.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "description",
      "location",
      "occurrence",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM attending WHERE activity.id = attending.activity_id)"
        ),
        "attending_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "activity_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbActivityData) => {
      if (!dbActivityData) {
        res.status(404).json({ message: "No activity found with this id" });
        return;
      }
      res.json(dbActivityData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Activity.create({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    occurrence: req.body.occurrence,
    organizer_id: req.body.user_id,
  })
    .then((dbActivityData) => res.json(dbActivityData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add attending parties to an activity
// POST route for attending an activity
// POST /api/activity/attend

router.put("/:id", (req, res) => {
  Activity.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbActivityData) => {
      if (!dbActivityData[0]) {
        res.status(404).json({ message: "No activity found with this id" });
        return;
      }
      res.json(dbActivityData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Activity.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbActivityData) => {
      if (!dbActivityData) {
        res.status(404).json({ message: "No activity found with this id" });
        return;
      }
      res.json(dbActivityData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
