module.exports = {
  idiomaAbreviations: (idioma) => {
    switch (idioma) {
      case "español":
        return "es";

      case "english":
        return "en";

      case "chino":
        return "zh";

      case "frances":
        return "fr";

      default:
        return "es";
    }
  },
};
