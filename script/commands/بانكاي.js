module.exports.config = {
  name: "بانكاي",
  version: "2.0.5",
  hasPermssion: 1,
  credits: "DRIDI-RAYEN",
  description: "ازالة الاعضاء من المجموعة ☑️✨",
  usePrefix: true,
  commandCategory: "〘 ادمن المجموعات 〙",
  usages: "/حضر (رد على رسالة شخصاو اعمل له اشارة) او /حظر [@mention] [reason]",
  cooldowns: 5,
  info: [
    {
      key: '[تاغ] او [رد على الرسالة] "السبب"',
      prompt: 'تحذير مستخدم اخر⚠️',
      type: '',
      example: 'طرد [تاغ] "سبب التحذير"'
    },
    {
      key: 'قائمة_الحضر',
      prompt: 'قائمة الأعضاء المحضورة👤⛔',
      type: '',
      example: 'طرد قائمة_الحضر'
    },
    {
      key: 'فك',
      prompt: 'ازالة العضو👤 من قائمة📜الحضر⛔',
      type: '',
      example: 'حضر فك [ايدي المستخدم لفك الحضر او حضره⛔]'
    },
    {
      key: 'عرض',
      prompt: '"تاغ" او "فارغ" او "عرض_الكل", يُستخدم على التوالي لمعرفة عدد المرات التي تم فيها تحذير الشخص الذي وضع علامة باسمك أو نفسك أو أحد أعضاء المربع ',
      type: '',
      example: 'حضر عرض [@تاغ] /يحذر الراي'
    },
    {
      key: 'ريست',
      prompt: 'Reset all data in your group',
      type: '',
      example: 'حضر ريست'
    },
    {
      key: 'حظر [@mention] [reason]',
      prompt: 'حظر عضو من المجموعة',
      type: '',
      example: 'حظر [@mention] سبب الحظر'
    }
  ]
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
  let { messageID, threadID, senderID } = event;
  var info = await api.getThreadInfo(threadID);

  // Check if the bot is an admin in the group
  if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) {
    return api.sendMessage('عذرا لا يمكنني ازالة العضو😥\nاحتاج أن اكون مسوؤلة⏳', threadID, messageID);
  }

  // Check if the user trying to use the command is the bot owner
  const botOwner = global.config.ADMINBOT;
  if (botOwner.includes(senderID)) {
    return api.sendMessage('لا يمكنك طرد نفسك (المطور) من المجموعة.', threadID, messageID);
  }

  // Check if the user is trying to ban the bot
  const botID = api.getCurrentUserID();
  if (Object.keys(event.mentions).includes(botID)) {
    return api.sendMessage('لا يمكنك طردي من المجموعة.', threadID, messageID);
  }

  if (args[0] == "حظر") {
    const userID = Object.keys(event.mentions)[0];
    if (!userID) {
      return api.sendMessage('يرجى ذكر المستخدم الذي تريد حظره.', threadID, messageID);
    }

    // Check if the mentioned user is the bot owner or the bot itself
    if (botOwner.includes(userID) || userID === botID) {
      return api.sendMessage('لا يمكنك حظر المطور أو البوت نفسه من المجموعة.', threadID, messageID);
    }

    const reason = (args.slice(1)).join(" ") || "لم يتم تحديد سبب";

    try {
      await api.removeUserFromGroup(userID, threadID);
      await api.sendMessage(`تم حظر العضو ${event.mentions[userID]} من المجموعة بنجاح.\nالسبب: ${reason}`, threadID, messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage('حدث خطأ أثناء محاولة حظر العضو من المجموعة.', threadID, messageID);
    }

    return;
  }

  var fs = require("fs-extra");

  if (!fs.existsSync(__dirname + `/cache/bans.json`)) {
    const dataaa = { warns: {}, banned: {} };
    fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(dataaa));
  }

  var bans = JSON.parse(fs.readFileSync(__dirname + `/cache/bans.json`)); //read file contents

  if (!bans.warns.hasOwnProperty(threadID)) {
    bans.warns[threadID] = {};
    fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
  }

  if (args[0] == "عرض") {
    // ... (code for "عرض" command)
  } else if (args[0] == "فك") {
    // ... (code for "فك" command)
  } else if (args[0] == "ليست_بان") {
    // ... (code for "ليست_بان" command)
  } else if (args[0] == "ريست") {
    // ... (code for "ريست" command)
  } else {
    // ... (code for warning/banning users)
  }
};
