const path = require("path");
const fs = require("fs");

let bannedWords = {};
let warnings = {};
let badWordsActive = {};
let adminWarningSent = {}; // Track if the admin warning has been sent for each thread

module.exports.config = {
  name: "حضر",
  version: "1.0.0",
  hasPermission: 1,
  description: "حظر شخص عند قوله كلمة نامية أو محظورة",
  usePrefix: true,
  commandCategory: "المالك",
  usages: "تشغيل | إيقاف",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID } = event;

  // تحقق من وجود credits واسم المطور
  if (!module.exports.config.credits || !module.exports.config.credits.includes("ZINO")) {
    return api.sendMessage("عذرا ارجو إرجاع إسم مطوري في الأمر لكي يعمل", threadID);
  }

  const loadWords = () => {
    const wordFile = path.join(__dirname, `../commands/cache/bannedWords.json`);
    if (fs.existsSync(wordFile)) {
      const words = fs.readFileSync(wordFile, "utf8");
      bannedWords = JSON.parse(words);
    } else {
      bannedWords = [];
    }
  };

  loadWords();

  if (!badWordsActive[threadID]) return;

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    if (!adminWarningSent[threadID]) {
      api.sendMessage("🛡️ | يحتاج البوت أن يكون آدمن في المجموعة من أجل حظر المزعجين اللذين بتفوهون بكلام بذيء تلقائيا من المجموعة\nتم تطوير الأمر بواسطة زينو", threadID);
      adminWarningSent[threadID] = true;
    } else {
      api.sendMessage("تمت إزالتي من دور مسؤول", threadID);
    }
    return;
  }

  const messageContent = event.body.toLowerCase();
  const hasBannedWord = bannedWords.some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    if (!warnings[senderID]) warnings[senderID] = 0;

    warnings[senderID]++;
    if (warnings[senderID] === 2) {
      api.sendMessage(" ⚠️ |أنت بالفعل تم تحذيرك مرتين هذا يعني أنه سيتم طردك من المجموعة", threadID, messageID);
      api.removeUserFromGroup(senderID, threadID);
      warnings[senderID] = 1;
    } else {
      api.sendMessage(` ⚠️ |  لقد تم تحديد و إكتشاف كلمة نامية ومحظورة في جملتك "${messageContent}" إذا قمت بمعاودة الكرة سيتم طردك تلقائيا من المجموعة \n بإذن الله إذا تم رفعي آدمن`, threadID, messageID);
    }
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  // تحقق من وجود credits واسم المطور
  if (!module.exports.config.credits || !module.exports.config.credits.includes("ZINO")) {
    return api.sendMessage("عذرا ارجو إرجاع إسم مطوري في الأمر لكي يعمل", threadID);
  }

  if (!args[0]) {
    return api.sendMessage("أىجوك قم بإختيار  (تشغيل, إيقاف).", threadID);
  }

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    if (!adminWarningSent[threadID]) {
      api.sendMessage("🛡️ | يحتاج البوت أن يكون آدمن في المجموعة من أجل حظر المزعجين اللذين بتفوهون بكلام بذيء تلقائيا من المجموعة\nتم تطوير الأمر بواسطة زينو", threadID);
      adminWarningSent[threadID] = true;
    } else {
      api.sendMessage("تمت إزالتي من دور مسؤول", threadID);
    }
    return;
  }

  const action = args[0];

  switch (action) {
    case 'تشغيل':
      badWordsActive[threadID] = true;
      api.sendMessage(` ✅ |تم تشغيل الحظر التلقائي للكلمات المحظورة .`, threadID);
      break;
    case 'إيقاف':
      badWordsActive[threadID] = false;
      api.sendMessage(` ❎ |الحظر التلقائي للكلمات المحظورة تم إيقافه .`, threadID);
      break;
    default:
      api.sendMessage(" ❌ |فعل غير صحيح. المرجو إستخدام 'تشغيل' أو 'إيقاف'.", threadID);
  }
};
  
