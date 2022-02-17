const router = require("express").Router();
const { Interest } = require("../../models");

/* 
    GET /api/interests
    should return all interests from the database
*/
router.get("/", (req, res) => {
  Interest.findAll()
    .then((dbInterestData) => res.json(dbInterestData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
