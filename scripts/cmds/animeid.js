const axios = require('axios');

module.exports = {
  config: {
    name: "aid",
    aliases: ["episodes"],
    version: "1.0",
    author: "Hridoy",
    countDown: 5,
    role: 0,
    shortDescription: "get anime episodes data",
    longDescription: "search and get anime episodes info by anime ID",
    category: "anime",
    guide: "{pn} <anime_id>"
  },

  onStart: async function ({ message, args }) {
    const animeId = args.join(" ");
    if (!animeId) {
      return message.reply(`⚠️ | Please enter an anime ID!`);
    } else {
      const BASE_URL = `https://api.elianabot.xyz/anime/episodes.php?api=60692715c1ddc848f83b0989534e9a03&anime_id=${encodeURIComponent(animeId)}`;
      try {
        let res = await axios.get(BASE_URL);
        let episodes = res.data;

        if (!episodes || episodes.length === 0) {
          return message.reply(`🥺 No episodes found`);
        }

        let episodeInfo = episodes.map(ep => (
          `\n\n🔰 Title: ${ep.title || "N/A"}`
          + `\n🆔 Episode ID: ${ep.mal_id || "N/A"}`
          + `\n🗓️ Aired: ${ep.aired || "N/A"}`
          + `\n⭐ Score: ${ep.score || "N/A"}`
          + `\n📖 Japanese Title: ${ep.title_japanese || "N/A"}`
          + `\n📜 Romanji Title: ${ep.title_romanji || "N/A"}`
          + `\n🔗 [Episode URL](${ep.url || "#"})`
          + `\n🔗 [Forum URL](${ep.forum_url || "#"})`
        )).join("\n");

        const form = {
          body: `===「 Anime Episodes Info 」===\n${episodeInfo}`
          + `\n\n🔗 *Data provided by Eliana Bot API*`
        };

        message.reply(form);
      } catch (e) {
        message.reply(`🥺 No episodes found`);
      }
    }
  }
};
