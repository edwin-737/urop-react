var router = require('express').Router();
const { Schema, default: mongoose } = require('mongoose');
let forumPost = require('../models/forumPost.model');
const default_schema_version = 5;
router.route('/').get((req, res) => {
    forumPost.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
router.route('/findOne').post((req, res) => {
    forumPost.findOne({ _id: req.body._id })
        .then(fp => res.json(fp))
        .catch(err => res.json(err));
    // forumPost.findById(req.body._id)
    //     .then(st => res.json(st))
    //     .catch(err => res.json(err));
})
router.route('/findMany').post((req, res) => {
    const conditions = req.body;
    forumPost.find(conditions)
        .then(fp => res.json(fp))
        .catch(err => res.json(err));
})
router.route('/add').post((req, res) => {
    const body = req.body.body;
    const upvotes = req.body.upvotes;
    const anonymous = req.body.anonymous;
    const postedBy = req.body.postedBy;
    const edited = req.body.edited;
    const responses = req.body.responses;
    const isReply = req.body.isReply;
    const title = req.body.title;
    const tags = req.body.tags;
    const data = {
        body: body,
        upvotes: upvotes,
        anonymous: anonymous,
        postedBy: postedBy,
        edited: edited,
        responses: responses,
        isReply: isReply,
        title: title,
        tags: tags,
        schema_version: default_schema_version,
    };
    const newforumPost = new forumPost(data);
    newforumPost.save()
        .then((fp) => res.json(fp))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
router.route('/delete').post((req, res) => {
    var id = req.body._id;
    forumPost.findByIdAndDelete(id)
        .then(() => res.json('forum post deleted'))
        .catch(err => res.status(400).json('error:' + err));
});
router.route('/update').post(async (req, res) => {
    const filter = { _id: req.body._id };
    var update = { $set: {}, $push: {} }
    if (req.body.body != null)
        update.$set.body = req.body.body;
    if (req.body.upvotes != null)
        update.$set.upvotes = req.body.upvotes;
    if (req.body.anonymous != null)
        update.$set.anonymous = req.body.anonymous;
    if (req.body.postedBy != null)
        update.$set.postedBy = req.body.postedBy;
    if (req.body.edited != null)
        update.$set.edited = req.body.edited;
    if (req.body.responses != null)
        update.$set.responses = req.body.responses;
    if (req.body.isReply != null)
        update.$set.isReply = req.body.isReply;
    if (req.body.addToResponses != null)
        update.$push.responses = req.body.addToResponses
    if (req.body.addToTags != null)
        update.$push.tags = req.body.addToTags;
    forumPost.findOneAndUpdate(
        filter,
        update,
        { rawResult: true }
    )
        .then((response) => res.json(response))
        .catch(err => console.log(err));
});
module.exports = router;