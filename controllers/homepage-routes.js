const router = require("express").Router();
const { User, Activity, Interest, UserDietaryPref } = require("../models");
const withAuth = require("../utils/auth");

//need routes to navigate throughout the app
//just get routes for events

// Get all events_activities for homepage
router.get("/", async (req, res) => {
    try {
    const dbactivityData = await Activity.findAll({});

    const activitys = dbactivityData.map((activity) =>
      activity.get({ plain: true })
    );
    
    // console.log(req.session.loggedIn);

    // res.json(activitys);
    res.render('homepage', {
      activitys,
      // loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});






// [ ] TODO add routes to the users personal notifications

// // GET /homepage
// router.get("/homepage", withAuth, (req, res) => {
//   // [ ] TODO add homepage data
//   res.render("homepage");
// });

// GET /login
router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('login');
});

// GET /signup
router.get("/signup", withAuth, (req, res) => {
  res.render("signup");
});

// GET /profile
// a logged-in user's profile
// FIXME nested route
router.get("/profile", withAuth, (req, res) => {
  router.get(User, Activity, Interest, UserDietaryPref),
    (req, res) => {
      // FIXME unhandled Promise return
      User.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["user_id", "username", "email", "zip"],
        include: [
          {
            model: User,
            attributes: ["user_id", "username", "email", "zip"],
          },
        ],
      });
      // FIXME unhandled Promise return
      Interest.findAll({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "name"],
        include: [{ model: Interest, attributes: ["id", "name"] }],
      });

      // FIXME unhandled Promise return
      UserDietaryPref.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "user_id", "dietary_pref_id"],
        include: [
          {
            model: UserDietaryPref,
            attributes: ["dietary_pref_id"],
          },
        ],
      })
        .then((dbUserData) => {
          const user = dbUserData.map((user) => user.get({ plain: true }));
          // FIXME `posts` is not defined here
          res.render("userprofile")({ posts, loggedIn: true });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      res.render("userprofile", {
        // FIXME Modules are not table data. Must passed actual data
        User,
        Interest,
        UserDietaryPref,
        loggedIn: req.session.loggedIn,
      });
    };
});

// FIXME router.get("/"...) already defined
router.get("/", withAuth, (req, res) => {
  // FIXME unhandled Promise return
  Interest.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "description"],
    include: [
      {
        model: Interest,
        attributes: ["id", "name", "description"],
      },
    ],
  });
});

// // FIXME router.get("/"...) already defined
// router.get("/", withAuth, (req, res) => {
//   Activity.findAll({
//     attribures: [
//       "id",
//       "title",
//       "description",
//       "location",
//       "occurence",
//       "organizer_id",
//       "is_private",
//       "seats",
//       "rules",
//       "price",
//       "req_dietary_pref",
//       "interest_id",
//     ],
//     include: [
//       {
//         model: "Activity",
//         attributes: [
//           "id",
//           "title",
//           "description",
//           "location",
//           "occurence",
//           "organizer_id",
//           "is_private",
//           "seats",
//           "rules",
//           "price",
//           "req_dietary_pref",
//           "interest_id",
//         ],
//       },
//     ],
//   })
//     .then((dbactivityData) => {
//       const activity = dbactivityData.map((activity) =>
//         activity.get({ plain: true })
//       );
//       // FIXME `posts` is not defined here
//       res.render("activity")({ posts, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
