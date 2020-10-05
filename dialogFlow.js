//ENVIROMENT
const config = require("dotenv").config();

const dialogflow = require("dialogflow");
const uuid = require("uuid");

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
module.exports = {
  chatBot: async function (message) {
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(
      process.env.DIALOGFLOW_PROJECTID,
      sessionId
    );

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: message,
          // The language used by the client (en-US)
          languageCode: "es-ES",
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
    return {
      query: result.queryText,
      response: result.fulfillmentText,
      intent: result.intent.displayName,
    };
  },
};
