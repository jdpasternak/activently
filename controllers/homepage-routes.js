const router = require("express").Router();
const {
  User,
  Activity,
  Interest,
  UserDietaryPref,
  UserInterest,
  DietaryPref,
  Attendance,
  Invitation,
} = require("../models");
const { sequelize } = require("../models/User");
const { withAuth } = require("../utils/auth");

//need routes to navigate throughout the app
//just get routes for events
//wait a minute Ive alread done this
router.get("/", (req, res) => {
  console.log(req.session);
  res.render("landing-page", { loggedIn: req.session.loggedIn });
});
// need routes to the users personal notifications
//

// [ ] TODO add routes to the users personal notifications
router.get("/")
// GET /homepage
router.get("/homepage", withAuth, (req, res) => {
  // [ ] TODO add homepage data
  Activity.findAll({
    attributes: [
      "id",
      "title",
      "location",
      "occurrence",
      "organizer_id",
      "seats",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM attendance WHERE activity.id = attendance.activity_id)"
        ),
        "attendance_count",
      ],
    ],
    include: [
      {
        model: User,
        through: Attendance,
        as: "attending",
      },
    ],
  })
    .then((dbActivityData) => {
      // console.log(
      //   dbActivityData.map((activity) => activity.get({ plain: true }))
      // );
      const activities = dbActivityData.map((activity) =>
        activity.get({ plain: true })
      );

      const pastOrgActivities = activities.filter((i) => {
        return (
          i.organizer_id === req.session.user_id &&
          new Date(i.occurrence) < new Date()
        );
      });

      const upcomingOrgActivities = activities.filter((i) => {
        return (
          i.organizer_id === req.session.user_id &&
          new Date(i.occurrence) > new Date()
        );
      });

      const pastAttendingActivities = activities.filter((i) => {
        return (
          i.attending.find((a) => a.id === req.session.user_id) &&
          new Date(i.occurrence) < new Date()
        );
      });

      const upcomingAttendingActivities = activities.filter((i) => {
        return (
          i.attending.find((a) => a.id === req.session.user_id) &&
          new Date(i.occurrence) > new Date()
        );
      });

      res.render("homepage", {
        activities: activities,
        pastOrgActivities: pastOrgActivities,
        upcomingOrgActivities: upcomingOrgActivities,
        pastAttendingActivities: pastAttendingActivities,
        upcomingAttendingActivities: upcomingAttendingActivities,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/browsing", withAuth, (req, res) => {
  Activity.findAll({
    attributes: ["id", "title", "description"],
  })
    .then((dbActivityData) => {
      const activities = dbActivityData.map((activity) =>
        activity.get({ plain: true })
      );
      res.render("browsing", {
        activities,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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
  Activity.findOne({
    where: {
      id: req.params.id
    },

    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: User,
        through: Invitation,
        attributes: ["id", "username"],
        as: "invited",
      },
      {
        model: User,
        through: Attendance,
        attributes: ["id", "username"],
        as: "attending",
      },
    ],
  })
    .then((dbActivityData) => {
      res.render("activity", {
        activity: dbActivityData.get({ plain: true }),
        user_id: req.session.user_id,
        loggedIn: req.session.loggedIn,
        attending_count: dbActivityData.attending.length,
        seatsAvailable: dbActivityData.seats > dbActivityData.attending.length,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* 
    GET /activity/edit/:id
    Renders a view allowing a user to edit an activity
*/
router.get("/activity/:id/edit", withAuth, (req, res) => {
  Activity.findOne({
    where: { id: req.params.id, organizer_id: req.session.user_id },
    include: [{ model: User, attributes: ["id", "username"] }],
  })
    .then((dbActivityData) => {
      if (!dbActivityData) {
        req.res.redirect(
          req.url
            .split("/")
            .splice(0, req.url.split("/").length - 1)
            .join("/")
        );
        return;
      }
      res.render("edit-activity", {
        activity: dbActivityData.get({ plain: true }),
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get(
  "/activity/zip/:location",
  /* withAuth, */ (req, res) => {
    Activity.findAll({
      where: {
        location: req.params.location,
      },
      attributes: ["id", "title", "description"],
    })
      .then((dbActivityData) => {
        if (dbActivityData.length < 1) {
          res.render("browsing", {
            activities: [{ title: "No activities found" }],
            loggedIn: req.session.loggedIn,
          });
          return;
        }
        const activities = dbActivityData.map((activity) =>
          activity.get({ plain: true })
        );
        res.render("browsing", { activities, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
);
module.exports = router;
