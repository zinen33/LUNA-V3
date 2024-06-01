module.exports = {
  config: {
    name: "تقييد",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "حضر",
    description: "منع",
    commandCategory: "المطور",
    usages: "send message",
    cooldowns: 5,
  },
  handleEvent: async function({ args, api, event, threadsData, usersData }) {
    const participants = event.participantIDs;
    for (let uid of participants) {
      const user = await usersData.get(uid);
      if (!user.name && !user.gender) {
        await usersData.create(uid);
      }
    }

    let name = await usersData.getName(event.senderID);
    let box = await threadsData.get(event.threadID, "settings.adbox");
    
    if (!box) {
      await threadsData.set(event.threadID, true, "settings.adbox");
      api.sendMessage("🔒", event.threadID);
      api.changeNickname(`𝙻𝚄𝙽𝙰︙➟❎`, event.threadID, api.getCurrentUserID());
      return api.sendMessage(`تم تقييد البوت ✅\nالفاعل: ${name}`, event.threadID);
    } else {
      await threadsData.set(event.threadID, false, "settings.adbox");
      api.sendMessage("🔓", event.threadID);
      api.changeNickname(`𝙻𝚄𝙽𝙰︙➟✅`, event.threadID, api.getCurrentUserID());
      return api.sendMessage(`تم الغاء تقييد البوت ✅\nالفاعل: ${name}`, event.threadID);
    }
  }
};
