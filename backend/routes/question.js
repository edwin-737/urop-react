const router = require('express').Router();
let Question = require('../models/question.model');
const { Schema, default: mongoose } = require('mongoose');
const default_schema_version = 1;
router.route('/').get((req, res) => {
    Question.find()
        .then(op => res.json(op))
        .catch(err => res.status(400).json(err));
});
router.route('/add').post((req, res) => {
    const body = req.body.body;
    const chosenBy = req.body.chosenBy;
    const isAnswer = req.body.isAnswer;
    const tags = req.body.tags;
    const question_id = req.body.question_id;
    const type = req.body.type;
    const newQuestion = new Question({
        body: body,
        chosenBy: chosenBy,
        isAnswer: isAnswer,
        schema_version: default_schema_version,
        tags: tags,
        question_id: question_id,
        type: type,
    });
    newQuestion.save()
        .then(() => res.json('Question Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));

});
router.route('/update').post((req, res) => {
    const filter = { _id: req.body._id };
    var update = { $set: {}, $push: {} };
    if (req.body.body != null)
        update.$set.body = req.body.body;
    if (req.body.chosenBy != null)
        update.$set.chosenBy = req.body.chosenBy;
    if (req.body.isAnswer != null)
        update.$set.isAnswer = req.body.isAnswer;
    if (req.body.schema_version != null)
        update.$set.schema_version = req.body.schema_version;
    if (req.body.question_id != null)
        update.$set.question_id = req.body.question_id;
    if (req.body.addToTags != null)
        update.$push.tags = req.body.addToTags;
    Question.findOneAndUpdate(
        filter,
        update,
    )
        .then((response) => res.json(response))
        .catch(err => console.log(err));
});
module.exports = router;