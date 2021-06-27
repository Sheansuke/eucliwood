//IMPORT CLIENT
const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  command: "comandos.toquedequeda",
  desciption: "Show toque de queda hours",
  run: async (client, message, data) => {
    const embed = new Discord.MessageEmbed();

    // FETCH
    const horario = await fetch("https://api.seisigma.co/api/decrees/last", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (data) => await data.json());

    embed.setColor("RANDOM");
    embed.setTitle("Horario del toque de queda actual");
    embed.setDescription(
      `
    Lunes a viernes de ${horario.weekdays_12_hours.start} a ${horario.weekdays_12_hours.end}
    libre transito: ${horario.weekdays_12_hours.traffic_hours} horas

    Fin de semana de ${horario.weekends_12_hours.start} a ${horario.weekends_12_hours.end}
    libre transito: ${horario.weekends_12_hours.traffic_hours} horas
    `
    );
    embed.setImage(data);
    return message.channel.send(embed);
  },
};
