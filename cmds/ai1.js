const axios = require('axios');

module.exports = {
  config: {
    name: "ai1",
    aliases: ["ai1"],
    version: "1.0",
    author: "Hridoy",
    countDown: 5,
    role: 0,
    shortDescription: "get AI response",
    longDescription: "send user input to AI API and get response",
    category: "fun",
    guide: "{pn} <user text>"
  },

  onStart: async function ({ message, args }) {
    const userText = args.join(" ");
    if (!userText) {
      return message.reply(`⚠️ | Please enter text for AI!`);
    } else {
      const BASE_URL = `https://api.elianabot.xyz/fun/gemini.php?ai=${encodeURIComponent(userText)}`;
      try {
        let res = await axios.get(BASE_URL);
        let aiResponse = res.data;

        if (!aiResponse.answer) {
          return message.reply(`🥺 Not Found`);
        }

        message.reply(aiResponse.answer);
      } catch (e) {
        message.reply(`🥺 Not Found`);
      }
    }
  }
};
