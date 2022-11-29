var router = require('express').Router();
// const { keyboard } = require('@testing-library/user-event/dist/keyboard');
const { Schema, default: mongoose, Mongoose } = require('mongoose');
let User = require('../models/user.model');
router.route('/').get((req, res) => {
    User.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
// router.route('/:id').get((req, res) => {
//     User.findById(req.params.id)
//         .then(st => res.json(st))
//         .catch(err => res.json(err));
// });
router.route('/findOne').post((req, res) => {
    User.findById(req.body._id)
        .then(st => res.json(st))
        .catch(err => res.json(err));
})
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const participation = req.body.participation;
    const email = req.body.email;
    const pillar = req.body.pillar;
    const type = req.body.type;
    const enrollmentPeriod = req.body.enrollmentPeriod;
    const newUser = new User({
        username,
        participation,
        email,
        type,
        pillar,
        enrollmentPeriod,
    });
    newUser.save()
        .then(() => res.json('user Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
// router.route('/:id').delete((req, res) => {
//     User.findByIdAndDelete(req.params.id)
//         .then(user => res.json(user))
//         .catch(err => res.status(400).json('error:' + err));
// });
// router.route('/update/:id').post((req, res) => {

//     const id = req.params.id;
//     User.findByIdAndUpdate(id)
//         .then(User => {

//             User.username = null || req.body.username;
//             User.participation = null || req.body.participation;
//             User.email = null || req.body.email;
//             User.type = null || req.body.type;
//             User.pillar = null || req.body.pillar;
//             User.enrollmentPeriod = null || req.body.enrollmentPeriod;
//             if (username != null)
//                 User.username = username;
//             if (participation != null)
//                 User.participation = participation;
//             if (email != null)
//                 User.email = email;
//             if (type != null)
//                 User.type = type;
//             if (pillar != null)
//                 User.pillar = pillar;
//             if (enrollmentPeriod != null)
//                 User.enrollmentPeriod = enrollmentPeriod;
//             User.save()
//                 .then(() => res.json('User Updated.'))
//                 .catch((err) => res.status(400).json(err));
//         });
// });

module.exports = router;