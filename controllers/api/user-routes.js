<<<<<<< HEAD
const router = require("express").Router();
// TODO: need to require the models

//post route for logining in
router.post("/login", (req, res) => {
  // I assume we are logging in with email, if they don't have an account they will need to go sign up

//  Profile.findOne({
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
=======
const router = require('express').Router();
const { User, Activity, Interested, Comment, Attending } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Activity,
                attributes: ['id', 'title', 'description', 'location', 'occurrence', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Activity,
                    attributes: ['title', 'location', 'occurrence']
                }
            },
            {
                model: Activity,
                attributes: ['title'],
                through: Interested,
                as: 'interested_activities'
            },
            {
                model: Activity,
                attributes: ['title'],
                through: Attending,
                as: 'attending_activities'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        zip: req.body.zip,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
>>>>>>> main
