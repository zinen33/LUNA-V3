module.exports = {
  Preset: {
    name: "تقييد",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "حضر",
    description: "منع",
    commandCategory: "المطور",
    usages: "send message",
    cooldowns: 5,
  },
  Start: async function({ args, api, Message, event, threadsData, usersData }) {
    const participantIDs = event.participantIDs;
    for (let uid of participantIDs) {
      const userData = await usersData.get(uid);
      if (!userData.name && !userData.gender) {
        await usersData.create(uid);
      }
    }

    let name = await usersData.getName(event.senderID);
    let box = await threadsData.get(event.threadID, "settings.adbox");

    if (!box) {
      await threadsData.set(event.threadID, true, "settings.adbox");
      return Message.reply(`تم تقييد البوت ✅\nالفاعل: ${name}`);
    } else {
      await threadsData.set(event.threadID, false, "settings.adbox");
      return Message.reply(`تم الغاء تقييد البوت ✅\nالفاعل: ${name}`);
    }
  }
}
