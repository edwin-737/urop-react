
## **Azure Static Web Apps**
#### **Creating the github repo locally**
The first component of the application is the static frontend, hosted on **Azure Static Web Apps**
1. Open Visual Studio Code.  
2. In the VS code terminal `npx create-react-app <name of your frontend static web app>`
3. `cd <name of your frontend static web app>`
4. `git init`
5. `gh repo create`
6.  **? What would you like to do?** Push an existing local repository to GitHub  
    **? Path to local repository** .  
    **? Repository name** "Choose an app name"  
    **? Description** "write an app description"  
    **? Visibility** Public  
    **✓ Created repository edwin-737/demo-urop-react on GitHub**  
    **? Add a remote?** Yes  
    **? What should the new remote be called?** origin  

### Configuring azure CI/CD workflow.
When creating the resource on azure, our app used the following settings:

#### **Build Preset**:
React
#### **Hosting Platform**:
Github
#### **Subscription**: 
Name of your azure subscription
#### **Resource Group**:
(New) Resource Group
#### **Plan Type**:
Free
#### **Azure Functions and Staging Details**: 
East Asia
#### **Deployment Details**
**Source**: Github
**Github Account**: `<Your Github account name>`
**Organization**:Choose your organization name

Then click **review + create**.

After azure validates the form, you click **create**.

Now you can view the resource you just created and click the "Github Actions Link" in your resource overview.

At the github actions page, you see a CI/CD workflow from github. This may take 2-3 minutes

Now return to your azure resource overview page, click the "URL" to view your site, you will see the default react page when you use the npx create-react-app command.

### Pushing Changes to Github

Now that we azure created build instructions in the form of a file called azure-static-web-apps-someName-givenByAzure.yml,
you can push changes to the repo, and those changes are automatically deployed by github actions.

To test this, go to VS code where your local repo is. Naviagate to src/app.js. change the text displayed from "Learn React" to "Testing Azure Deployment", save your file, open VS code's terminal, and type
`git add .`
`git commit -m 'second deployment to azure'`
`git push`
Then go to the github repo of your app, and click the Actions tab, wait for the latest deployment, and after its done, go back to your site's link from earlier. You should see the text "Testing Azure Deployment" now.

**Possible error**
If your deployment is unsuccessful, in the actions tab, the symbol next to the commit message of that deployment will be a red cross, click on that deployment, and then click the "Build and deploy" dropdown to view the error. It will likely be a mistake in your frontend code. Common causes include:
1. Importing an unused file in a react.js file
2. Not passing a return statement to a `Array.map()` function.
3. Other react errors.

## **Azure App Services**

We will utilise the azure app service resource to host a NodeJS server. 


### Creating the Resource on Azure
First we must create the azure app service on azure. 
**1**. Go to [this](https://azure.microsoft.com/en-us/get-started/azure-portal)
**2**. Click sign in, and enter your azure admin credentials
**3**. Once logged in, in the home page you should see a row of icons, click on the 'App Services' icon.
**4**. Click '+ Create' button.
<img src="/public/images/app-services-tutorial/create.png" alt="create">



To give a more detailed overview of the process, as some details were changed
**1**. inside the frontend directory used to store our azure static web app, in the VS code terminal, perform 
`npx express-generator backend --view ejs`, this will create a NodeJS web app in a directory named "backend".
**2**. Navigate to the Azure extension on your VS code sidepanel, if it isn't there, try check the extensions store in VS code to see wether you have installed it or not.
**3**. Click 'sign in' to sign in to you azure tenant admin account.
**4**. Click on the azure subscription you want to use for your app service resource, if you want to only use the free tier then it doesn't matter which subscription you choose.
**5**. A dropdown should appear, Right click Azure app service.
**6**. Click Create new web app.
**7**. A prompt will appear at the top of your screen, type the name you want for your app.
**8**. For runtime stack, we chose NodeJS 16, so it would be best if you followed it to ensure consistent behaviour of the app service.
**9**. For Pricing tier, we chose free tier.
When creating the app in VS code, when prompted, we used NodeJS 16, and
free tier of the resource was used.

We have the basic structure of the app now, storing it in

`backend` folder.

## **Backend**
Folder structure
\|\_\_\_\_bin

\| \|\_\_\_\_www

\|\_\_\_\_.deployment

\|\_\_\_\_models

\  \|\_\_\_\_chapter.model.js

\ \|\_\_\_\_option.model.js

\ \|\_\_\_\_user.model.js

\ \|\_\_\_\_course.model.js

\ \|\_\_\_\_email.model.js

\ \|\_\_\_\_question.model.js

\| \|\_\_\_\_forumPost.model.js

\|\_\_\_\_public

\ \|\_\_\_\_images

\ \|\_\_\_\_javascripts

\ \|\_\_\_\_stylesheets

\|\_\_\_\_package-lock.json

\|\_\_\_\_package.json

\|\_\_\_\_views

\ \|\_\_\_\_index.ejs

\ \|\_\_\_\_error.ejs

\|\_\_\_\_routes

\ \|\_\_\_\_question.js

\ \|\_\_\_\_user.js

\ \|\_\_\_\_chapter.js

\ \|\_\_\_\_option.js

\ \|\_\_\_\_index.js

\ \|\_\_\_\_course.js

\ \|\_\_\_\_token.js

\ \|\_\_\_\_forumPost.js

\|\_\_\_\_app.js

Entry point: app.js

## ** Models **

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
