const withAuth = (req, res, next) => {
  if (!req.session.user.id) {
    res.redirect("/login");
  } else {
    next();
  }
};

const withOwned = (req, res, next) => {
  if (
    (!req.session.user_id, req.session.activity_id === activity.organizer_id)
  ) {
    res.redirect("/homepage");
  } else {
    next();
  }
};

module.exports = { withAuth, withOwned };

//we may need the organizer id and sql to get data from the activity
//Key question:
