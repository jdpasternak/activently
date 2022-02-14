const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Activity, User, Comment, Attendance } = require("../../models");

/* 
    READ Activity (all)
*/
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
          "(SELECT COUNT(*) FROM attendance WHERE activity.id = attendance.activity_id)"
        ),
        "attendance_count",
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

/* 
    READ Activity (by ID)
*/
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

/* 
    CREATE Activity
*/
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
router.post("/attend/:id", (req, res) => {
  Attendance.create({
    user_id: req.session.user_id,
    activity_id: req.params.id,
  })
    .then((dbActivityData) => dbActivityData)
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* 
    UPDATE Activity
*/
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

/* 
    DELETE Activity
*/
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
