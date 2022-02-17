const router = require("express").Router();
const { Interest } = require("../../models");

/* 
    GET all interests
*/
router.get("/", (req, res) => {
  Interest.findAll({
    attributes: ["id", "name", "description"],
  })
    .then((dbInterestData) => {
      res.json(dbInterestData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
