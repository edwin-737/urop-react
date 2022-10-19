var router = require('express').Router();
const { Schema, default: mongoose } = require('mongoose');
let student = require('../models/student.model');
router.route('/').get((req, res) => {
    student.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const participation = req.body.participation;
    const newStudent = new student({
        username,
        participation,
    });
    newStudent.save()
        .then(() => res.json('Student Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
module.exports = router;