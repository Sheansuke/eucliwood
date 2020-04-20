//FS
const fs = require("fs");

module.exports = {
  //MAPS ALL DIRECTORY IN THE ./commands/ AND EXTRACT ALL command.js FILES
  extractDirFiles: fs
    .readdirSync("./commands/")
    .filter((dir) => dir)
    .map((d) => {
      const file = fs
        .readdirSync(`./commands/${d}`)
        .filter((file) => file.endsWith(".js"));

      return `./commands/${d}/${file}`;
    }),
};
