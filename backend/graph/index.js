const readline = require('readline-sync');
const settings = require('./appSettings');
const graphHelper = require('./graphHelper');

var express = require('express');
var path = require('path');
const port = process.env.PORT || 3003;

initializeGraph(settings);

// Greet the user by name
async function getUser() {
  await greetUserAsync();
}
async function listUsersAsync() {
  try {
    const users = await graphHelper.getUserAsync();
    // const userEmail = user?.mail ?? user?.userPrincipalName;
    console.log(users);
    return users;
  } catch (err) {
    console.log(`Error getting users: ${err}`);
  }
}
getUser().then(() => {
  var app = express();

  var cors = require("cors");
  app.use(cors());
  app.use(express.json());
  /* GET home page. */
  app.get('/users', async (req, res, next) => {
    await listUsersAsync()
      .then((users) => {
        console.log(users)

        res.send(users);
      });
  });

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });

});
// var app = express();

// var cors = require("cors");
// app.use(cors());
// app.use(express.json());

// // app.use('/', indexRouter);
// var router = express.Router();
// /* GET home page. */
// router.get('/users', (req, res, next) => {
//   //   res.render('index', { title: 'Express' });
//   console.log(listUsersAsync())
//   // res.json(listUsersAsync());
//   // next();
// });
async function main() {
  console.log('JavaScript Graph Tutorial');

  let choice = 0;

  // Initialize Graph
  initializeGraph(settings);

  // Greet the user by name
  await greetUserAsync();

  const choices = [
    'Display access token',
    'List my inbox',
    'Send mail',
    'List users (requires app-only)',
    'Make a Graph call'
  ];

  while (choice != -1) {
    choice = readline.keyInSelect(choices, 'Select an option', { cancel: 'Exit' });

    switch (choice) {
      case -1:
        // Exit
        console.log('Goodbye...');
        break;
      case 0:
        // Display access token
        await displayAccessTokenAsync();
        break;
      case 1:
        // List emails from user's inbox
        await listInboxAsync();
        break;
      case 2:
        // Send an email message
        await sendMailAsync();
        break;
      case 3:
        // List users
        await listUsersAsync();
        break;
      case 4:
        // Run any Graph code
        await makeGraphCallAsync();
        break;
      default:
        console.log('Invalid choice! Please try again.');
    }
  }
}

// main();
function initializeGraph(settings) {
  graphHelper.initializeGraphForUserAuth(settings, (info) => {
    // Display the device code message to
    // the user. This tells them
    // where to go to sign in and provides the
    // code to use.
    console.log(info.message);
  });
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

/*async function listUsersAsync() {
  try {
    // Send mail to the signed-in user
    // Get the user for their email address
    const users = await graphHelper.getUserAsync();
    // const userEmail = user?.mail ?? user?.userPrincipalName;
    console.log(users);
    // if (!userEmail) {
    //   console.log('Couldn\'t get your email address, canceling...');
    //   return;
    // }

    // await graphHelper.sendMailAsync('Testing Microsoft Graph',
    //   'Hello world!', userEmail);
    // console.log('Mail sent.');
  } catch (err) {
    console.log(`Error getting users: ${err}`);
  }
}*/