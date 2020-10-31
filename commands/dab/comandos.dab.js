//IMPORT CLIENT
const Discord = require("discord.js");

module.exports = {
  command: "comandos.dab",
  desciption: "Show anime dab gif or image",
  run: async (client, message, data) => {
    const embed = new Discord.MessageEmbed();
    embed.setColor("RANDOM");
    embed.setDescription(`**${message.author.username}** ha hecho un dab :0`);
    embed.setImage(data);
    return message.channel.send(embed);
  },
};
