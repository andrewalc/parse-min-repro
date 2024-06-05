const express = require('express');
const { resolve } = require('path');
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
  });

  app.use(express.static('static'));

  app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
  });

  // Start server
  await server.start();

  // Serve the Parse API on the /parse URL prefix
  app.use('/parse', server.app);

  app.listen(1337, function () {
    console.log('parse-server-example running on port 1337.');
  });
}

main().then(() => {
  console.log('Server startup complete');
});


function cloudCode() {
  console.log("Cloud code start");
}