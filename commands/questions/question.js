//IMPORT CLIENT
const responsesQuestions = require("./responses.json").responsesToQuestions;

module.exports = {
  command: "",
  desciption: "The bot response all question end with '?' ",
  run: (client, message, args) => {
    if (args.command || args.command.endsWith("?"))
      return message.channel.send(
        "Prueba escribir el comando sin signo de interrogacion D:"
      );
    const random =
      Math.floor(Math.random() * (responsesQuestions.length - 1 - 0 + 1)) + 0;
    message.channel.send(`${responsesQuestions[random]}`);
  },
};
