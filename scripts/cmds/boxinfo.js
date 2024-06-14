const fs = require("fs");
const request = require("request");

module.exports.config = {
  name: "boxinfo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JRT",
  description: "Xem thông tin box của bạn",
  commandCategory: "Group",
  usages: "boxinfo",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async function({ api, event, args }) {
  try {
    let threadInfo = await api.getThreadInfo(event.threadID);
    let memLength = threadInfo.participantIDs.length;
    let threadMem = threadInfo.participantIDs.length;
    let gendernam = [];
    let gendernu = [];
    let nope = [];

    for (let z in threadInfo.userInfo) {
      let gioitinhone = threadInfo.userInfo[z].gender;
      let nName = threadInfo.userInfo[z].name;
      if (gioitinhone == "MALE") {
        gendernam.push(nName);
      } else if (gioitinhone == "FEMALE") {
        gendernu.push(nName);
      } else {
        nope.push(nName);
      }
    }

    let nam = gendernam.length;
    let nu = gendernu.length;
    let qtv = threadInfo.adminIDs.length;
    let sl = threadInfo.messageCount;
    let icon = threadInfo.emoji;
    let threadName = threadInfo.threadName;
    let id = threadInfo.threadID;
    let sex = threadInfo.approvalMode;
    let pd = sex === false ? 'off' : 'on';

    let callback = () =>
      api.sendMessage(
        {
          body: `Name: ${threadName}\nBox ID: ${id}\nApprove: ${pd}\nEmoji: ${icon}\nInfo: includes ${threadMem} members\nMembers: ${nam} male members\nMembers: ${nu} female members\nWith ${qtv} admin(s)\nTotal messages: ${sl}.`,
          attachment: fs.createReadStream(__dirname + '/cache/1.png')
        },
        event.threadID,
        () => fs.unlinkSync(__dirname + '/cache/1.png'),
        event.messageID
      );

    return request(encodeURI(`${threadInfo.imageSrc}`))
      .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
      .on('close', () => callback());
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while retrieving the box information.", event.threadID);
  }
};
