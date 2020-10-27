//ENVIROMENT
const config = require("dotenv").config();
//EXPRESS SERVER
require("http").createServer().listen(3000);
//FS
const fs = require("fs");
//PREFIX
const prefix = require("./config.json").prefix;
//IMPORT CLIENT
const Discord = require("discord.js");
const client = new Discord.Client();
//STORES COMMANDS DATA
client.commands = new Discord.Collection();
//EXTRAS FUNCTIONS
const botFunctions = require("./functions/botFunctions");
//DIALOGFLOW
const chatbot = require("./dialogFlow").chatBot;

botFunctions.extractDirFiles.forEach((command) => {
  const cmd = require(command);
  client.commands.set(cmd.command, cmd);
});

//NOTICE IN CONSOLE WHEN BOT IS READY
client.on("ready", (msg) => {
  console.log(`${client.user.tag} is ready!`);
});

client.on("message", (msg) => {
  const startPrefix = msg.content.startsWith(prefix);
  const channelEucliwood = msg.channel.name == "eucliwood";
  if (msg.author.bot) return;

  //PREFIX
  if (startPrefix || channelEucliwood) {
    const args = startPrefix
      ? msg.content.slice(prefix.length).trim()
      : msg.content;
    chatbot(args).then((data) => {
      try {
        // const userMessage = data.query;
        const response = data.response;
        const intent = data.intent;

        const cmd = client.commands.get(intent);

        return cmd
          ? cmd.run(client, msg, response)
          : msg.channel.send(response);
      } catch (error) {
        console.log(error);
      }
    });
  }
});

// if (cmd) {
// //   //EXECUTE NORMAL COMMANDS
// //   return cmd.run(client, msg, args);
// // }

client.login(process.env.DISCORD_TOKEN);
