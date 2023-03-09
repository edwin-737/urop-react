const router = require('express').Router();
const { Schema, default: mongoose, Mongoose } = require('mongoose');
let User = require('../models/user.model');
const axios = require('axios');
const graphServerUrl = 'http://localhost:3002/'
const usersToUpload = []
router.route('/').get(async (req, res) => {
    var usersFromGraph = null;
    await axios.get(graphServerUrl + 'users')
        .then((users) => { usersFromGraph = users.data; });
    for (let i = 0; i < usersFromGraph.length; i++) {
        curUser = {}
        retrievedUser = usersFromGraph[i];
        curUser.username = retrievedUser.displayName;
        curUser.email = curUser.username.split(' ').join('_') + '@urop01572.onmicrosoft.com';
        curUser.schema_version = 3;
        if (i < 20)
            curUser.type = 0;
        else
            curUser.type = 2;
        curUser.user_id = 10 + i;
        curUser.enrollmentPeriod = 'sep-2022';
        console.log(curUser);
        usersToUpload.push(curUser);
    }
    // .then(() => res.send(usersToUpload));
    res.send(usersToUpload);

});
router.route('/add').get((req, res) => {
    usersToUpload.map(async (user) => {
        var username = user.username;
        var user_id = user.user_id;
        var email = user.email;
        var type = user.type;
        var enrollmentPeriod = user.enrollmentPeriod;
        var schema_version = user.schema_version;
        const newUser = new User({
            username,
            user_id,
            email,
            type,
            enrollmentPeriod,
            schema_version,
        });
        await newUser.save()
            .then(() => 1)
            .catch((err) => (res.status(400).json(`Error:${err}`)));
    });
});
module.exports = router