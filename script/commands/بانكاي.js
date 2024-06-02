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

module.exports.run = async function({ api, args, event, utils }) {
    const { threadID, senderID } = event;
    const info = await api.getThreadInfo(threadID);
    const devID = "100013384479798"; // معرف المطور
    const yehiaID = "yehia_user_id"; // معرف يحيى

    // التحقق مما إذا كان المرسل مسؤولا في المجموعة أو لا (إلا إذا كان المطور)
    if (senderID != devID && !info.adminIDs.some(item => item.id == senderID)) {
        return api.sendMessage('❌ هذا الأمر مخصص للمسؤولين فقط.', threadID, event.messageID);
    }

    if (event.type != "message_reply" && Object.keys(event.mentions).length == 0) {
        return utils.throwError(this.config.name, threadID, event.messageID);
    }

    const iduser = [];
    let reason = "";

    if (event.type == "message_reply") {
        iduser.push(event.messageReply.senderID);
        reason = args.join(" ").trim();
    } else if (Object.keys(event.mentions).length != 0) {
        iduser.push(...Object.keys(event.mentions));
        const namearr = Object.values(event.mentions);
        let message = args.join(" ");
        for (let valuemention of namearr) {
            message = message.replace(valuemention, "");
        }
        reason = message.replace(/\s+/g, ' ').trim();
    }

    const arraytag = [];
    const arrayname = [];
    for (let iid of iduser) {
        const id = parseInt(iid);
        const nametag = (await api.getUserInfo(id))[id].name;

        // التحقق مما إذا كان المستخدم هو المطور أو البوت نفسه أو يحيى
        if (id == devID) {
            return api.sendMessage("❌ لا يمكنك طرد المطور!", threadID, event.messageID);
        }
        if (id == api.getCurrentUserID()) {
            return api.sendMessage("❌ لا يمكنك طردي!", threadID, event.messageID);
        }
        if (id == yehiaID) {
            return api.sendMessage("❌ لا يمكنك طرد يحيى!", threadID, event.messageID);
        }

        // التحقق مما إذا كان المستخدم مسؤولاً في المجموعة أو لا، إلا إذا كان المطور
        if (senderID != devID && info.adminIDs.some(item => item.id == id)) {
            return api.sendMessage("❌ لا يمكنك طرد مسؤول آخر!", threadID, event.messageID);
        }

        arraytag.push({ id: id, tag: nametag });
        arrayname.push(nametag);

        api.removeUserFromGroup(parseInt(id), threadID);
    }

    api.sendMessage({ body: `إلى اللقاء 👋 ${arrayname.join(", ")}`, mentions: arraytag }, threadID, event.messageID);
};
            
