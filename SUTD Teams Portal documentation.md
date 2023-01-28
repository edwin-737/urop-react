
### **Azure Static Web Apps**
The first component of the application is the static frontend, hosted on **Azure Static Web Apps**
We followed the first page of
[this](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=react&pivots=github)
guide to create a github repository with build instructions from azure.

Our app uses the following settings:

**Build Preset**:React

**Hosting Platform**:Github

After following the first page of the guide, you will have a github
repository containing the frontend of the site, we will not be using
azure functions portion of the guide, because our backend API is hosted
on azure app services.

### **Azure App Services**

We will utilise this azure resource to host a NodeJS server. We followed
[this](https://www.youtube.com/watch?v=P4vt-OmUM8E&list=PLLasX02E8BPADO_R-D6ctSoV4EeE8ow9B)
video guide from Microsoft azure's youtube channel.

When creating the app in VS code, when prompted, we used NodeJS 14, and
free tier of the resource was used.

We have the basic structure of the app now, storing it in

`backend` folder.

### **Backend**
Folder structure
|____bin 
|_|____www
|____.deployment
|____models
|_|____chapter.model.js
|_|____option.model.js
|_|____user.model.js
|_|____course.model.js
|_|____email.model.js
|_|____question.model.js
|_|____forumPost.model.js
|____public
|_|____images
|_|____javascripts
|_|____stylesheets
|____package-lock.json
|____package.json
|____views
|_|____index.ejs
|_|____error.ejs
|____routes
|_|____question.js
|_|____user.js
|_|____chapter.js
|_|____option.js
|_|____index.js
|_|____course.js
|_|____token.js
|_|____forumPost.js
|____app.js

Entry point: app.js

### ** Models **

This folder contains schema for the different collections in the
teams-web-app namespace in MongoDB.

The collections are:

1.  **Chapters**

2.  **Courses**

3.  **Forumposts**

4.  **Options**

5.  **Questions**

6.  **Users**

Each file in the models directory creates an instance of the Mongoose
`Schema` object, using

```javascript
//import mongoose module
const mongoose = require('mongoose');
//create an instance of schema object
const Schema = mongoose.Schema;
```

After this initialisation, we define the schema and create the mongoose model object.
**User**
```javascript
const userSchema = new Schema({
                        
    //user's legal name
    username: { type: String, required: true },     
    //fill if its a student user
    participation: { type: Number, default: 0 },	   
    //index number given by SUTD                         
    index: { type: Number, required: true },			   
    //SUTD email address
    email: { type: String, required: true },        		   
    //0 for student, 1 for TA, 2 for professor
    type: { type: Number, default: 0 },                 
    //string in the form of MMM-YYYY
    enrollmentPeriod: { type: String, required: true },  
    //representation of user in Azure Active Directory   
    graph_id: { type: String, required: true },		   
    //array of user’s forumPosts, represented by array containing reference to forumPost collection
    forumPosts: [{					  
        type: Schema.Types.ObjectId,			   
        ref: "forumPost",
        required: true,
    }],
    //keep track of version of this collection’s schema using integer
    schema_version: { type: Number }
},
//keep track of when this document was uploaded to MongoDB.
    {
        timestamps:true
    });
//Define a mongoose model with name 'user' using the userSchema object we just created
//The mongoose.model function takes two arguments, first is the name of the model, second is the schema object used to define the model.
//Later on, in the corresponding routes file to 'user.model.js', we will create an instance of the model object, called a document, saving it to mongoDB
const user = mongoose.model('user', userSchema);
//export the model object
module.exports = user;
```
**Chapters**
```javascript
const chapterSchema = new Schema({
    //way of representing the class with unique floating point number
    code: { type: Number, required: true },
    //name of the class
    name: { type: String, required: true },
    /*array of questions related to the chapter represented as an array of MongoDB ObjectIDs.*/
    questions: [{ type: Schema.Types.ObjectId, ref: 'question' }],
    /*array of the ObjectIds of forumPosts related to the chapter*/
    forumPosts: [{ type: Schema.Types.ObjectId, ref: 'forumPost' }],
    /*array of the ObjectIds of chapters which fall under the current chapter */
    subchapters: [{ type: Schema.Types.ObjectId, ref: 'chapter' }],
    /*denote whether the class is a subchapter*/
    isSubchapter: { type: Boolean, required: true }
    schema_version: { type: Number, required: true, default: 2 },
},
    {
        timestamps: true,
    });
const chapter = mongoose.model("chapter", chapterSchema);
module.exports = chapter;
```
**question**
```javascript
const questionSchema = new Schema({
    /*Question body*/
    body: {type: String, required: true },
    /*0 for sq, 1 for single answer mcq,2 for multiple answer mcq,3 for T/F*/
    type: {
        type: Number,
        required: true
    }, 
    /*array of the ObjectIds of options of the current question
    if its type is 1 (single answer mcq) or 2 (multiple answer mcq)*/
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'option',
    }],
    /*array of ObjectIds of chapters related to this question*/
    chapters: [{
        type: Schema.Types.ObjectId,
        ref: 'chapter'
    }],
    /*way to represent the question with a unique string*/
    question_id: {
        type: String,
        required: true,
    },
    schema_version: { type: Number }
},
    {
        timestamps: true
    });
const question = mongoose.model('question', questionSchema);
module.exports = question;
```
**options**
```javascript
const optionSchema = new Schema({
    /*option body*/
    body: { type: String, required: true },
    /*total number of people who chose this option*/
    chosenBy: { type: Number, required: true, default: 0 },
    /*is this the correct answer to the question*/
    isAnswer: { type: Boolean, required: true },
    /*the question this option belongs to*/
    question_id: { type: String, required: true },
    schema_version: { type: Number },
},
    {
        timestamps:true,
    });
const option = mongoose.model("option", optionSchema);
module.exports = option;
```
**forumPosts**
```javascript
const forumPostSchema = new Schema({
    /*forumPost body*/
    body: { type: String, required: true },
    /*is this forumPost a reply to another  forumPost*/
    isReply: { type: Boolean, default: false, required: true },
    /* 0: student, 1: TA, 2: professor*/
    posterType: { type: Number, default: 0, },
    /*number of upvotes minus downvotes*/
    upvotes: { type: Number, default: 0 },
    /*did the poster choose to be anonymous*/
    anonymous: { type: Boolean, default: false },
    /*was this post edited*/
    edited: { type: Boolean, default: false },
    /*ObjectId of the user who made the forumPost*/
    postedBy: { type: Schema.Types.ObjectId, ref: "user" },
    /*aray of ObjectIds of responses related to this question*/
    responses: [{ type: Schema.Types.ObjectId, ref: "forumPost", }],
    /*title of the forumPost*/
    title: { type: String, required: false, default: "A forum Post by someone" },
    /*array of ObjectIds of chapters related to this question*/
    chapters: [{ type: String }],
    /*keep track of version of this collection’s schema using integer*/
    schema_version: { type: Number },
},
    {
        timestamps: true
    });
const forumPost = mongoose.model("forumPost", forumPostSchema);
module.exports = forumPost;
```
**course**
```javascript
const courseSchema = new Schema({
    /*name of course*/
    name: { type: String, required: true },
    /*array of the ObjectIds of users related to this course*/
    users: [{ type: Schema.Types.ObjectId, ref: "user" }],
    /*array of the ObjectIds of chapters within this course*/
    chapters: [{ type: Schema.Types.ObjectId, ref: "chapter" }],
    /*array of the ObjectIds of forumPosts within this course*/
    forumPosts: [{ type: Schema.Types.ObjectId, ref: "forumPost" }]
});
const course = mongoose.model("course", courseSchema);
module.exports = course;
```

**Routes**

This directory contains the code for the express server's HTTP routes for each collection in MongoDB. For each file in `routes`, we start by importing the corresponding model object from the `models` directory, for example, in `user.js`, we import `user.model.js`, throughout `user.js`, we will utilise the imported model to create documents and upload them to MongoDB.

A model in mongoose contains methods for creating, querying, updating, and deleting records. It provides an interface for our code to access these methods
```javascript
/*import express module, and create a Router() object.*/
var router = require('express').Router();
/*import the user model from MongoDB, which contains methods 
to query the collection*/
let User = require('../models/user.model');
/*set a default_schema_version, which can be updated later on.*/
const default_schema_version = 5;
```
First we have a route to get all documents in the corresponding MongoDB collection, for example, `user.js` will have a route to get all user docunents in the user collection, the code is as follows.
```javascript
router.route('/').get((req, res) => {
    /*query the User collection using the model's find() function, this retrieves all documents in the users collection, in the ///form of an array of JSON objects.*/
    User.find()
        .then(st => res.json(st))
        .catch(err => res.status(400).json(err));
});
```
Second, we have a route to retrieve a single document using the unique mongoDB objectId of said document.
```javascript
router.route('/findOne').post((req, res) => {
    User.findById(req.body._id)
        .then(st => res.json(st))
        .catch(err => res.json(err));
})
```
Third, we have a route to upload a document to MongoDB.
```javascript
/*use post route because we want to send data in the request body*/
router.route('/add').post((req, res) => {
    /*create an instance of the User model, using parameters from the requesst body*/
    const newUser = new User({
        username: req.body.username,
        participation: req.body.participation,
        user_id: req.body.user_id,
        email: req.body.email,
        type: req.body.type,
        enrollmentPeriod: req.body.enrollmentPeriod,
        graph_id: req.body.graph_id,
        forumPosts: req.body.forumPosts,
        schema_version: default_schema_version,
    });
    /*use the save function of the model object, this uploads the data to MongoDB*/
    newUser.save()
        .then(() => res.json('user Added!'))
        .catch((err) => (res.status(400).json(`Error:${err}`)));
});
```
Fourth, we have the delete route
```javascript
/*use post route because we store data in the request body*/
router.route('/delete').post((req, res) => {
    /*get the id of the user we want to delete*/
    const id = req.body._id;
    /*use findByIdAndDelete which takes in the document's id which we want to delete.*/
    User.findByIdAndDelete(id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('error:' + err));
});
```
Fifth we have the update route
```javascript
/*use post request as we tell the API what we want to update through requesst body parameters*/
router.route('/update').post((req, res) => {
    /*Use a filter to tell MongoDB which document to update*/
    const filter = {  _id: req.body._id };
    /*MongoDB updates a document using findOneAndUpdate, which takes a
    javascript object to know which properties to update and what value they should take.
    We create an object called update with two properties $set, and $push 
    which are built-in mongoose properties that tell MongoDB which properties to change and how to change them. 
    For instance $set:{participation:30} will change the participation property of the user to 30.*/
    var update = { $set: {}, $push: {} }
    /*properties is an array containing possible properties of the user we want to update*/
    const properties = ['username', 'participation', 'email', 'user_id', 'enrollmentPeriod', 'graph_id', 'forumPosts'];
    /*loop over properties to see which ones are included in the request body*/
    for (var i = 0; i < properties.length; i++)
        /*check if the property exists in the request body*/
        if (req.body[properties[i]] != null)
            /*if it exists, add it to the $set property of the update object*/
            update.$set[properties[i]] = req.body[properties[i]];
    /* use findOneAndUpdate to change the document according to the filter
     and update parameters we created.*/
    User.findOneAndUpdate(
        filter,
        update,
    )
        .then((response) => res.json(response))
        .catch(err => console.log(err));
});
```
Other files in `routes` follow the same pattern and routes, only differing on the properties updated/searched for.
