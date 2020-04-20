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

botFunctions.extractDirFiles.forEach((command) => {
  const cmd = require(command);
  client.commands.set(cmd.command, cmd);
});

//NOTICE IN CONSOLE WHEN BOT IS READY
client.on("ready", (msg) => {
  console.log(`${client.user.tag} is ready!`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  //WHEN  THE MESSAGE IS WRITE IN CAPITAL CASE
  if (/[A0-Z0\\.\\-]+$/g.test(msg.content)) {
    const scream = require("./commands/scream/scream.js").run(
      client,
      msg,
      args
    );

    return;
  }

  //WHEN THE MESSAGE IS A QUESTIONS, EXECUTE QUESTION MODULE
  if (msg.content.endsWith("?")) {
    const question = require("./commands/questions/question.js").run(
      client,
      msg,
      { command }
    );
    return;
  }

  if (cmd) {
    //EXECUTE NORMAL COMMANDS
    return cmd.run(client, msg, args);
  }
});

client.login(process.env.TOKEN);
