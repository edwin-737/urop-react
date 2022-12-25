
require('isomorphic-fetch');
const azure = require('@azure/identity');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders =
  require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

let _settings = undefined;
let _deviceCodeCredential = undefined;
let _userClient = undefined;

function ensureGraphForAppOnlyAuth() {
  // Ensure settings isn't null
  if (!_settings)
    throw new Error('Settings cannot be undefined');

  if (!_clientSecretCredential) {
    _clientSecretCredential = new azure.ClientSecretCredential(
      _settings.tenantId,
      _settings.clientId,
      _settings.clientSecret
    );
  }

  if (!_appClient) {
    const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
      _clientSecretCredential, {
      scopes: ['https://graph.microsoft.com/.default']
    });

    _appClient = graph.Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}
module.exports.ensureGraphForAppOnlyAuth = ensureGraphForAppOnlyAuth;
//Functions below are for scopes using delegated permissions 
function initializeGraphForUserAuth(settings, deviceCodePrompt) {
  // Ensure settings isn't null
  if (!settings) {
    throw new Error('Settings cannot be undefined');
  }

  _settings = settings;

  _deviceCodeCredential = new azure.DeviceCodeCredential({
    clientId: settings.clientId,
    tenantId: settings.authTenant,
    userPromptCallback: deviceCodePrompt
  });

  const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
    _deviceCodeCredential, {
    scopes: settings.graphUserScopes
  });

  _userClient = graph.Client.initWithMiddleware({
    authProvider: authProvider
  });
}
module.exports.initializeGraphForUserAuth = initializeGraphForUserAuth;

async function getUserTokenAsync() {
  // Ensure credential isn't undefined
  if (!_deviceCodeCredential) {
    throw new Error('Graph has not been initialized for user auth');
  }

  // Ensure scopes isn't undefined
  if (!_settings?.graphUserScopes) {
    throw new Error('Setting "scopes" cannot be undefined');
  }

  // Request token with given scopes
  const response = await _deviceCodeCredential.getToken(_settings?.graphUserScopes);
  console.log(response);
  return response.token;
}
module.exports.getUserTokenAsync = getUserTokenAsync;
async function getUserAsync() {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }
  let users = await _userClient.api('/users')
    .get();
  return users;
  // return _userClient.api('/me')
  //   // Only request specific properties
  //   .select(['displayName', 'mail', 'userPrincipalName'])
  //   .get();
}
module.exports.getUserAsync = getUserAsync;

async function getInboxAsync() {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  return _userClient.api('/me/mailFolders/inbox/messages')
    // .select(['from', 'isRead', 'receivedDateTime', 'subject'])
    // .top(25)
    // .orderby('receivedDateTime DESC')
    .get();
}
module.exports.getInboxAsync = getInboxAsync;

async function sendMailAsync(subject, body, recipient) {
  // Ensure client isn't undefined
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  // Create a new message
  const message = {
    subject: subject,
    body: {
      content: body,
      contentType: 'text'
    },
    toRecipients: [
      {
        emailAddress: {
          address: recipient
        }
      }
    ]
  };

  // Send the message
  return _userClient.api('me/sendMail')
    .post({
      message: message
    });
}
module.exports.sendMailAsync = sendMailAsync;
//Functions below are for scopes using application permissions 

let _clientSecretCredential = undefined;
let _appClient = undefined;


async function getUsersAsync() {
  // ensureGraphForAppOnlyAuth();

  return _appClient?.api('/users')
    .select(['displayName', 'id', 'mail'])
    .top(25)
    .orderby('displayName')
    .get();
}
module.exports.getUsersAsync = getUsersAsync;
async function getUserEmail(id) {
  return _appClient?.api('/users/' + id)
    .select(['userPrincipalName'])
    .get();
}
module.exports.getUserEmail = getUserEmail;
