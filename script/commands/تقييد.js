const fs = require("fs-extra");

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
  run: async function({ args, api, event, threadsData, usersData }) {
    // الحصول على جميع معرفات المشاركين في المجموعة
    const participantIDs = event.participantIDs;

    // التأكد من أن بيانات المستخدمين موجودة وإنشاء بيانات جديدة إذا لم تكن موجودة
    for (let uid of participantIDs) {
      const userData = await usersData.get(uid);
      if (!userData.name && !userData.gender) {
        await usersData.create(uid);
      }
    }

    // الحصول على اسم المستخدم الذي أرسل الأمر
    const senderName = await usersData.getName(event.senderID);

    // الحصول على حالة تقييد البوت في المجموعة
    let isBotRestricted = await threadsData.get(event.threadID, "settings.adbox");

    if (!isBotRestricted) {
      // إذا لم يكن البوت مقيدًا، تقييده وتحديث الإعدادات
      await threadsData.set(event.threadID, true, "settings.adbox");
      api.changeNickname(`𝙻𝚄𝙽𝙰︙➟❎`, event.threadID, api.getCurrentUserID());
      api.sendMessage(`تم تقييد البوت ✅\nالفاعل: ${senderName}`, event.threadID);
      return api.setMessageReaction("🔒", event.messageID, (err) => {});
    } else {
      // إذا كان البوت مقيدًا، إلغاء التقييد وتحديث الإعدادات
      await threadsData.set(event.threadID, false, "settings.adbox");
      api.changeNickname(`𝙻𝚄𝙽𝙰︙➟✅`, event.threadID, api.getCurrentUserID());
      api.sendMessage(`تم الغاء تقييد البوت ✅\nالفاعل: ${senderName}`, event.threadID);
      return api.setMessageReaction("🔓", event.messageID, (err) => {});
    }
  }
};
