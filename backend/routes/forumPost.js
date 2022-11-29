var router = require('express').Router();
const { Schema, default: mongoose } = require('mongoose');
let forumPost = require('../models/forumPost.model');
router.route('/').get((req, res) => {
    forumPost.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
router.route('/add').post((req, res) => {
    const body = req.body.body;
    const upvotes = req.body.uvpvotes;
    const anonymous = req.body.anonymous;
    const postedBy = req.body.postedBy;
    const edited = req.body.edited;
    const responses = req.body.responses;
    const newforumPost = new forumPost({
        body,
        upvotes,
        anonymous,
        postedBy,
        edited,
        responses,
    });
    newforumPost.save()
        .then(() => res.json('forum post Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
router.route('/delete').post((req, res) => {
    var id = req.body._id;
    forumPost.findByIdAndDelete(id)
        .then(forumPost => res.json(forumPost))
        .catch(err => res.status(400).json('error:' + err));
});
router.route('/:id').post((req, res) => {
    forumPost.findByIdAndUpdate(req.params.id)
        .then(forumPost => {
            forumPost.body = req.body.body;
            forumPost.upvotes = req.body.uvpvotes;
            forumPost.anonymous = req.body.anonymous;
            forumPost.postedBy = req.body.postedBy;
            forumPost.edited = req.body.edited;
            forumPost.responses = req.body.responses;
            forumPost.save()
                .then(() => res.json('forum post Updated.'))
                .catch((err) => res.status(400).json(err));
        });
});
module.exports = router;