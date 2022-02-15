const withAuth = (req, res, next) => {
<<<<<<< HEAD
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
=======
 if (!req.session.user.id) {
     res.redirect('/login');
 }   else {
     next()
 }
}
module.exports = withAuth;

const withOwned =  (req, res, next) => {
  if (withAuth)
  if (!req.session.user_id, req.session.activity_id === activity.organizer_id) {
        res.redirect('/homepage');
    }   else {
        next()
    }
  }

   module.exports= withOwned

   //we may need the organizer id and sql to get data from the activity
   //Key question: 
>>>>>>> helpers
