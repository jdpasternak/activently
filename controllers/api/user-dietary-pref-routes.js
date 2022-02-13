const { UserDietaryPref } = require("../../models");
const router = require("express").Router();

router.post("/userDietaryPref", (req, res) => {
  UserDietaryPref.create({
    user_id: req.body.user_id,
    dietary_pref_id: req.body.dietary_pref_id,
  })
    .then((dbUserDietaryPrefData) => res.json(dbUserDietaryPrefData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/userDietaryPref/:id", (req, res) => {
  UserDietaryPref.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserDietaryPrefData) => {
      if (!dbUserDietaryPrefData) {
        res
          .status(404)
          .json({ message: "No user-dietarypreference with that ID." });
      }
      res.json(dbUserDietaryPrefData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
