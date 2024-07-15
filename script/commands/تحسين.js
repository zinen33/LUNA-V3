const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "تحسين",
  version: "9.9.9",
  hasPermission: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "تحسين الصور",
  commandCategory: "صور",
  usages: "..",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event }) {
  
  const pathie = __dirname + `/cache/ayoub.jpg`;
  const { threadID, messageID } = event;

  const photoUrl = event.messageReply.attachments[0] ? event.messageReply.attachments[0].url : args.join(" ");

  if (!photoUrl) {
    api.sendMessage("رد عـلـى الـصـورة لـتـحـسـيـنـها 🤡", threadID, messageID);
    return;
  }

  api.sendMessage("جـاري تـحـسـيـن الـصـورة ⏳🤝🏻", threadID, async () => {
    try {
      const response = await axios.get(`https://fourk-ayb.onrender.com/upscale?url=${encodeURIComponent(photoUrl)}`);
      const processedImageURL = response.data.image_data;
      const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

      fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

      api.sendMessage({
        body: "تـم تـحـسـيـن جـودة الـصـورة ✅",
        attachment: fs.createReadStream(pathie)
      }, threadID, () => fs.unlinkSync(pathie), messageID);
    } catch (error) {
      api.sendMessage(`❌ خطأ في تحسين الصورة: ${error}`, threadID, messageID);
    }
  }); 
  }
    
