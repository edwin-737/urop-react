const readline = require('readline-sync');
const settings = require('./appSettings');
const graphHelper = require('./graphHelper');

var express = require('express');
var path = require('path');
const { UsernamePasswordCredential } = require('@azure/identity');
const port = process.env.PORT || 3002;


async function main() {
  console.log('JavaScript Graph Tutorial');

  // Initialize Graph
  initializeGraph(settings);
  //sign in service principal
  ensureAppOnly();
  var app = express();

  var cors = require("cors");
  app.use(cors());
  app.use(express.json());
  /* GET home page. */
  app.get('/users', async (req, res) => {
    await listUsersAsync()
      .then(users => res.send(users));
  });

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });

}

main();
function initializeGraph(settings) {
  graphHelper.initializeGraphForUserAuth(settings, (info) => {
    // Display the device code message to
    // the user. This tells them
    // where to go to sign in and provides the
    // code to use.
    console.log(info.message);
  });
}
function ensureAppOnly() {
  graphHelper.ensureGraphForAppOnlyAuth();
}
async function greetUserAsync() {
  try {
    const user = await graphHelper.getUserAsync();
    console.log(`Hello, ${user?.displayName}!`);
    // For Work/school accounts, email is in mail property
    // Personal accounts, email is in userPrincipalName
    console.log(`Email: ${user?.mail ?? user?.userPrincipalName ?? ''}`);
  } catch (err) {
    console.log(`Error getting user: ${err}`);
  }
}

async function displayAccessTokenAsync() {
  try {
    const userToken = await graphHelper.getUserTokenAsync();
    console.log(`User token: ${userToken}`);
  } catch (err) {
    console.log(`Error getting user access token: ${err}`);
  }
}
async function listMailFolders() {
  try {
    const mailFolders = await graphHelper.getMailFolders();
    console.log(mailFolders);
  }
  catch (err) {
    console.log(`Error getting mail: ${err}`);
  }
}
async function listInboxAsync() {
  try {
    const messagePage = await graphHelper.getInboxAsync();
    console.log(messagePage);
    // const messages = messagePage.value;
    // for(const message of messages){
    //     console.log(message);
    //     console.log(`Message: ${message.subject ?? 'NO SUBJECT'}`);
    //     // console.log(`  From: ${message.from?.emailAddress?.name ?? 'UNKNOWN'}`);
    //     // console.log(`  Status: ${message.isRead ? 'Read' : 'Unread'}`);
    //     // console.log(`  Received: ${message.receivedDateTime}`);
    // }

  }
  catch (err) {
    console.log(`Error getting user's inbox: ${err}`);

  }
}

async function listUsersAsync() {
  try {
    const userPage = await graphHelper.getUsersAsync();
    const users = userPage.value;
    var userArr = []
    var userEmailArr = []
    // Output each user's details
    for (const user of users) {
      //user's general data
      userArr.push(user);
      //user's email retrieved separately
      await graphHelper.getUserEmail(user.id)
        .then(userEmail => userEmailArr.push(userEmail));
      // console.log(`User: ${user.displayName ?? 'NO NAME'}`);
      // console.log(`  ID: ${user.id}`);
      // console.log(`  Email: ${user.userPrincipalName ?? 'NO EMAIL'}`);
    }
    console.log(userEmailArr);
    // If @odata.nextLink is not undefined, there are more users
    // available on the server
    const moreAvailable = userPage['@odata.nextLink'] != undefined;
    console.log(`\nMore users available? ${moreAvailable}`);
    return userArr;
  } catch (err) {
    console.log(`Error getting users: ${err}`);
  }
}