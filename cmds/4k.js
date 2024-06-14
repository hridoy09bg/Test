module.exports.config = {
  name: "4k",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NLam182",//lụm đc code ban đầu ko có cre nên chịu
  description: "",
  commandCategory: "tiện ích",
  usages: "[reply]",
  cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
  const fs = global.nodemodule["fs-extra"];
  const axios = require('axios').default;
  const isLink = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(args[0]);
  var linkUp = event.messageReply.attachments[0].url || (isLink ? args[0] : '');
  if (!linkUp) return api.sendMessage('『 𝐍𝐠𝐨̣𝐜 𝐇𝐢𝐞̂́𝐮 ✅ 』\n━━━━━━━━━━━━━━\n𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐫𝐞𝐩𝐥𝐲 𝟏 𝐚̉𝐧𝐡 𝐡𝐨𝐚̣̆𝐜 𝐧𝐡𝐚̣̂𝐩 𝐥𝐢𝐧𝐤 𝐚̉𝐧𝐡!', event.threadID, event.messageID);
  try {
    if (isLink) {
      const response = await axios.get(linkUp, { responseType: "arraybuffer" });
      api.sendMessage("『 𝐍𝐠𝐨̣𝐜 𝐇𝐢𝐞̂́𝐮 ✅ 』\n━━━━━━━━━━━━━━\nĐ𝐚𝐧𝐠 𝐥𝐨𝐚𝐝, 𝐜𝐡𝐨̛̀ 𝐭𝐢́ 𝐧𝐡𝐞́....!", event.threadID);
      fs.writeFileSync(__dirname + `/cache/netanh.png`, Buffer.from(response.data, "binary"));
    } else {
      const res = await axios.get(`https://apibot.dungkon.me/imgur?link=${encodeURIComponent(linkUp)}`);
      const link = res.data.uploaded.image;
      const response = await axios.get(`https://apibot.dungkon.me/lamnet?link=${link}`, { responseType: "arraybuffer" });
      api.sendMessage("『 𝐍𝐠𝐨̣𝐜 𝐇𝐢𝐞̂́𝐮 ✅ 』\n━━━━━━━━━━━━━━\n𝗟𝗼𝗮𝗱𝗶𝗻𝗴,𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁 𝗮 𝗺𝗼𝗺𝗲𝗻𝘁....!", event.threadID);
      fs.writeFileSync(__dirname + `/cache/netanh.png`, Buffer.from(response.data, "binary"));
    }
    return api.sendMessage({
      body: `🧸𝗧𝗵𝗶𝘀 𝗶𝘀 𝘆𝗼𝘂𝗿 𝗶𝗺𝗮𝗴𝗲!`,
      attachment: fs.createReadStream(__dirname + `/cache/netanh.png`)
    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/netanh.png`), event.messageID);
  } catch (e) {
    return api.sendMessage(e, event.threadID, event.messageID);
  }
};
