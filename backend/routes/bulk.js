const router = require('express').Router();
const { Schema, default: mongoose, Mongoose } = require('mongoose');
let User = require('../models/user.model');
const axios = require('axios');
const graphServerUrl = 'http://localhost:3002/'
const usersToUpload = []
router.route('/').get(async (req, res) => {

    const usersFromGraph = await axios.get(
        graphServerUrl + 'users'
    )
        .then((users) => {
            console.log('users from graph', users.data);
            return users.data;
        })
        .catch(err => console.log(err));
    for (let i = 0; i < usersFromGraph.length; i++) {
        curUser = {}
        retrievedUser = usersFromGraph[i];
        curUser.forumPosts = [];
        curUser.username = retrievedUser.displayName;
        curUser.email = retrievedUser.mail !== null ? retrievedUser.mail : curUser.username.split(' ').join('_') + '@urop01572.onmicrosoft.com';
        curUser.schema_version = 5;
        curUser.type = 0;
        curUser.index = i + 1;
        curUser.graph_id = retrievedUser.id;
        curUser.enrollmentPeriod = 'sep-2022';
        // console.log(curUser);
        usersToUpload.push(curUser);
    }
    console.log('usersToUpload-----------');
    console.log(usersToUpload);
    // .then(() => res.send(usersToUpload));
    res.send(usersToUpload);

});
router.route('/add').get((req, res) => {
    usersToUpload.forEach(async (user) => {
        const newUser = new User({
            username: user.username,
            index: user.index,
            email: user.email,
            type: user.type,
            graph_id: user.graph_id,
            enrollmentPeriod: user.enrollmentPeriod,
            schema_version: user.schema_version,
        });
        await newUser.save()
            .then((user) => {
                console.log(user);
            })
            .catch((err) => (res.status(400).json(`Error:${err}`)));
    });
});
module.exports = router