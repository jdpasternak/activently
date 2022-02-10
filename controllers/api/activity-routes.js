const router = require('express').Router();
//TODO: pull in the model for activities and profiles
// TODO: at least one to get all the activities and one to get specific event 
//get routes for the activity name, public or private, event details, comments and creator details
router.get('/', (req,res)=>{
    res.json({message:"No query configured"})
    //Activity.findAll
})
router.get('/:id', (req,res)=>{
    res.json({message:"No query configured"})
    
})
//will need one handlebars page for all, and one handlebars page that will be a single activity

//TODO: post routes for signups
router.post('/', (req,res)=>{
    // Activity.create({
    //     activity_title:
    //     activity_time:
    //     activity_day:
    //     activity_details: 
    //     profile_id:
    // })
    // .then (activityData => res.json(activityData))
    res.json({message:"No query configured"})
})
//TODO: put routes for updating event informations

//TODO:delete for deleting the event
router.delete('/:id', (req, res) => {
    res.json({message:"No query configured"})
    // Activity.destroy({
    //     where: {
    //         id: req.params.id
    //       }
    //     })
    //       .then(activityData => {
    //         if (!activityData) {
    //           res.status(404).json({ message: 'No activity found with this id' });
    //           return;
    //         }
    //         res.json(activityData);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //       });
    })
