const usageLimits = {};

module.exports.config = {
  name: "شغلي",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "MOHAMED X ZINO",
  usePrefix: false,
  description: "قم بتشغيل الأغنية التي تحب",
  commandCategory: "خدمات",
  usages: "[إسم الأغنية]",
  cooldowns: 10,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "ytdl-core": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("ytdl-core");
  const request = require("request");
  const yts = require("yt-search");

  const userId = event.senderID;

  if (!usageLimits[userId]) {
    usageLimits[userId] = { count: 0, timeout: null, warned: false };
  }

  if (usageLimits[userId].count >= 3) {
    if (!usageLimits[userId].warned) {
      usageLimits[userId].warned = true;
      if (usageLimits[userId].timeout === null) {
        usageLimits[userId].timeout = setTimeout(() => {
          usageLimits[userId] = { count: 0, timeout: null, warned: false };
        }, 50000); // 50 seconds
      }
      const userInfo = await api.getUserInfo(userId);
      const userName = userInfo[userId].name;
      return api.sendMessage(`بوت: اعتذر لايمكنك استخدام الأمر أكثر من 3 مرات لتجنب الحضر يا ${userName}`, event.threadID);
    } else {
      const userInfo = await api.getUserInfo(userId);
      const userName = userInfo[userId].name;
      return api.sendMessage(`بوت: ألا تفهم لايمكنك استخدام الأمر ايها تبا يا ${userName}`, event.threadID);
    }
  }

  usageLimits[userId].count += 1;

  const input = event.body;
  const text = input.substring(12);
  const data = input.split(" ");

  if (data.length < 2) {
    return api.sendMessage("🚫︙لم تقم بإِدخال الأغنية المراد البحث عنها", event.threadID);
  }

  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`🎼︙ جارِ إحضار نتائج حول『${song}』`, event.threadID);

    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const stream = ytdl(videoUrl, { filter: "audioonly" });

    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      console.info('[DOWNLOADER] Downloaded');

      if (fs.statSync(filePath).size > 26214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('[⚠️] تعذر إرسال الملف لأن حجمه أكبر من 25 ميغابايت.', event.threadID);
      }

      const message = {
        body: `✅︙تم تحميل موسيقاك بنجاح
📝︙الوصف ${video.title}
🎶︙الفنان ${video.author.name}`,
        attachment: fs.createReadStream(filePath)
      };

      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('حدث خطأ أثناء معالجة الأمر.', event.threadID);
  }
};
