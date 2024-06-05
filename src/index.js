const express = require('express');
const ParseServer = require('parse-server').ParseServer;

const app = express();

async function main() {
  const server = new ParseServer({
    databaseURI: process.env.DATABASE_URI, // Connection string for your MongoDB database
    cloud: cloudCode, // Path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
    masterKeyIps: ['0.0.0.0/0', '::/0'],
  });

  // Start server
  await server.start();

  // Serve the Parse API on the /parse URL prefix
  app.use('/parse', server.app);

  app.listen(1337, function () {
    console.log('parse-server-example running on port 1337.');
  });
}

function cloudCode() {
  const obj = new Parse.Object("TestObject");

  console.log("Cloud code complete");
}

main().then(() => {
  console.log('Server startup complete');
});