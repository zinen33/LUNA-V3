module.exports.config = {
  name: "زوجيني",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ZINO",
  description: "random love",
  commandCategory: "roleplay",
  usages: "send message",
  cooldowns: 0,
  dependencies: {}
};

module.exports.run = async function({ api, event, Users, Currencies }) {
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  var TOKEN = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
  
  var emoji = event.participantIDs;
  var id = emoji[Math.floor(Math.random() * emoji.length)];

  var namee = (await Users.getData(event.senderID)).name;
  var name = (await Users.getData(id)).name;

  var arraytag = [];
  arraytag.push({ id: event.senderID, tag: namee });
  arraytag.push({ id: id, tag: name });

  api.changeNickname(`زوجة ${name}`, event.threadID, event.senderID);
  api.changeNickname(`زوج ${namee}`, event.threadID, id);

  let Avatar = (
    await axios.get(
      `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${TOKEN}`,
      { responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(__dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8"));
  let Avatar2 = (
    await axios.get(
      `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=${TOKEN}`,
      { responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(__dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8"));
  var imglove = [];
  imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
  imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));

  var msg = {
    body: `لدينا محبوبان هنا\n${namee} 💓 ${name}`,
    mentions: arraytag,
    attachment: imglove,
  };
  api.sendMessage(msg, event.threadID, event.messageID);

  // React with ❌ if the command is used more than twice
  var data = await Currencies.getData(event.senderID);
  let userUsage = data.usage || 0;
  userUsage++;
  if (userUsage > 2) {
    api.setMessageReaction("❌", event.messageID, (err) => {}, true);
  }
  Currencies.setData(event.senderID, { usage: userUsage });

  // Remove the created files
  fs.unlinkSync(__dirname + "/cache/1.png");
  fs.unlinkSync(__dirname + "/cache/2.png");
};
  
