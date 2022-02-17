const router = require("express").Router();
const {
  User,
  Activity,
  Interest,
  UserDietaryPref,
  UserInterest,
  DietaryPref,
} = require("../models");
const { withAuth } = require("../utils/auth");

//need routes to navigate throughout the app
//just get routes for events

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("landing-page", { loggedIn: req.session.loggedIn });
});

// [ ] TODO add routes to the users personal notifications

// GET /homepage
router.get("/homepage", withAuth, (req, res) => {
  // [ ] TODO add homepage data
  res.render("homepage", { loggedIn: req.session.loggedIn });
});

// GET /login
router.get("/login", (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});

// GET /signup
router.get("/signup", (req, res) => {
  res.render("signup", { loggedIn: req.session.loggedIn });
});

// GET /profile
// a logged-in user's profile
router.get("/profile", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ["id", "username", "email", "zip"],
    include: [
      {
        model: Interest,
        attributes: ["id", "name"],
        through: UserInterest,
        as: "interests",
      },
      {
        model: DietaryPref,
        attributes: ["id", "name"],
        through: UserDietaryPref,
        as: "dietary_preferences",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with that ID." });
        return;
      }
      const user = dbUserData.get({ plain: true });
      console.log(user);
      res.render("userprofile", {
        user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/activity/new", withAuth, (req, res) => {
  res.render("newActivity", { loggedIn: req.session.loggedIn });
});

router.get("/activity/:id", withAuth, (req, res) => {
  Activity.findOne({ where: { id: req.params.id } })
    .then((dbActivityData) =>
      res.render("activity", dbActivityData.get({ plain: true }))
    )
    .catch((err) => {
      console.log(err);
    });
});

// router.get(
//   "/activity/:location",
//   /* withAuth, */ (req, res) => {
//     Activity.findAll({
//       where: {
//         location: req.params.location,
//       },
//       attributes: ["id", "title", "description"],
//     })
//       .then((dbactivityData) => {
//         const activity = dbactivityData.map((zipActivity) =>
//           zipActivity.get({ plain: true })
//         );
//         res.render("homepage", {
//           activity,
//           loggedIn: req.session.loggedIn,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   }
// );
// router.get(
//   "/activity/:id",
//   /* withAuth, */ (req, res) => {
//     Activity.findOne({
//       where: {
//         id: req.params.id,
//       },
//       attributes: ["id", "title", "description"],
//       include: [{ model: User, attribures: ["username"] }],
//     })
//       .then((dbactivityData) => {
//         const activity = dbactivityData.get({ plain: true });
//         res.render("activity", {
//           activity,
//           // loggedIn: req.session.loggedIn
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   }
// );

module.exports = router;
