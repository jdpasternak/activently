const router = require('express').Router();
//TODO: pull in the model for comments and maybe auth
//TODO: definitely add with auth to the post and delete comments sections

//TODO: get routes for all the comments on an activity
router.get('/', (req, res) => {
    res.json({message:"No query configured"})
    // Comment.findAll()
    //   .then(commentData => res.json(commentData))
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    //   });
  });
//TODO: get routes for one comment on an activity but I don't know if we actually want to just get one comment
router.get('/:id', (req, res) => {
    res.json({message:"No query configured"})
//     Comment.findOne({
//         attributes: { exclude: ['password'] },
//         where: {
//           id: req.params.id
//         }
//     })
//       .then(commentData => res.json(commentData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
 });
//TODO:post routes for a comment on an activity, add auth
router.post('/', (req, res) => {
    res.json({message:"No query configured"})
    // Comment.create({
    //   comment_text: req.body.comment_text,
    //   profile_id: req.session.profile_id,
    //   activity_id: req.body.activity_id
    // })
    //   .then(commentData => res.json(commentData))
    //   .catch(err => {
    //     console.log(err);
    //     res.status(400).json(err);
    //   });
  });
  //TODO: delete route for comments on an activity, add auth
  router.delete('/:id', (req, res) => {
    res.json({message:"No query configured"})
    // Comment.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // })
    //   .then(commentData => {
    //     if (!commentData) {
    //       res.status(404).json({ message: 'No comment found with this id!' });
    //       return;
    //     }
    //     res.json(commentData);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    //   });
  });
