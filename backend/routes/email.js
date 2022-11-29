const router = require('express').Router();
let email = require('../models/email.model');
const { Schema, default: mongoose } = require('mongoose');
router.route('/').get((req, res) => {
    email.find()
        .then(email => res.json(email))
        .catch(err => res.status(400).json(err));
});
router.route('/add').post((req, res) => {
    const newEmail = new email({
        address: req.body.address,
    });
    newEmail.save()
        .then(() => res.json('email Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));

});
router.route('/:id').delete((req, res) => {
    email.findByIdAndDelete(req.params.id)
        .then(email => res.json(email))
        .catch(err => res.status(400).json('error:' + err));
});
module.exports = router;