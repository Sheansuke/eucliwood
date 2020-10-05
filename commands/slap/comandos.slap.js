
//IMPORT CLIENT
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  command: "comandos.slap",
  desciption: "Show anime slap gif or image",
  run:  (client, message, data) => {
    const usuario = message.mentions.members.first();
    const embed = new Discord.MessageEmbed();
    embed.setColor("RANDOM");
    embed.setDescription(
      `**${message.author.username}** le ha pegado a **${usuario.user.username}** D:`
    );
   embed.setImage(data);
    return message.channel.send(embed);
  },
};
