//IMPORT CLIENT
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  command: "comandos.kiss",
  desciption: "Show anime kiss gif or image",
  run: async (client, message, data) => {
    const usuario = message.mentions.members.first();
    const embed = new Discord.MessageEmbed();
    embed.setColor("RANDOM");
    embed.setDescription(
      `**${message.author.username}** ha besado a **${usuario.user.username}**`
    );
    embed.setImage(data);
    return message.channel.send(embed);
  },
};
