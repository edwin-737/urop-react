
## **Azure Static Web Apps**
#### **Creating the github repo locally**
The first component of the application is the static frontend, hosted on **Azure Static Web Apps**
1. Open Visual Studio Code.  
2. In the VS code terminal `npx create-react-app <name of your frontend static web app>`
3. `cd <name of your frontend static web app>`
4. `git init`
5. `gh repo create`
6.  **? What would you like to do?**   Push an existing local repository to GitHub  
    **? Path to local repository**  .  
    **? Repository name**  "Choose an app name"  
    **? Description**  "write an app description"  
    **? Visibility**  Public  
    **✓ Created repository edwin-737/demo-urop-react on GitHub**  
    **? Add a remote?**  Yes  
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
Then go to the github repo of your app, and click the "Actions" tab, wait for the latest deployment, and after its done, go back to your site's link from earlier. You should see the text "Testing Azure Deployment" now.

**Possible error**
If your deployment is unsuccessful, in the actions tab, the symbol next to the commit message of that deployment will be a red cross, click on that deployment, and then click the "Build and deploy" dropdown to view the error. It will likely be a mistake in your frontend code. Common causes include:
1. Importing an unused file in a react.js file
2. Not passing a return statement to an `Array.map()` function.
3. Other ReactJS errors.

## **Azure App Services**

We will utilise the azure app service resource to host a NodeJS server. 


### Creating the Resource on Azure
First we must create the azure app service on azure. 
**1**. Go to [this](https://azure.microsoft.com/en-us/get-started/azure-portal)  
**2**. Click sign in, and enter your azure admin credentials  
**3**. Once logged in, in the home page you should see a row of icons, click on the 'App Services' icon.  
<img src="/public/images/app-services-tutorial/create0.png" alt="create"
     style="width:120%;height:120%"></img>   

**4**. Click '+ Create' button.  
<img src="/public/images/app-services-tutorial/create1.png" alt="create"
     style="width:120%;height:120%"></img>   
**5**. Azure will direct you to a form page as shown below  
<img src="/public/images/app-services-tutorial/create2.png" alt="create"
     style="width:120%;height:120%"></img>   
<img src="/public/images/app-services-tutorial/create2_1.png" alt="create"
     style="width:120%;height:120%"></img>   

### **1. Azure Subscription**:  
Choose one of your azure subscriptions  
### **2. Resource Group**:  
Use the same resource group that your frontend static web app used  
### **3. Name**:  
Choose a name for your app services resource  
### **4. Publish:  
code  
### **5. Runitme stack**:  
Use the NodeJS version your backend uses, to check this, in VS code terminal, travel to your backend directory, and use `npm --version`.  
### **6. Operating System**:  
Linux **(this part is very important if we want to make the CI/CD process simpler)**
### **7. Region**:  
East Asia  
### **8. Linux Plan (East Asia)**:  
Click "new" and name your linux plan  
### **9. Pricing Plan**:
Click Change size, and choose "Free" tier
### **10. Zone Redundancy**:  
Disabled  

### **11. Now Click "Next:Deployment" button at the bottom of the page**  

Now the following form appears  
<img src="/public/images/app-services-tutorial/deployment.png" alt="deployment"
     style="width:120%;height:120%"></img>   

### **1. Continuous deployment**  
Disable

### **2. Click Next:Networking  

Now the following form appears
<img src="/public/images/app-services-tutorial/networking.png" alt="networking"></img>  

### **1. Enable public access**  
On
### **2. Click Next:Monitoring
Now the following form appears
<img src="/public/images/app-services-tutorial/monitoring.png" alt="monitoring"
     style="width:120%;height:120%"></img>   

### **1. Enable Application Insights**
Yes  
### **2. Application insights**
Use whatever azure put in the box, if the box is empty, click "create new"  
### **3. Click Next:Tags

**Now another form appears, but just skip this one, and directly click Next:Review+Create**

**Now a summary of all the information appears, read it and if everything seems correct, click the blue Create button on the bottom right of the screen.**

<img src="/public/images/app-services-tutorial/Review_create.png" alt="Review+create"
     style="width:120%;height:120%"></img>   

**Wait until azure finishes deploying, if deployment was successful, the page should look like the following**

<img src="/public/images/app-services-tutorial/post_deployed.png" alt="post_deployed"
     style="width:120%;height:120%"></img>   


## Creating the backend starter code

As specified in our README, we will utilise a NodeJS server for the backend, to speed up the process, you can use the express-generator package in npx.

To give a more detailed overview of the process
**1**. Enter VS code, navigate to the frontend directory used to store our azure static web app, in the VS code terminal, perform 
`npx express-generator backend --view ejs`, this will create a NodeJS web app in a directory named `backend`.
## Deploying backend to azure app service for the first time
**1**. If you haven't downloaded it, go to the extensions store on VS code, and install "azure app service", **the following steps depend on this**
**2**. In addition if you haven't downloaded it, go to the extensions store on VS code, and install "azure tools", **the following steps depend on this**
**3**. If there is a 'sign in' button Click 'sign in' to sign in to you azure tenant admin account.  
**4**. Click on the azure subscription which you used to host your app service in the previous steps.
**5**. A dropdown should appear, click "Azure app service".  
**6**. Another dropdown should appear, and the list that appears is a list of azure app services created using the subscription you selected.
**7**. Right click the app service you created in the previous steps, and click deploy to web app.
**8**. A text box should appear at the top of the page for you to select the backend directory you want to deploy. Click 'Browse' and search your computer for the directory you used to host your backend server, if you followed our tutorial, then the backend folder should be `/<name of your frontend static web app>/backend`.
**9**. An alert should appear. Click deploy
**10**. After about 50 secconds, open your browser and go to the url of your app service, the following starter page should be shown.
**11**. On the bottom right of your screen a notification from VS code appears, telling you to check your output window, click the blue text which says "output window". This will show the deployment progress from azure app service. After about 40s, you should see "Deployment Successful" as shown in our gif below.
Steps 1-11 of the deployment are shown in the gif below.
<video controls width="320" height="240" autoplay>
  <source src="/public/images/app-services-tutorial/deploy_vid.mov" type="video/mov">
  our
</video>
<img src="/public/images/app-services-tutorial/created_page.png" alt="created_page"
     style="width:120%;height:120%"></img>   

## Test CI/CD

Similar to our frontend, azure has allowed us to CI/CD an azure app service, and since we chose a linux OS earlier, the CI/CD process for our app service backend is even simpler compared to our frontend.
 
To test the CI/CD process, 
**1**. navigate to `/<name of your frontend static web app>/backend/views/index.ejs`    
**2**. Replace the html code in that file to the following:
```html
<!DOCTYPE html>
<html>

<head>
  <title>demo</title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
  <h1>
    starter page
  </h1>
  <p>Welcome to our app
  </p>
</body>

</html>
```
**3**. Save the `index.ejs` file and navigate to the Azure tools extension on the VS code sidepanel as shown below.

<img src="https://github.com/edwin-737/urop-react/blob/master/public/images/app-services-tutorial/deploy_vid.mp4" alt="created_page"
     style="width:120%;height:120%"></img>   
**4**. Repeat steps 4-11 of the [deploying backend to azure app service for the first time](https://github.com/edwin-737/urop-react/blob/master/SUTD%20Teams%20Portal%20documentation.md#creating-the-resource-on-azure)
**5**. Once deployment is successful in the output window, reopen the url of your azure app service, you should see the following image.
<img src="/public/images/edited_page.png" alt="edited_page"
     style="width:120%;height:120%"></img>   

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
