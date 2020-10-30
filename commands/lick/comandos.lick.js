//IMPORT CLIENT
const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
  command: "comandos.lick",
  desciption: "Show anime lick gif or image",
  run: async (client, message, data) => {
    const usuario = message.mentions.members.first();
    const embed = new Discord.MessageEmbed();
    embed.setColor("RANDOM");
    embed.setDescription(
      `**${message.author.username}** lamio a **${usuario.user.username}**  o///o `
    );
    embed.setImage(data);
    return message.channel.send(embed);
  },
};
