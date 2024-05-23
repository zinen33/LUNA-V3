module.exports = {
  config: {
    name: "مساعدة",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "DRIDI-RAYEN",
    description: "اوامر البوت",
    usages: "الاوامر",
    commandCategory: "〘 الخدمات 〙",
    cooldowns: 5,
  },
  run: async ({ api, event }) => {
    try {
      const fs = require("fs-extra");
      api.sendMessage(
        {
          body: mainMenu,
          attachment: fs.createReadStream(__dirname + "/tmp/img.jpg"),
        },
        event.threadID,
        (err, info) => {
          setTimeout(() => {
            api.editMessage(info.messageID, altMenu);
            global.client.handleReply.push({
              name: "مساعدة",
              messageID: info.messageID,
              type: "toggleMenu",
            });
          }, 15000);
        },
        event.messageID,
      );
    } catch (error) {
      console.log(error);
    }
  },
  handleReply: async ({ api, event, handleReply }) => {
    const { type, messageID } = handleReply;
    const body = event.body.trim().toLowerCase();
    if (type === "toggleMenu") {
      if (body === "رجوع") {
        api.editMessage(messageID, mainMenu);
        setTimeout(() => {
          api.editMessage(messageID, altMenu);
        }, 10000);
      }
    }
  },
};

const mainMenu = `❖━━━━━━━❖
      📜 قائمة الأوامر
❖━━━━━━━❖

🎮 **قسم الألعاب** 🎮
1. *عواصم* — لعبة عواصم الدول
2. *اعلام* — لعبة اعلام الدول
3. *حزورة* — لعبة الثقافة العامة
4. *المكتبة* — مكتبة الانميات و افلام الانمي
5. *تفكيك* — لعبة تفكيك كلمات
6. *معاني* — لعبة معاني كلمات
7. *عكس* — لعبة عكس الكلمات
8. *الاسرع* — لعبة ايموجي
9. *شخصيات* — لعبة احزر الشخصية
10. *تحدي* — تتحدى شخص بمنشن
11. *زواج* — تزوجك احد اعضاء الشات
12. *دمج* — تدمج اثنين ايموجي في صورة
13. *عمري* — تحسب عمرك

📜 **قسم الخدمات** 📜
1. *ايدي* — ايدي تعريفي لحسابك
2. *توب* — اغنى 10 اعضاء في البوت
3. *دخول* — مجموعة لونا (الدعم)
4. *طرد* — تطرد الأعضاء
5. *شغلي* — تشغل موسيقى
6. *سكرين* — تعطيك سكرين من داخل اي رابط ترسله
7. *زخرفة* — زخرفة اسمك
8. *معرف* — تعطيك معرف حسابك
9. *مجموعتي* — معلومات الشات

❖━━━━━━━━━━━━❖
❖←›[صفحة 1/2] (يرجى الرد للعودة للخلف)
`;

const altMenu = `❖━━━━━━━❖
      📜 قائمة الأوامر
❖━━━━━━━❖

🤖 **قسم الذكاء الاصطناعي** 🤖
1. *لونا* — ذكاء اصطناعي لسؤال GPT 3.5
2. *تخيل* — ترسم تخيلك بالذكاء الاصطناعي
3. *emi AI* — ترسم تخيلك بالإنجليزية
4. *sim* — تحدث مع بوت (سيم)

✨ **قسم التفاعلات** ✨
1. *حضن* — تحضن شخص بمنشن
2. *شنق* — تشنق شخص بمنشن
3. *زواج* — تتزوج شخص بمنشن
4. *بوسة* — تبوس شخص بمنشن
5. *حضن2* — تحضن شخص بمنشن
6. *مرحاض* — تسوي شخص مرحاض بمنشن

❖━━━━━━━━━━━━❖
❖←›[صفحة 2/2] (يرجى الرد للعودة للخلف)
⌔|↜{ المـــطــور } ← m.me/100044725279836
⌔|↜{ المـــطــور } ← m.me/100013384479798
`;
