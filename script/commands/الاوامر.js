module.exports = {
  config: {
    name: "الاوامر",
    version: "1.0.0",
    hasPermssion: 0,
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
          body: menux,
          attachment: fs.createReadStream(__dirname + "/tmp/img.jpg"),
        },
        event.threadID,
        (err, info) => {
          setTimeout(() => {
            api.editMessage(info.messageID, change);
            global.client.handleReply.push({
              name: "الاوامر",
              messageID: info.messageID,
              type: "changeMenuChange",
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
    if (type === "changeMenuChange") {
      if (body === "رجوع") {
        api.editMessage(messageID, menux);
        setTimeout(() => {
          api.editMessage(messageID, change);
        }, 10000);
      }
    }
  },
};

const menux = ` ❍━━❪•الأوامــــر الرئيســية•❫━━❍

 🎮 قسم الألعاب:
  𝟭︙عواصم —> لعبة عواصم الدول 
  𝟮︙اعلام —> لعبة اعلام الدول  
  𝟯︙حزورة —> لعبة الثقافة العامة  
  𝟰︙المكتبة —> مكتبة الانميات و افلام الانمي
  𝟱︙تفكيك —> لعبة تفكيك كلمات
  𝟲︙معاني —> لعبة معاني كلمات
  𝟳︙عكس —> لعبة عكس الكلمات
  𝟴︙الاسرع —> لعبة ايموجي 
  𝟵︙شخصيات —> لعبة احزر الشخصية
  𝟭𝟬︙تحدي —> تتحدى شخص بمنشن
  𝟭𝟭︙زواج —> تزوجك احد اعضاء الشات
  𝟭𝟮︙دمج —> تدمج اثنين ايموجي في صورة 
  𝟭𝟯︙عمري —> تحسب عمرك 

📜 قسم الخدمات:
   𝟭︙ايدي —> ايدي تعريفي لحسابك . 
   𝟮︙توب —> اغنى 10 اعضاء في بوت  .
   𝟯︙دخول —> مجموعة لونا (الدعم) .
   𝟰︙طرد —> تطرد الأعضاء .
   𝟱︙شغلي —> تشغل موسيقى .
   𝟲︙سكرين —> تعطيك سكرين من داخل اي رابط ترسله .
   𝟳︙زخرفة —> زخرفة اسمك .
   𝟴︙معرف —> تعطيك معرف حسابك .
   𝟵︙مجموعتي —> معلومات الشات .

❖←›[صفحة 1/2] (يرجى الرد للعودة للخلف)
`;

 const change = ` ❍━━❪•الأوامــــر الرئيســية•❫━━❍

  🤖 قسم الذكاء الاصطناعي:
  𝟭︙ لونا —> ذكاء اصطناعي لسؤال 𝗚𝗣𝗧 𝟯.𝟱 .
  𝟮︙ تخيل —> ترسم تخيلك  𝗔𝗜   . 
  𝟯︙ ترسم تخيلك بالإنجليزية <— emi 𝗔𝗜 .
  𝟰︙ تحدث مع بوت <— sim/سيم  .
 ✨قسم التفاعلات:
  𝟭︙حضن —> تحضن شخص بمنشن . 
  𝟮︙شنق —> تشنق شخص بمنشن .
  𝟯︙زواج —> تتزوج شخص بمنشن .
  𝟰︙بوسة —> تبوس شخص بمنشن .
  𝟱︙حضن2 —> تحضن شخص بمنشن.
  𝟲︙مرحاض—> تسوي شخص مرحاض بمنشن .

❖←›[صفحة 2/2] (يرجى الرد للعودة للخلف)
⌔|↜{ المـــطــور } ← m.me/100044725279836
⌔|↜{ المـــطــور } ← m.me/100013384479798
`;
