//IMPORT CLIENT
const Discord = require("discord.js");

module.exports = {
  command: "comandos.avatar",
  desciption: "Show avatar from user or from mention user",
  run: (client, message, data) => {
    const usuario = message.mentions.members.first() || message.member;
    const embed = new Discord.MessageEmbed();
    embed.setColor("RANDOM");
    embed.setTitle(
        `Avatar de ${usuario.user.username}#${usuario.user.discriminator}`
      ).setURL(usuario.user.displayAvatarURL({ format: "png", size: 2048 }));

    embed.setImage(
      usuario.user.displayAvatarURL({ format: "png", size: 2048 })
    );
    message.channel.send(embed);
  },
};
