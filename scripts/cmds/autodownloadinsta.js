const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {

  threadStates: {},

  config: {
    name: 'autoinsta',
    version: '1.0',
    author: 'Kshitiz',
    countDown: 5,
    role: 0,
    shortDescription: 'auto video downloader',
    longDescription: '',
    category: 'media',
    guide: {
      en: '{p}{n}',
    }
  },
  onStart: async function ({ api, event }) {
    const threadID = event.threadID;

    if (!this.threadStates[threadID]) {
      this.threadStates[threadID] = {
        autoInstaEnabled: false,
      };
    }

    if (event.body.toLowerCase().includes('autoinsta')) {
      if (event.body.toLowerCase().includes('on')) {
        this.threadStates[threadID].autoInstaEnabled = true;
        api.sendMessage("AutoInsta is now ON.", event.threadID, event.messageID);
      } else if (event.body.toLowerCase().includes('off')) {
        this.threadStates[threadID].autoInstaEnabled = false;
        api.sendMessage("AutoInsta is now OFF.", event.threadID, event.messageID);
      } else {
        api.sendMessage("type 'autoinsta on' to turn on and\n'autoinsta off' to turn off.", event.threadID, event.messageID);
      }
    }
  },
  onChat: async function ({ api, event }) {
    const threadID = event.threadID;

    if (this.threadStates[threadID] && this.threadStates[threadID].autoInstaEnabled && this.checkLink(event.body)) {
      const { url } = this.checkLink(event.body);
      this.downLoad(url, api, event);
      api.setMessageReaction("?", event.messageID, (err) => { if (err) console.error(err); }, true);
    }
  },
  downLoad: function (url, api, event) {
    const time = Date.now();
    const filePath = path.join(__dirname, `/cache/${time}.mp4`);
    this.getLink(url).then(res => {
      axios({
        method: "GET",
        url: res,
        responseType: "arraybuffer"
      }).then(res => {
        fs.writeFileSync(filePath, Buffer.from(res.data));
        if (fs.statSync(filePath).size / 1024 / 1024 > 25) {
          api.sendMessage("The file is too large, cannot be sent", event.threadID, () => fs.unlinkSync(filePath), event.messageID);
        } else {
          api.sendMessage({
            body: "Successful Download!",
            attachment: fs.createReadStream(filePath)
          }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
        }
      }).catch(err => {
        console.error(err);
        api.sendMessage("Failed to download the video.", event.threadID, event.messageID);
      });
    }).catch(err => {
      console.error(err);
      api.sendMessage("Failed to get the video link.", event.threadID, event.messageID);
    });
  },
  getLink: function (url) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `https://for-devs.rishadapis.repl.co/api/instadl?url=${url}&apikey=${process.env.INSTA_API_KEY}`
      }).then(res => resolve(res.data.video)).catch(err => reject(err));
    });
  },
  checkLink: function (text) {
    const regex = /(https?:\/\/(?:www\.)?instagram\.com\/[^\s]+)/g;
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      return {
        url: matches[0]
      };
    }
    return null;
  }
};
