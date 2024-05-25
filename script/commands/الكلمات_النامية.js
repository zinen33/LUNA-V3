let warnings = {};
let badWordsActive = {};
let removedFromAdmin = {};

module.exports.config = {
  name: "الكلمات_النامية",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Jonell Magallanes",
  description: "ادمن المجموعات",
  usePrefix: true,
  commandCategory: "ادمن المجموعات",
  usages: "تشغيل | إيقاف",
  cooldowns: 5,
};

// Function to load banned words from JSON file
const loadBannedWords = () => {
  const filePath = path.join(__dirname, "../commands/cache/badwords.json");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.bannedWords || [];
  } else {
    return [];
  }
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID } = event;

  const bannedWords = loadBannedWords();

  if (!badWordsActive[threadID]) return;

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin && !removedFromAdmin[threadID]) {
    api.sendMessage("Bot Needs Admin Privilege", threadID);
    removedFromAdmin[threadID] = true; // تعيين المتغير بقيمة true بمجرد الإعلان عن إزالة البوت من الإدارة
    return;
  }

  if (!isAdmin && removedFromAdmin[threadID]) {
    return;
  }

  const messageContent = event.body.toLowerCase();
  const hasBannedWord = bannedWords.some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    if (!warnings[senderID]) warnings[senderID] = 0;

    warnings[senderID]++;
    if (warnings[senderID] === 2) {
      api.sendMessage("⚠️ | أنت بالفعل تم تحذيرك مرتين، سيتم طردك من المجموعة.", threadID, messageID);
      api.removeUserFromGroup(senderID, threadID); 
      warnings[senderID] = 1;
    } else {
      api.sendMessage(`⚠️ | لقد تم تحديد و اكتشاف كلمة محظورة في جملتك "${messageContent}". إذا قمت بمعاودة الكرة سيتم طردك تلقائيا من المجموعة.`, threadID, messageID);
    }
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args[0]) {
    return api.sendMessage("أىجوك قم بإختيار (تشغيل, إيقاف).", threadID);
  }

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    api.sendMessage("🛡️ | يحتاج البوت أن يكون آدمن في المجموعة من أجل حظر المزعجين.", threadID);
    return;
  }

  const action = args[0];

  switch (action) {
    case 'تشغيل':
      badWordsActive[threadID] = true;
      api.sendMessage(`✅ | تم تشغيل الحظر التلقائي للكلمات المحظورة.`, threadID);
      break;
    case 'إيقاف':
      badWordsActive[threadID] = false;
      removedFromAdmin[threadID] = true;
      api.sendMessage(`❎ | تم إيقاف الحظر التلقائي للكلمات المحظورة.`, threadID);
      break;
    default:
      api.sendMessage("❌ | فعل غير صحيح. المرجو إستخدام 'تشغيل' أو 'إيقاف'.", threadID);
  }
};
