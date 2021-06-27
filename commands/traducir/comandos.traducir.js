//IMPORT CLIENT
const Discord = require("discord.js");
const idiomaAbreviations = require("./idiomaAbrevations.js").idiomaAbreviations;
const fetch = require("node-fetch");

module.exports = {
  command: "comandos.traducir",
  desciption: "Traduce texto al ingles",
  run: async (client, message, data, totalResponse) => {
    const embed = new Discord.MessageEmbed();

    // ES EL MENSAJE SIN PROCESAR DEL USUARIO
    const userMessage = totalResponse.queryText;

    // SE EXTRAEN LOS PARAMETROS EXTRA DE LA INTENCION DEL USUARIO
    const traducir = totalResponse.parameters.fields.traducir.stringValue;
    const preposicion = totalResponse.parameters.fields.preposicion.stringValue;
    const idioma = totalResponse.parameters.fields.idioma.stringValue;

    // OPERACION QUE EXTRAE LA FRASE QUE EL USUARIO DESEA TRADUCIR
    const regex = new RegExp(
      `\\b${traducir}|${preposicion} ${idioma}\\b`,
      "gi"
    );
    const messageToTranslate = userMessage.replace(regex, "");

    await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: messageToTranslate,
        source: "en",
        target: idiomaAbreviations(idioma),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const translate = await res.json();
        embed.setColor("RANDOM");
        embed.setTitle(`**Traduccion de:**  ${messageToTranslate}`);
        embed.setDescription(`${translate.translatedText}`);
        return message.channel.send(embed);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

// embed.setColor("RANDOM");
// embed.setTitle(`**Traduccion de:**  ${messageToTranslate}`);
// embed.setDescription(`${res.text}`);
// return message.channel.send(embed);
