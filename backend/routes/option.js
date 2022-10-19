const router = require('express').Router();
let option = require('../models/option.model');
const { Schema, default: mongoose } = require('mongoose');
router.route('/').get((req, res) => {
    option.find()
        .then(op => res.json(op))
        .catch(err => res.status(400).json(err));
});
router.route('/add').post((req, res) => {
    const body = req.body.body;
    const studentIdList = req.body.studentId;
    const newOption = new option({
        body: body,
        chosenBy: studentIdList,
    });
    newOption.save()
        .then(() => res.json('Option Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));

});
router.route('/populate').get((req, res) => {
    option.find()
        .populate("chosenBy")
        .then(() => res.json('Option populated!'));
});
module.exports = router;