module.exports = {
  command: "hola",
  desciption: "Command to test",
  run: (client, message, args) => {
    message.channel.send(`Hola ${message.author.username}`);
  },
};
