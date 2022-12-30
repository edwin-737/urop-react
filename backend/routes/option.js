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
    const properties = ['body', 'chosenBy', 'isAnswer', 'question_id']
    for (var i = 0; i < properties.length; i++)
        if (req.body[properties[i]] != null)
            update.$set[properties[i]] = req.body[properties[i]];
    Option.findOneAndUpdate(
        filter,
        update,
    )
        .then((response) => res.json(response))
        .catch(err => console.log(err));
});
module.exports = router;