## **Description**

The following application consists of two parts, a tab application in
microsoft teams, as well as a teams chatbot.

The purpose of this application is to allow students to post queries
they may have about course material on microsoft teams, and professors
can answer them conveniently. Students can categorise their questions
and professors can sort based forum posts based on those tags. Students
can view which posts have the most upvotes and content from previous
years. Professors can add content they find useful and students can view
them through the app.

Although edimension has a forum page, it may not be very convenient to
open during a teams meeting, whereas if the forum was built into teams,
user experience may improve as students will likely be logged into teams
anyway, and it may reduce the need to switch tabs. In addition,
edimension does not currently interact with student email inboxes or
microsoft calendar, but this app would add those functionalities through
the Microsoft Graph API

## **Installation**

On the side-panel in teams, click on the **'Apps'** tab and search for
'**urop 1.0'**, then click add.

## **Built Using**

[**[Azure static web
apps]{.underline}**](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=react&pivots=github):
Hosting react frontend

[**[Azure app
service]{.underline}**](https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-vscode):
Hosting express Backend

[**[Azure active
directory]{.underline}**](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-access-create-new-tenant):
Microsoft graph functionality, integrating with user email, teams data,
single sign on functionality.

[**[MongoDB]{.underline}**](https://www.mongodb.com/): NoSQL database to
store all data of the app

[**[Express]{.underline}**](https://expressjs.com/): Javascript library
for backend API

[**[React]{.underline}**](https://reactjs.org/docs/getting-started.html):
Frontend Framework

[**[NodeJS]{.underline}**](https://nodejs.org/en/docs/): Javascript
runtime environment for server

[[Azure
Tools]{.underline}](https://code.visualstudio.com/docs/azure/extensions):
Visual studio code extension for deploying frontend to Azure Static Web
Apps and Backend to Azure App Services for continuous
integration/continuous deployment CI/CD.

### **Azure Static Web Apps**

We followed the first page of
[[this]{.underline}](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=react&pivots=github)
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
[[this]{.underline}](https://www.youtube.com/watch?v=P4vt-OmUM8E&list=PLLasX02E8BPADO_R-D6ctSoV4EeE8ow9B)
video guide from Microsoft azure's youtube channel.

When creating the app in VS code, when prompted, we used NodeJS 14, and
free tier of the resource was used.

We have the basic structure of the app now, storing it in

\`\`\`backend\`\`\` folder.

### **Backend**

Our folder structure

\|\_\_\_\_bin

\| \|\_\_\_\_www

\|\_\_\_\_.deployment

\|\_\_\_\_models

\| \|\_\_\_\_chapter.model.js

\| \|\_\_\_\_option.model.js

\| \|\_\_\_\_user.model.js

\| \|\_\_\_\_course.model.js

\| \|\_\_\_\_email.model.js

\| \|\_\_\_\_question.model.js

\| \|\_\_\_\_forumPost.model.js

\|\_\_\_\_public

\| \|\_\_\_\_images

\| \|\_\_\_\_javascripts

\| \|\_\_\_\_stylesheets

\|\_\_\_\_package-lock.json

\|\_\_\_\_package.json

\|\_\_\_\_views

\| \|\_\_\_\_index.ejs

\| \|\_\_\_\_error.ejs

\|\_\_\_\_routes

\| \|\_\_\_\_question.js

\| \|\_\_\_\_user.js

\| \|\_\_\_\_chapter.js

\| \|\_\_\_\_option.js

\| \|\_\_\_\_index.js

\| \|\_\_\_\_course.js

\| \|\_\_\_\_token.js

\| \|\_\_\_\_forumPost.js

\|\_\_\_\_app.js

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
\`\`\`Schema\`\`\` object, using

\`\`\`

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

\`\`\`
