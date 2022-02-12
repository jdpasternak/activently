const router = require("express").Router();

//need routes to navigate throughout the app
//just get routes for events
//wait a minute Ive alread done this
router.get("/", (req, res) => {
  res.json({ message: "Not a configured route" });
});
// need routes to the users personal notifications
//
