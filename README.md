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

On the side-panel in Microsoft teams, click on the **'Apps'** tab and search for
**'urop 1.0'**, then click add.

## **Built Using**

[**Azure static web apps**](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=react&pivots=github):
Hosting react frontend

[**Azure app service**](https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-vscode):
Hosting express Backend

[**Azure active directory**](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-access-create-new-tenant):
Microsoft graph functionality, integrating with user email, teams data,
single sign on functionality.

[**MongoDB**](https://www.mongodb.com/): NoSQL database to
store all data of the app

[**Express**](https://expressjs.com/): Javascript library
for backend API

[**React**](https://reactjs.org/docs/getting-started.html):
Frontend Framework

[**NodeJS**](https://nodejs.org/en/docs/): Javascript
runtime environment for server

[Azure Tools](https://code.visualstudio.com/docs/azure/extensions):
Visual studio code extension for deploying Backend to Azure App Services for continuous
integration/continuous deployment (CI/CD).
