//IMPORT CLIENT
const Discord = require("discord.js");

module.exports = {
  command: "comandos.hug",
  desciption: "Show anime hug gif or image",
  run: (client, message, data) => {
    const usuario = message.mentions.members.first();
    const embed = new Discord.MessageEmbed();
    embed.setColor("RANDOM");
    embed.setDescription(
      `**${message.author.username}** ha abrazado a **${usuario.user.username}** uwu`
    );
    embed.setImage(data);
    return message.channel.send(embed);
  },
};
