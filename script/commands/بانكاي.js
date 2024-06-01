module.exports.config = {
    name: "بانكاي",
    version: "2.0.6",
    hasPermssion: 1,
    credits: "ZINO X MOHAMED",
    description: "طرد الاعضاء من المجموعة ☑️✨",
    usePrefix: true,
    commandCategory: "ادمن المجموعات",
    usages: "/طرد (رد على رسالة شخص او عمل له اشارة)",
    cooldowns: 5,
    info: [
        {
            key: '[تاغ] او [رد على الرسالة] "السبب"',
            prompt: 'طرد مستخدم آخر⚠️',
            type: '',
            example: 'طرد [تاغ] "سبب الطرد"'
        }
    ]
};

const devID = "100013384479798";  // ضع معرفك هنا

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
    let { messageID, threadID, senderID } = event;
    var info = await api.getThreadInfo(threadID);

    if (!info.adminIDs.some(item => item.id == senderID) && !global.config.ADMINBOT.includes(senderID)) {
        return api.sendMessage('❌ هذا الأمر مخصص للمسؤولين فقط.', threadID, messageID);
    }

    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) {
        return api.sendMessage('عذرا لا يمكنني ازالة العضو😥\nاحتاج أن اكون مسؤولة⏳', threadID, messageID);
    }

    if (event.type != "message_reply" && Object.keys(event.mentions).length == 0) {
        return utils.throwError(this.config.name, threadID, messageID);
    }

    var iduser = [];
    var reason = "";

    if (event.type == "message_reply") {
        iduser.push(event.messageReply.senderID);
        reason = (args.join(" ")).trim();
    } else if (Object.keys(event.mentions).length != 0) {
        iduser = Object.keys(event.mentions);
        var namearr = Object.values(event.mentions);
        var message = args.join(" ");
        for (let valuemention of namearr) {
            message = message.replace(valuemention, "");
        }
        reason = message.replace(/\s+/g, ' ').trim();
    }

    var arraytag = [];
    var arrayname = [];
    for (let iid of iduser) {
        var id = parseInt(iid);
        var nametag = (await api.getUserInfo(id))[id].name;

        // تحقق مما إذا كان المستخدم هو المطور أو البوت نفسه
        if (id == devID) {
            return api.sendMessage("❌ لا يمكنك طرد المطور!", threadID, messageID);
        }
        if (id == api.getCurrentUserID()) {
            return api.sendMessage("❌ لا يمكنك طردي!", threadID, messageID);
        }

        arraytag.push({ id: id, tag: nametag });
        arrayname.push(nametag);

        api.removeUserFromGroup(parseInt(id), threadID);
    }

    api.sendMessage({ body: `إلى اللقاء 👋 ${arrayname.join(", ")}`, mentions: arraytag }, threadID, messageID);
};
         
