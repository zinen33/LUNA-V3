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
      const imageUrl = "https://i.postimg.cc/nrcGgQ9p/Picsart-24-05-31-07-43-25-119.jpg";
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

const menux = ` ❍━━❪•الأوامــــر الرئيســية•❫━━❍

 🎮 قسم الألعاب:
  𝟭︙عواصم —> لعبة عواصم الدول 
  𝟮︙اعلام —> لعبة اعلام الدول  
  𝟯︙حزورة —> لعبة الثقافة العامة  
  𝟰︙كت —> تسألك
  𝟱︙تفكيك —> لعبة تفكيك كلمات
  𝟲︙معاني —> لعبة معاني كلمات
  𝟳︙عكس —> لعبة عكس الكلمات
  𝟴︙الاسرع —> لعبة ايموجي 
  𝟵︙شخصيات —> لعبة احزر الشخصية
  𝟭𝟬︙تحدي —> تتحدى شخص بمنشن
  𝟭𝟭︙زواج —> تزوجك احد اعضاء الشات
  𝟭𝟮︙اصفعي —> تصفع شخص بالطاغ
  𝟭𝟯︙زواج —> تزوجك لما تسوي طاغ لشخص

📜 قسم الخدمات:
   𝟭︙ايدي —> ايدي تعريفي لحسابك . 
   𝟮︙توب —> اغنى 10 اعضاء في بوت  .
   𝟯︙دخول —> مجموعة لونا (الدعم) .
   𝟰︙طرد —> تطرد الأعضاء .
   𝟱︙بانكاي —> تشغل موسيقى .
   𝟲︙اقتباسات —> إقتباس .
   𝟳︙رفع —> تجعل صورة رابط .
   𝟴︙معرف —> تعطيك معرف حسابك .
   𝟵︙مجموعتي —> معلومات الشات .
  🤖 قسم الذكاء الاصطناعي:
  𝟭︙ لونا —> ذكاء اصطناعي لسؤال 𝗚𝗣𝗧 𝟯.𝟱 .
  𝟮︙ تخيل —> ترسم تخيلك  𝗔𝗜   . 
  𝟯︙ تحدث مع بوت <— sim/سيم  .
⌔|↜{ المـــطــور } ← m.me/100044725279836
⌔|↜{ المـــطــور } ← m.me/100013384479798
`;

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
  
