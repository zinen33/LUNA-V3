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
  handleEvent: async function({ args, api, event, Threads, Users }) {
    try {
      const participants = event.participantIDs;
      for (let uid of participants) {
        let user = await Users.get(uid);
        if (!user) {
          await Users.create(uid);
        }
      }

      let name = await Users.getName(event.senderID);
      if (!name) {
        name = "Unknown User";
      }

      let box = await Threads.get(event.threadID, "settings.adbox");
      if (!box) {
        await Threads.set(event.threadID, true, "settings.adbox");
        api.sendMessage("🔒", event.threadID);
        api.changeNickname(`𝙻𝚄𝙽𝙰︙➟❎`, event.threadID, api.getCurrentUserID());
        return api.sendMessage(`تم تقييد البوت ✅\nالفاعل: ${name}`, event.threadID);
      } else {
        await Threads.set(event.threadID, false, "settings.adbox");
        api.sendMessage("🔓", event.threadID);
        api.changeNickname(`𝙻𝚄𝙽𝙰︙➟✅`, event.threadID, api.getCurrentUserID());
        return api.sendMessage(`تم الغاء تقييد البوت ✅\nالفاعل: ${name}`, event.threadID);
      }
    } catch (error) {
      console.error("Error handling event:", error);
      api.sendMessage("حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.", event.threadID);
    }
  }
};
      
