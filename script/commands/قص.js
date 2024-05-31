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
    if (event.type !== "message_reply") return api.sendMessage("تـم إزالـة خـلـفـيـة الـصـورة ✅", event.threadID, event.messageID);
    if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("يـرجـى الـرد عـلـى الـصـورة ", event.threadID, event.messageID);
    if (event.messageReply.attachments[0].type != "photo") return api.sendMessage("هـذه لـيـسـت صـورة ", event.threadID, event.messageID);

    const content = (event.type == "message_reply") ? event.messageReply.attachments[0].url : args.join(" ");
    const inputPath = path.resolve(__dirname, 'cache', `photo.png`);
    
    await image({
      url: content,
      dest: inputPath
    });

    const formData = new FormData();
    formData.append('image', fs.createReadStream(inputPath));

    const response = await axios.post('https://bg-ayoub-7f6ed04d9ce7.herokuapp.com/remove-background', formData, {
      headers: {
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer'
    });

    fs.writeFileSync(inputPath, response.data);
    return api.sendMessage({ attachment: fs.createReadStream(inputPath) }, event.threadID, () => fs.unlinkSync(inputPath));

  } catch (e) {
    console.log(e);
    return api.sendMessage(` حدث خطأ `, event.threadID, event.messageID);
  }
};
