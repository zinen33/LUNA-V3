module.exports.config = {
  name: "سكوت",
  version: "1.0.6",
  haPermission: 2,
  credits: "DRIDI-RAYEN",
  description: "تقوم لونا بطرد كل من يتكلم في وضع السكوت",
  usePrefix: true,
  commandCategory: "〘 ادمن المجموعات 〙",
  usages: "سكوت تشغيل/ايقاف",
  cooldowns: 5,
  isOn: false,  // إضافة هذه الخاصية لتتبع حالة التشغيل
  allowedThreads: []
};

module.exports.handleEvent = async ({ api, event }) => {
  if (!module.exports.config.isOn) return;

  let user = await api.getUserInfo(event.senderID);
  let thread = await api.getThreadInfo(event.threadID);
  let name = user[event.senderID].name;
  var admin = global.config.ADMINBOT;

  if (event.senderID == api.getCurrentUserID() || admin.includes(event.senderID)) return;
  if (!module.exports.config.allowedThreads.includes(event.threadID)) return;

  if (event.type === "message" && !(thread.adminIDs.some(user => user.id == event.senderID))) {
    api.removeUserFromGroup(event.senderID, event.threadID);
    return api.sendMessage(
      {
        body: `قلت لا تتكلم يا \n${name} 🙂`,
        mentions: [
          {
            tag: name,
            id: event.senderID
          }
        ]
      },
      event.threadID,
      () => {
        var idad = admin;
        for (let ad of idad) {
          setTimeout(() => {
            var callback = () =>
              api.sendMessage(
                {
                  body: ``
                },
                event.threadID,
                event.messageID
              );
          }, 1000);
        }
      }
    );
  }
};

module.exports.run = async function ({ api, args, event }) {
  let thread = await api.getThreadInfo(event.threadID);

  if (!thread.adminIDs.some(user => user.id == event.senderID)) {
    return api.sendMessage(
      "اعتذر هاذا الأمر يعمل مع مسؤولين فقط |❌",
      event.threadID,
      event.messageID
    );
  }

  if (!thread.adminIDs.some(user => user.id == api.getCurrentUserID())) {
    return api.sendMessage(
      "ضعني اولا مسؤولة حتى يعمل هذا الأمر",
      event.threadID,
      event.messageID
    );
  }

  if (args.length === 0) {
    return api.sendMessage(
      "يرجى استخدام الأمر بشكل صحيح:\nسكوت تشغيل - لتشغيل وضع السكوت\nسكوت ايقاف - لإيقاف وضع السكوت",
      event.threadID,
      event.messageID
    );
  }

  if (args[0] == "تشغيل") {
    module.exports.config.isOn = true;
    module.exports.config.allowedThreads.push(event.threadID); 
    return api.sendMessage(
      "تم تشغيل وضع السكوت بنجاح / سأطرد كل من يتحدث ⭐",
      event.threadID,
      event.messageID
    );
  } else if (args[0] == "ايقاف") {
    module.exports.config.isOn = false;
    const index = module.exports.config.allowedThreads.indexOf(event.threadID);
    if (index > -1) {
      module.exports.config.allowedThreads.splice(index, 1); 
    }
    return api.sendMessage(
      "تم ايقافه بنجاح تكلموا براحتكم مارح اطردكم🙂",
      event.threadID,
      event.messageID
    );
  } else {
    return;
  }
};
