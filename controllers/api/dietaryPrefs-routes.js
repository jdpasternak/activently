const router = require("express").Router();
const { DietaryPref } = require("../../models");

/* 
    GET all dietary preferences
*/
router.get("/", (req, res) => {
  Interest.findAll({
    attributes: ["id", "name", "description"],
  })
    .then((dbDietaryPrefData) => {
      res.json(dbDietaryPrefData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
