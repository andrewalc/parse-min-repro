const express = require('express');
const ParseServer = require('parse-server').ParseServer;

async function main() {
  const app = express();
  const config = {
    databaseURI: process.env.DATABASE_URI, // Connection string for your MongoDB database
    cloud: () => { }, // Path to your Cloud Code
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY, // Keep this key secret!
    serverURL: process.env.SERVER_URL, // Don't forget to change to https if needed
    masterKeyIps: ['0.0.0.0/0', '::/0'], // Any IP allowed for dashboard access
  };
  // Start server
  const server = new ParseServer(config);
  await server.start();

  // Serve the Parse API on the /parse URL prefix
  app.use('/parse', server.app);

  app.listen(1337, function () {
    console.log('parse-server-example running on port 1337.');
    // Once parse is set up run your code
    afterStart();
  });
}

async function afterStart() {
  // Put parse code here
  console.log("Code complete");
}

// Start the server
main().then(() => {
  console.log('Server startup complete');
});