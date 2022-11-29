const router = require('express').Router();
let Option = require('../models/option.model');
const { Schema, default: mongoose } = require('mongoose');
router.route('/').get((req, res) => {
    Option.find()
        .then(op => res.json(op))
        .catch(err => res.status(400).json(err));
});
router.route('/add').post((req, res) => {
    const body = req.body.body;
    const chosenBy = req.body.chosenBy;
    const isAnswer = req.body.isAnswer;
    const newOption = new option({
        body: body,
        chosenBy: chosenBy,
        isAnswer: isAnswer,
    });
    newOption.save()
        .then(() => res.json('Option Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));

});
router.route('/update').post((req, res) => {

    const id = req.body.id;
    Option.findByIdAndUpdate(id)
        .then(option => {
            const body = req.body.body || null;
            const chosenBy = req.body.chosenBy || null;
            const isAnswer = req.body.isAnswer || null;
            if (body != null)
                option.body = body;
            if (chosenBy != null)
                option.chosenBy = chosenBy;
            if (isAnswer != null)
                option.isAnswer = isAnswer;
            option.save()
                .then(() => res.json('option Updated.'))
                .catch((err) => res.status(400).json(err));
        });
});
module.exports = router;