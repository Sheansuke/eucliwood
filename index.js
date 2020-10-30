//ENVIROMENT
require("dotenv").config();

//EXPRESS SERVER
require("http").createServer().listen(3000);

//PREFIX
const prefix = require("./config.json").prefix;

//IMPORT CLIENT
const Discord = require("discord.js");
const client = new Discord.Client();

// CREA UNA COLECCION DE COMANDOS
client.commands = new Discord.Collection();

// FUNCIONES DE UTILIDAD
const botFunctions = require("./functions/botFunctions");

//DIALOGFLOW
const chatbot = require("./dialogFlow").chatBot;

// EXTRAE EL NOMBRE DE CADA COMANDO Y SU ARCHIVO DE LA CARPETA COMMANDS  Y LO AÑADE A LA COLECCION
botFunctions.extractDirFiles.forEach((command) => {
  const cmd = require(command);
  client.commands.set(cmd.command, cmd);
});

// NOTIFICA CUANDO EL BOT ENCIENDE
client.on("ready", () => {
  console.log(`${client.user.tag} is ready!`);

  // MUESTRA AL BOT HACIENDO LA ACTIVIDAD ELEGIDA
  client.user
  .setActivity("Genshin Impact", { type: "PLAYING" })
  .then((presence) =>
    console.log(`Activity set to: ${presence.activities[0].name}`)
  )
  .catch(console.error);
});



// OPTIENE Y PROCESA LAS ENTRADAS DE LOS USUARIOS
client.on("message", (msg) => {
  console.log(msg);
  // PREFIJO BAJO EL QUE DEBE INICIAR CADA FRASE DICHA AL BOT
  const startPrefix = msg.content.startsWith(prefix);

  // SI QUIERE PERMITIR QUE EL BOT HABLE SIN USAR EL PREFIJO EN UN CANAL AÑADALO AQUI
  const channelEucliwood = /eucliwood/gi.test(msg.channel.name);

  if (msg.author.bot) return;

  //PREFIX
  if (startPrefix || channelEucliwood) {
    const args = startPrefix
      ? msg.content.slice(prefix.length).trim()
      : msg.content;

    chatbot(args).then((data) => {
      try {
        // const userMessage = data.query;

        // RESPUESTA DEL BOT DESDE DIALOGFLOW
        const response = data.response;

        // INTENCION INTERPRETADA POR DIALOGFLOW
        const intent = data.intent;

        // SE PASA LA INTENCION OPTENIDA PARA SER BUSCADA EN LA LISTA DE COMANDOS Y ACTUAR POR EJEMPLO "comandos.avatar"
        // debe tener en cuenta que la intencion  y la propiedad command de cada comando deben ser iguales para poder encontrarlo
        const cmd = client.commands.get(intent);

        // EVALUA SI SE OPTUVO UN COMANDO PARA EJECUTARLO DE LO CONTRARIO, DARA UNA REPUESTA DE DIALOGFLOW
        // Esto permite que pueda match intenciones que no sean comandos y responder conforme a ellas
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
