var router = require('express').Router();
const { Schema, default: mongoose } = require('mongoose');
let forumPost = require('../models/forumPost.model');
router.route('/').get((req, res) => {
    forumPost.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
router.route('/findOne').post((req, res) => {
    forumPost.findById(req.body._id)
        .then(st => res.json(st))
        .catch(err => res.json(err));
})
router.route('/add').post((req, res) => {
    const body = req.body.body;
    const upvotes = req.body.uvpvotes;
    const anonymous = req.body.anonymous;
    const postedBy = req.body.postedBy;
    const edited = req.body.edited;
    const responses = req.body.responses;
    const isReply = req.body.isReply;
    const newforumPost = new forumPost({
        body,
        upvotes,
        anonymous,
        postedBy,
        edited,
        responses,
        isReply
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
router.route('/update').post((req, res) => {
    const id = req.body._id
    forumPost.findByIdAndUpdate(id)
        .then(forumPost => {
            let body = null || req.body.body;
            let upvotes = null || req.body.uvpvotes;
            let anonymous = null || req.body.anonymous;
            let postedBy = null || req.body.postedBy;
            let edited = null || req.body.edited;
            let responses = null || req.body.responses;
            let addToResponses = null || req.body.addToResponses;
            let isReply = null || req.body.isReply;
            // console.log(forumPost);
            if (body != null)
                forumPost.body = body;
            if (upvotes != null)
                forumPost.upvotes = upvotes;
            if (anonymous != null)
                forumPost.anonymous = anonymous;
            if (postedBy != null)
                forumPost.postedBy = postedBy;
            if (edited != null)
                forumPost.edited = edited;
            if (responses != null)
                forumPost.responses = responses;
            if (addToResponses != null)
                forumPost.responses = [...forumPost.responses, addToResponses];
            if (isReply != null)
                forumPost.isReply = isReply;
            forumPost.save()
                .then(() => res.json('forum post Updated.'))
                .catch((err) => res.status(400).json(err));
        });
});
router.route('/replies').post((req, res) => {
    const id = req.body._id;
    forumPost.findById(id)
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
module.exports = router;