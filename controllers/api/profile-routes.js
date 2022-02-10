const router = require("express").Router();
// TODO: need to require the models

//post route for logining in
router.post("/login", (req, res) => {
  // I assume we are logging in with email, if they don't have an account they will need to go sign up

//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   }).then((profileData) => {
//     if (!profileData) {
//       res.status(400).json({ message: "No user with that email address!" });
//       return;
//     }
//     //   TODO: the password part of this because I really dont know

//     req.session.save(() => {
//       req.session.user_id = profileData.id;
//       req.session.username = profileData.username;
//       req.session.loggedIn = true;

//       res.json({ user: profileData, message: "You are now logged in!" });
//     });
//   });
});

//post route for logging out literally just stole this code
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });
//creating a user is also a post route
router.post("/login", (req, res) => {
  // I assume we are logging in with email, if they don't have an account they will need to go sign up

  res.json({ user: profileData, message: "You are now logged in!" });
});

//if we wanted to view other peoples profiles it would be a general get for name and age
//if we wanted to view a complete profile it would be a whole page in handlebars
