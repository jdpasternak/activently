<<<<<<< HEAD
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
=======
const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Activity, User, Interested, Comment, Attending } = require('../../models');

router.get('/', (req, res) => {
    Activity.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'location',
            'occurrence',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM interested WHERE activity.id = interested.activity_id)'),
            'interested_count'
            ],
            [sequelize.literal('(SELECT COUNT(*) FROM attending WHERE activity.id = attending.activity_id)'),
            'attending_count'
            ]
        ],
        order: [['occurrence', 'ASC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'activity_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbActivityData => res.json(dbActivityData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Activity.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'description',
            'location',
            'occurrence',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM interested WHERE activity.id = interested.activity_id)'),
            'interested_count'
            ],
            [sequelize.literal('(SELECT COUNT(*) FROM attending WHERE activity.id = attending.activity_id)'),
            'attending_count'
            ]
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'activity_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbActivityData => {
        if (!dbActivityData) {
            res.status(404).json({ message: 'No activity found with this id' });
            return;
        }
        res.json(dbActivityData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Activity.create({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        occurrence: req.body.occurrence,
        organizer_id: req.body.user_id
    })
    .then(dbActivityData => res.json(dbActivityData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// add interested indications to an activity
router.put('/interested', (req, res) => {
    Activity.interested(req.body, { Interested })
        .then(updatedActivityData => res.json(updatedActivityData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    });

// add attending parties to an activity
router.put('/attending', (req, res) => {
    Attending.create({
        user_id: req.body.user_id,
        activity_id: req.body.activity_id
    }).then(() => {
        return Activity.findOne({
            where: {
                id: req.body.activity_id
            },
            attributes: [
                'id',
                'title',
                'description',
                'location',
                'occurrence',
                'created_at',
                [
                    sequelize.literal('(SELECT COUNT(*) FROM attending WHERE activity.id = attending.activity_id)'),
                    'attending_count'
                ]
            ]
        })
        .then(dbActivityData => res.json(dbActivityData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    });
});

router.put('/:id', (req, res) => {
    Activity.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbActivityData => {
        if (!dbActivityData[0]) {
            res.status(404).json({ message: 'No activity found with this id' });
            return;
        }
        res.json(dbActivityData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Activity.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbActivityData => {
        if (!dbActivityData) {
            res.status(404).json({ message: 'No activity found with this id' });
            return;
        }
        res.json(dbActivityData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
>>>>>>> main
