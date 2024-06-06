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

  // Creating an PointerTest object
  const pointerTestObj = new Parse.Object("PointerTest");
  await pointerTestObj.save(null, { useMasterKey: true });

  // Create another object that has a pointer to the above object and sets properly
  const obj = new Parse.Object("SomeObject");
  obj.set("pointerTo", pointerTestObj);
  await obj.save(null, { useMasterKey: true });

  // Create another object and set the pointer field to null
  const fields2 = {
    pointerTo: null
  };
  const test1 = new Parse.Object("SomeObject", fields2);
  await test1.save(null, { useMasterKey: true });
  console.log("Saved test1");

  // Create another object, but this time set the field to null explicitly
  const test2 = new Parse.Object("SomeObject");
  test2.set("pointerTo", null);
  await test2.save(null, { useMasterKey: true });
  console.log("Saved test2");

  // Create another object, but this time the field is undefined
  // const fields = {
  //   pointerTo: undefined
  // };
  // const test3 = new Parse.Object("SomeObject", fields);
  // await test3.save(null, { useMasterKey: true });
  // console.log("Saved test3");
  /**
      /src/node_modules/parse-server/lib/ParseServer.js:265
                throw err;
                ^

      TypeError: Cannot read properties of undefined (reading 'objectId')
          at /src/node_modules/parse-server/lib/Adapters/Storage/Postgres/PostgresStorageAdapter.js:1220:46
          at Array.forEach (<anonymous>)
          at PostgresStorageAdapter.createObject (/src/node_modules/parse-server/lib/Adapters/Storage/Postgres/PostgresStorageAdapter.js:1173:25)
          at /src/node_modules/parse-server/lib/Controllers/DatabaseController.js:684:29
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
   */

  // Create another object, but this time the field is set to undefined explicitly
  const test4 = new Parse.Object("SomeObject");
  test4.set("pointerTo", undefined);
  await test4.save(null, { useMasterKey: true });
  // console.log("Saved test4");
  /**
      /src/node_modules/parse-server/lib/ParseServer.js:265
                throw err;
                ^

      TypeError: Cannot read properties of undefined (reading 'objectId')
          at /src/node_modules/parse-server/lib/Adapters/Storage/Postgres/PostgresStorageAdapter.js:1220:46
          at Array.forEach (<anonymous>)
          at PostgresStorageAdapter.createObject (/src/node_modules/parse-server/lib/Adapters/Storage/Postgres/PostgresStorageAdapter.js:1173:25)
          at /src/node_modules/parse-server/lib/Controllers/DatabaseController.js:684:29
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
  */
  console.log("Code complete");
}

// Start the server
main().then(() => {
  console.log('Server startup complete');
});