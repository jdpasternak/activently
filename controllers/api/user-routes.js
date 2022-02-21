const router = require("express").Router();
const {
  User,
  DietaryPref,
  UserDietaryPref,
  Interest,
  UserInterest,
  Activity,
  Attendance,
  Comment,
} = require("../../models");

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: DietaryPref,
        attributes: ["id", "name"],
        through: UserDietaryPref,
        as: "dietary_preferences",
      },
      {
        model: Interest,
        attributes: ["id", "name"],
        through: UserInterest,
        as: "interests",
      },
      {
        model: Activity,
        attributes: ["id", "title"],
        through: Attendance,
        as: "attending",
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: [
          {
            model: Activity,
            attributes: ["id", "title"],
          },
        ],
      },
      {
        model: Activity,
        attributes: [
          "id",
          "title",
          "description",
          "location",
          "occurrence",
          "interest_id",
          "is_private",
          "seats",
          "price",
          "req_dietary_pref",
        ],
        as: "organizing",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }

      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    zip: req.body.zip,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json({ dbUserData: dbUserData, message: "You are now logged in" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/dietaryPrefs", (req, res) => {
  UserDietaryPref.destroy({
    where: {
      user_id: req.session.user_id,
    },
  })
    .then((dbUserDietaryPrefData) => {
      res.json(dbUserDietaryPrefData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/interests", (req, res) => {
  UserInterest.destroy({
    where: {
      user_id: req.session.user_id,
    },
  })
    .then((dbUserInterestData) => {
      res.json(dbUserInterestData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that email address!" });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        return res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.session.user_id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
