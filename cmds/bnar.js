module.exports = {
  config: {
    name: "bnar",
    aliases: ["clown"],
    version: "1.0",
    author: "otineeeyyyy",
    shortDescription: "Make clown images with custom text",
    longDescription: "Make clown images with custom text",
    category: "fun",
    guide: "{pn} your_text_here"
  },

  async onStart({ api, event }) {
    try {
      const text = event.body.trim().slice(5).trim(); // Extract text after the command

      if (!text) {
        throw new Error("Please provide text for the banner.");
      }

      const gifURL = `https://news.orgasom.shop/api/banner.php?text=${encodeURIComponent(text)}`;

      const message = {
        body: "Here Is Your Banner",
        attachment: [await global.utils.getStreamFromURL(gifURL)]
      };

      api.sendMessage(message, event.threadID, event.messageID);
    } catch (err) {
      console.error(err);
      api.sendMessage(err.message, event.threadID, event.messageID);
    }
  }
};
