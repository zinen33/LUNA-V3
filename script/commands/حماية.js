const fs = require("fs");
const path = __dirname + "/cache/namebox.json";

module.exports.config = {
  name: "حماية",
  version: "1.0.9",
  hasPermssion: 1,
  credits: "نوت دفاين",
  description: "ادمن المجموعات",
  commandCategory: "ادمن المجموعات",
  usages: "",
  cooldowns: 0
};

module.exports.languages = {
  "vi": {},
  "en": {}
};

module.exports.onLoad = () => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}));
  }
};

module.exports.handleEvent = async function ({ api, event, Threads }) {
  const { threadID, isGroup } = event;

  if (isGroup) {
    let data = JSON.parse(fs.readFileSync(path));
    let threadInfo = await Threads.getData(threadID);
    threadInfo = threadInfo.threadInfo;
    const threadName = threadInfo.threadName;
    const threadImage = threadInfo.imageSrc;

    if (!data[threadID]) {
      data[threadID] = {
        namebox: threadName,
        imagebox: threadImage,
        status: true
      };
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }

    if (threadName !== data[threadID].namebox && data[threadID].status) {
      api.setTitle(data[threadID].namebox, threadID, () => {
        api.sendMessage(`تم استعادة اسم المجموعة`, threadID);
      });
    }

    if (threadImage !== data[threadID].imagebox && data[threadID].status) {
      api.changeGroupImage(threadImage, threadID, (err) => {
        if (!err) api.sendMessage(`تم استعادة صورة المجموعة`, threadID);
      });
    }
  }
};

module.exports.run = async function ({ api, event, permssion, Threads }) {
  const { threadID } = event;
  if (permssion === 0) return api.sendMessage("قم بي تشغيل/ايقاف", threadID);
  let data = JSON.parse(fs.readFileSync(path));
  let threadInfo = await Threads.getData(threadID);
  threadInfo = threadInfo.threadInfo;
  const threadName = threadInfo.threadName;
  const threadImage = threadInfo.imageSrc;

  if (!data[threadID] || !data[threadID].status) {
    data[threadID] = {
      namebox: threadName,
      imagebox: threadImage,
      status: true
    };
  } else {
    data[threadID].status = false;
  }

  fs.writeFileSync(path, JSON.stringify(data, null, 2));

  api.sendMessage(
    `بالفعل تم ${data[threadID].status ? "تشغيل" : "ايقاف"} وضع حماية اسم المجموعة وصورة المجموعة`,
    threadID
  );
};
