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
    
    // التحقق من وجود المستخدمين وإنشاء ملفاتهم إذا لم تكن موجودة
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
      Message.react("🔒");
      api.changeNickname(`𝙻𝚄𝙽𝙰︙➟❎`, event.threadID, api.getCurrentUserID());
      return Message.reply(`تم تقييد البوت ✅\nالفاعل: ${name}`);
    } else {
      await threadsData.set(event.threadID, false, "settings.adbox");
      Message.react("🔓");
      api.changeNickname(`𝙻𝚄𝙽𝙰︙➟✅`, event.threadID, api.getCurrentUserID());
      return Message.reply(`تم الغاء تقييد البوت ✅\nالفاعل: ${name}`);
    }
  }
  }
  
