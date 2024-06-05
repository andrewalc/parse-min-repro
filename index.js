const express = require('express');
const { resolve } = require('path');
const ParseServer = require('parse-server').ParseServer;
const { MongoMemoryServer } = require('mongodb-memory-server-global');

const app = express();

async function main() {
  // Create a memory server and get its uri
  const mongod = await MongoMemoryServer.create({
    instance: {
      ip: '::,0.0.0.0',
      dbName: 'db',
    },
  });

  const server = new ParseServer({
    databaseURI: mongod.getUri(), // Connection string for your MongoDB database
    cloud: './cloud/main.js', // Path to your Cloud Code
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
