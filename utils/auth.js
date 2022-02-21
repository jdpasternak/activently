const { redirect } = require("statuses");

const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

// [ ] TODO - This function will not do what it should because req.session.activity_id and activity.organizer_id are not defined.  req.session will not hold data about the activity_id since the user may visit and make changes to many activity pages.

/* const withOwned = (req, res, next) => {
  if (
    (!req.session.user_id === req.activity.organizer_id)
  ) {
   next()
  }
  res.redirect("/homepage");
};

module.exports = { withAuth };

//we may need the organizer id and sql to get data from the activity
//Key question: */
