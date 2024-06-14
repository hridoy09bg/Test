const axios = require('axios');

module.exports = {
  config: {
    name: "anime",
    aliases: ["anime"],
    version: "1.0",
    author: "Hridoy",
    countDown: 5,
    role: 0,
    shortDescription: "get anime data",
    longDescription: "search and get anime infos",
    category: "anime",
    guide: "{pn} <name>"
  },

  onStart: async function ({ message, args }) {
    const name = args.join(" ");
    if (!name) {
      return message.reply(`⚠️ | Please enter anime name!`);
    } else {
      const BASE_URL = `https://api.elianabot.xyz/anime/info.php?api=60692715c1ddc848f83b0989534e9a03&name=${encodeURIComponent(name)}`;
      try {
        let res = await axios.get(BASE_URL);
        let anime = res.data;

        if (!anime.mal_id) {
          return message.reply(`🥺 Not Found`);
        }

        let titl = anime.title || "N/A";
        let img = anime.image_url || "";
        let id = anime.mal_id || "N/A";
        let type = anime.type || "N/A";
        let chapters = anime.chapters || "N/A";
        let volumes = anime.volumes || "N/A";
        let status = anime.status || "N/A";
        let score = anime.score || "N/A";
        let ranked = anime.rank || "N/A";
        let popularity = anime.popularity || "N/A";
        let members = anime.members || "N/A";
        let favorites = anime.favorites || "N/A";
        let synopsis = anime.synopsis || "N/A";

        const form = {
          body: `===「 Anime Info 」===`
            + `\n\n🔰 Name: ${titl}`
            + `\n🆔 ID: ${id}`
            + `\n📖 Type: ${type}`
            + `\n📚 Chapters: ${chapters}`
            + `\n📕 Volumes: ${volumes}`
            + `\n📈 Status: ${status}`
            + `\n⭐ Score: ${score}`
            + `\n🏅 Ranked: ${ranked}`
            + `\n🔥 Popularity: ${popularity}`
            + `\n👥 Members: ${members}`
            + `\n❤️ Favorites: ${favorites}`
            + `\n📖 Synopsis: ${synopsis}`
            + `\n\n🔗 *Data provided by Eliana Bot API*`
        };

        if (img) {
          form.attachment = await global.utils.getStreamFromURL(img);
        }

        message.reply(form);
      } catch (e) {
        message.reply(`🥺 Not Found`);
      }
    }
  }
};
