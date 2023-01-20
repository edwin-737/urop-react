
### **Azure Static Web Apps**

We followed the first page of
[this](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=react&pivots=github)
guide to create a github repository with build instructions

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
| |____www
|____.deployment
|____models
| |____chapter.model.js
| |____option.model.js
| |____user.model.js
| |____course.model.js
| |____email.model.js
| |____question.model.js
| |____forumPost.model.js
|____public
| |____images
| |____javascripts
| |____stylesheets
|____package-lock.json
|____package.json
|____views
| |____index.ejs
| |____error.ejs
|____routes
| |____question.js
| |____user.js
| |____chapter.js
| |____option.js
| |____index.js
| |____course.js
| |____token.js
| |____forumPost.js
|____app.js

Entry point: app.js

**Models**

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

```
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
```
