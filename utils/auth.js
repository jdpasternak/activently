const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  const withOwned = (req, res, next) => {
      if (!req.user_id === user_id){
          res.delete()
          res.put()
      }
      }
  module.exports = withAuth;