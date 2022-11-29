var router = require('express').Router();
const { Schema, default: mongoose } = require('mongoose');
let course = require('../models/course.model');
router.route('/').get((req, res) => {
    course.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const users = req.body.users;
    const chapters = req.body.chapters;
    const forumposts = req.body.forumposts;
    const newCourse = new studentQuery({
        name,
        users,
        chapters,
        forumposts
    });
    newStudentQuery.save()
        .then(() => res.json('Student Query Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
router.route('/:id').delete((req, res) => {
    course.findByIdAndDelete(req.params.id)
        .then(studentQuery => res.json(studentQuery))
        .catch(err => res.status(400).json('error:' + err));
});
router.route('/update/:id').post((req, res) => {
    course.findByIdAndUpdate(req.params.id)
        .then(course => {
            studentQuery.body = req.body.body;
            studentQuery.upvotes = req.body.uvpvotes;
            studentQuery.anonymous = req.body.anonymous;
            studentQuery.postedBy = req.body.postedBy;
            studentQuery.edited = req.body.edited;
            studentQuery.response = req.body.response;
            studentQuery.save()
                .then(() => res.json('Course Updated.'))
                .catch((err) => res.status(400).json(err));
        });
});
module.exports = router;