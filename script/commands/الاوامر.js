module.exports = {
  config: {
    name: "الاوامر",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ZINO",
    description: "اوامر البوت",
    usages: "الاوامر",
    commandCategory: "〘 الخدمات 〙",
    cooldowns: 5,
  },
  run: async ({ api, event }) => {
    try {
      const imageUrl = "https://i.imgur.com/oobNszV.jpeg";
      api.sendMessage(
        {
          body: menux,
          attachment: await getStreamFromURL(imageUrl),
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

const menux = `❍━━━❪•قـائـمـة أوامـر لونـا•❫━━━❍
 🎮 قسم الألعاب:
  𝟭︙عواصم —> لعبة عواصم الدول .
  𝟮︙اعلام —> لعبة اعلام الدول .
  𝟯︙حزورة —> لعبة الثقافة العامة .
  𝟰︙كت —> تسألك .
  𝟱︙تفكيك —> لعبة تفكيك كلمات .
  𝟲︙معاني —> لعبة معاني كلمات .
  𝟳︙عكس —> لعبة عكس الكلماتة .
  𝟴︙الاسرع —> لعبة ايموجي .
  𝟵︙لوخيروك —> لعبة اسئلة .
  𝟭𝟬︙تحدي —> تتحدى شخص بمنشن .
  𝟭𝟭︙زواج —> تزوجك احد اعضاء الشات .
  𝟭𝟮︙اصفعي —> تصفع شخص بالطاغ .
  𝟭𝟯 ︙سلاحي —> لعبة و خلص اكتشف بنفسك .
━━━━━━━━━━━━━━━━━━━━━━━
📜 قسم الخدمات:
   𝟭︙ايدي —> ايدي تعريفي لحسابك . 
   𝟮︙عن —> تعطيك معلومات عن المستخدم .
   𝟯︙دخول —> مجموعة لونا (الدعم) .
   𝟰︙قولي —> تقول كلام الذي تكتبه .
   𝟱︙بانكاي —> طرد أعضاء .
   𝟲︙إقتباس —> اقتباسات انمي .
   𝟳︙المطور —> تعطيك معلومات المطور.
   𝟴︙معرف —> تعطيك معرف حسابك .
   𝟵︙مجموعتي —> معلومات الشات .
   𝟭𝟬︙رفع —> جعل صورة رابط .
   𝟭𝟭︙قص —> تزيل خلفية صورة .
   𝟭𝟮 : سكوت —> سيطرد بوت كل من يتحدث إلى مسؤول .
━━━━━━━━━━━━━━━━━━━━━━━
  🤖 قسم الذكاء الاصطناعي:
  𝟭︙لونا —> ذكاء اصطناعي لسؤال 𝗚𝗣𝗧 .
  𝟮︙ تحدث مع بوت <— سيم  .
⌔|↜{ المـــطــور } ← ZINO 
https://www.facebook.com/profile.php?id=100013384479798
⌔|↜{ المـــطــور } ← MOHAMED 
https://www.facebook.com/profile.php?id=100044725279836`;

// Helper function to get a readable stream from a URL
const getStreamFromURL = async (url) => {
  const axios = require('axios');
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  return response.data;
};
  
