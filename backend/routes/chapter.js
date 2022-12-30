var router = require('express').Router();
const { Schema, default: mongoose } = require('mongoose');
let Chapter = require('../models/chapter.model');
const default_schema_version = 1;
router.route('/').get((req, res) => {
    Chapter.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
router.route('/findOne').post((req, res) => {
    Chapter.findOne({ _id: req.body._id })
        .then(ch => res.json(ch))
        .catch(err => res.json(err));
})
router.route('/findMany').post((req, res) => {
    const conditions = req.body;
    Chapter.find(conditions)
        .then(ch => res.json(ch))
        .catch(err => res.json(err));
})
router.route('/add').post((req, res) => {
    const code = req.body.code;
    const name = req.body.name;
    const questions = req.body.questions;
    const forumPosts = req.body.forumPosts;
    const url = req.body.url;
    const subchapters = req.body.subchapters;
    const isSubchapter = req.body.isSubchapter;
    const data = {
        code: code,
        name: name,
        questions: questions,
        forumPosts: forumPosts,
        schema_version: default_schema_version,
        url: url,
        subchapters: subchapters,
        isSubchapter: isSubchapter,
    };
    const newChapter = new Chapter(data);
    newChapter.save()
        .then((ch) => res.json(ch))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
router.route('/delete').post((req, res) => {
    var id = req.body._id;
    Chapter.findByIdAndDelete(id)
        .then(() => res.json('forum post deleted'))
        .catch(err => res.status(400).json('error:' + err));
});
router.route('/update').post(async (req, res) => {
    const filter = { _id: req.body._id };
    var update = { $set: {}, $push: {} };
    if (req.body.code != null)
        update.$set.code = req.body.code;
    if (req.body.isSubchapter != null)
        update.$set.isSubchapter = req.body.isSubchapter;
    if (req.body.name != null)
        update.$set.name = req.body.name;
    if (req.body.schema_version != null)
        update.$set.schema_version = req.body.schema_version;
    if (req.body.url != null)
        update.$set.url = req.body.url;
    if (req.body.addToSubchapters != null) {
        console.log(req.body.addToSubchapters);
        update.$push.subchapters = req.body.addToSubchapters;
    }
    if (req.body.addToQuestions != null)
        update.$push.questions = req.body.addToQuestions;
    if (req.body.forumPosts != null)
        update.$push.forumPosts = req.body.addToForumPosts;
    Chapter.findOneAndUpdate(
        filter,
        update,
    )
        .then((response) => res.json(response))
        .catch(err => console.log(err));
});
module.exports = router;