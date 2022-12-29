const router = require('express').Router();
let Option = require('../models/option.model');
const { Schema, default: mongoose } = require('mongoose');
const default_schema_version = 1;
router.route('/').get((req, res) => {
    Option.find()
        .then(op => res.json(op))
        .catch(err => res.status(400).json(err));
});
router.route('/add').post((req, res) => {
    const body = req.body.body;
    const chosenBy = req.body.chosenBy;
    const isAnswer = req.body.isAnswer;
    const question_id = req.body.question_id;
    const newOption = new Option({
        body: body,
        chosenBy: chosenBy,
        isAnswer: isAnswer,
        question_id: question_id,
        schema_version: default_schema_version,
    });
    newOption.save()
        .then(() => res.json('Option Added!'))
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
    if (req.body.question_id != null)
        update.$set.question_id = req.body.question_id;
    if (req.body.schema_version != null)
        update.$set.schema_version = req.body.schema_version;
    Option.findOneAndUpdate(
        filter,
        update,
    )
        .then((response) => res.json(response))
        .catch(err => console.log(err));
});
module.exports = router;