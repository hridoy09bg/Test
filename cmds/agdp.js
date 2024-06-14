const axios = require('axios');

module.exports = {
  config: {
    name: "agdp",
    aliases: ["gfxs"],
    version: "1.0",
    author: "Samir",
    countDown: 0,
    role: 0,
    shortDescription: "Make A gfx logo",
    longDescription: "Make A gfx logo",
    category: "gfx",
    guide: {
      en: "{p}{n} name",
    }
  },

  onStart: async function ({ api, event }) {
    try {
      // Fetch data from the API endpoint
      const response = await axios.get('https://api.elianabot.xyz/api/animepfp.php?api=d3ee2bd5411a44308577ed90abe0fa30');

      // Check if the response status is successful
      if (response.status !== 200) {
        throw new Error('Failed to fetch data from API.');
      }

      // Check if the response contains valid data
      const { data } = response;
      if (!data || !data.image_url) {
        throw new Error('Invalid data received from API.');
      }

      // Fetch the image as a readable stream
      const imageUrl = data.image_url;
      const imageStream = await global.utils.getStreamFromURL(imageUrl);

      // Prepare the message with the image attachment
      const message = {
        body: "Here is your ACDP by ElianaBot Api:",
        attachment: [imageStream]
      };

      // Send the message with the image attachment
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error fetching data from API:', error.message);
      api.sendMessage('Failed to fetch data from API. Please try again later.', event.threadID, event.messageID);
    }
  }
};
