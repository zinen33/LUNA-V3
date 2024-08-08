const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const FormData = require('form-data');
const { image } = require('image-downloader');

module.exports.config = {
  name: 'قص',
  version: '1.1.1',
  hasPermssion: 0,
  credits: 'ǺᎩᎧᏬᏰ',
  description: 'قص خلفية صورتك',
  commandCategory: 'صور',
  usages: 'الرد على الصور أو صور URL',
  cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
  try {
    
    if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length == 0 || event.messageReply.attachments[0].type != "photo") {
      return api.sendMessage("يـرجـى الـرد عـلـى الـصـورة 🌝", event.threadID, event.messageID);
    }

    const content = event.messageReply.attachments[0].url;
    const inputPath = path.resolve(__dirname, 'cache', `photo.png`);

    await image({
      url: content,
      dest: inputPath
    });

    const formData = new FormData();
    formData.append('image', fs.createReadStream(inputPath));

    const response = await axios.post('https://bgayb1-cr28bji0.b4a.run/remove-background', formData, {
      headers: {
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer'
    });

    fs.writeFileSync(inputPath, response.data);

    return api.sendMessage({ 
      body: "تـم إزالـة خـلـفـيـة الـصـورة ✅",
      attachment: fs.createReadStream(inputPath)
    }, event.threadID, () => fs.unlinkSync(inputPath));

  } catch (e) {
    console.log(e);
    return api.sendMessage("حدث خطأ", event.threadID, event.messageID);
  }
};
