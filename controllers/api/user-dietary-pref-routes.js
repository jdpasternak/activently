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
