const router = require("express").Router();
const { User, Interest, UserInterest } = require("../../models");

router.get("/", (req, res) => {
  UserInterest.findAll({
    attributes: ["id", "user_id", "interest_id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Interest,
        attributes: ["name"],
      },
    ],
  })
    .then((dbUserInterestData) => res.json(dbUserInterestData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  UserInterest.create(req.body)
    .then((dbUserInterestData) => res.json(dbUserInterestData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  UserInterest.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserInterestData) => {
      if (!dbUserInterestData) {
        res
          .status(404)
          .json({ message: "No user interest found with that ID." });
      }
      res.json(dbUserInterestData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
