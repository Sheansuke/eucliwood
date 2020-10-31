//IMPORT CLIENT
const Discord = require("discord.js");

module.exports = {
  command: "comandos.pat",
  desciption: "Le da un pat al usuario mensionado",
  run: async (client, message, data) => {
    const usuario = message.mentions.members.first();
    const embed = new Discord.MessageEmbed();
    embed.setColor("RANDOM");
    embed.setDescription(
      `**${message.author.username}** acarició a **${usuario.user.username}** uwu`
    );
    embed.setImage(data);
    return message.channel.send(embed);
  },
};
