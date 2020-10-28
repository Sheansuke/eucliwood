//ENVIROMENT
 require("dotenv").config();

const dialogflow = require("dialogflow");
const uuid = require("uuid");

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
module.exports = {
  chatBot: async function (message) {
    try {
      // UN IDENTIFICADOR UNICO PARA CADA SECCION
      const sessionId = uuid.v4();

      // CREA LA NUEVA SECCION
      const sessionClient = new dialogflow.SessionsClient();
      const sessionPath =  sessionClient.sessionPath(
        process.env.DIALOGFLOW_PROJECTID,
        sessionId
      );

      // ES EL QUERY ENVIADO A DIALOGFLOW
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // MENSAJE DEL USUARIO
            text: message,
            // IDIOMA EN EL QUE SE ENVIA
            languageCode: "es-ES",
          },
        },
      };

      // SE ENVIA EL QUERY Y SE REGISTRA EN CONSOLA LA REPUESTA DE DIALOGFLOW
      const responses = await sessionClient.detectIntent(request);

      console.log("Detected intent...");
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
    } catch (error) {
      console.log(error);
    }
  },
};
