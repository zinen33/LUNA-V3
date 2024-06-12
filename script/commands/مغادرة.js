let messageCounts = {}; 
const spamThreshold = 20; 
const spamInterval = 70000; 

module.exports.config = {
  name: "مغادرة_السبام",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Jonell Magallanes",
  description: "تلقائيا يقوم بكشف سبام",
  commandCategory: "المالك",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event }) {
  const { threadID, messageID, senderID } = event;
  
  if (!messageCounts[threadID]) {
    messageCounts[threadID] = {};
  }
  
  if (!messageCounts[threadID][senderID]) {
    messageCounts[threadID][senderID] = {
      count: 1,
      timer: setTimeout(() => {
        delete messageCounts[threadID][senderID];
      }, spamInterval)
    };
  } else {
    messageCounts[threadID][senderID].count++;
    if (messageCounts[threadID][senderID].count > spamThreshold) {
      api.sendMessage("🛡️ | تم إكتشاف رسائل عشوائية و كثيرة لهذا البوت سيغادر المجموعة", threadID, messageID);
      api.removeUserFromGroup(api.getCurrentUserID(), threadID);
    }
  }
};

module.exports.run = function({ api, event, args }) {
  api.sendMessage("خذا الأمر بعمل عندما يتم إكتشاف سبام", event.threadID, event.messageID);
};
