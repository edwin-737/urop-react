var router = require('express').Router();
const { Schema, default: mongoose, Mongoose } = require('mongoose');
let User = require('../models/user.model');
const default_schema_version = 5;
router.route('/').get((req, res) => {
    User.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
router.route('/findOne').post((req, res) => {
    User.findById(req.body._id)
        .then(st => res.json(st))
        .catch(err => res.json(err));
})
router.route('/add').post((req, res) => {
    // const username = req.body.username;
    // const participation = req.body.participation;
    // const user_id = req.body.user_id;
    // const email = req.body.email;
    // const type = req.body.type;
    // const enrollmentPeriod = req.body.enrollmentPeriod;
    // const graph_id = req.body.graph_id;
    // const forumPosts = req.body.forumPosts;
    // const schema_version = default_schema_version;
    const newUser = new User({
        username: req.body.username,
        participation: req.body.participation,
        user_id: req.body.user_id,
        email: req.body.email,
        type: req.body.type,
        enrollmentPeriod: req.body.enrollmentPeriod,
        graph_id: req.body.graph_id,
        forumPosts: req.body.forumPosts,
        schema_version: default_schema_version,
    });
    newUser.save()
        .then(() => res.json('user Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
router.route('/delete').post((req, res) => {
    const id = req.body._id;
    User.findByIdAndDelete(id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('error:' + err));
});
router.route('/update').post((req, res) => {
    const filter = { username: req.body.username };
    var update = { $set: {}, $push: {} }

    const properties = ['username', 'participation', 'email', 'user_id', 'enrollmentPeriod', 'graph_id', 'forumPosts'];
    for (var i = 0; i < properties.length; i++)
        if (req.body[properties[i]] != null)
            update.$set[properties[i]] = req.body[properties[i]];
    User.findOneAndUpdate(
        filter,
        update,
    )
        .then((response) => res.json(response))
        .catch(err => console.log(err));
    // const id = req.body._id;
    // User.findByIdAndUpdate(id)
    //     .then(User => {
    // username = null || req.body.username;
    // participation = null || req.body.participation;
    // email = null || req.body.email;
    // type = null || req.body.type;
    // user_id = null || req.body.user_id;
    // enrollmentPeriod = null || req.body.enrollmentPeriod;
    // if (username != null)
    //     User.username = username;
    // if (participation != null)
    //     User.participation = participation;
    // if (email != null)
    //     User.email = email;
    // if (type != null)
    //     User.type = type;
    // if (user_id != null)
    //     User.user_id = user_id;
    // if (enrollmentPeriod != null)
    //     User.enrollmentPeriod = enrollmentPeriod;
    // User.save()
    //     .then(() => res.json('User Updated.'))
    //     .catch((err) => res.status(400).json(err));
    // });
});

module.exports = router;