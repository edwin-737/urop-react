const router = require('express').Router();
let Question = require('../models/question.model');
const { Schema, default: mongoose } = require('mongoose');
const default_schema_version = 1;
router.route('/').get((req, res) => {
    Question.find()
        .then(ch => res.json(ch))
        .catch(err => res.status(400).json(err));
});
router.route('/delete').post((req, res) => {
    const id = req.body._id;
    Question.findByIdAndDelete(id)
        .then(() => res.json('Question deleted'))
        .catch(err => res.status(400).json('error:' + err));
})
router.route('/add').post((req, res) => {
    const body = req.body.body;
    const tags = req.body.tags;
    const question_id = req.body.question_id;
    const type = req.body.type;
    const options = req.body.options;
    const newQuestion = new Question({
        body: body,
        type: type,
        options: options,
        tags: tags,
        schema_version: default_schema_version,
        question_id: question_id,
    });
    newQuestion.save()
        .then((question) => res.json(question))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
router.route('/update').post((req, res) => {
    const filter = { _id: req.body._id };
    var update = { $set: {}, $push: {} };
    if (req.body.body != null)
        update.$set.body = req.body.body;
    if (req.body.addToTags != null)
        update.$push.tags = req.body.addToTags;
    if (req.body.addToOptions != null)
        update.$push.options = req.body.addToOptions;
    Question.findOneAndUpdate(
        filter,
        update,
    )
        .then((response) => res.json(response))
        .catch(err => console.log(err));
});
module.exports = router;