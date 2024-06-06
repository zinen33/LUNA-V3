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

const warnings = {}; // تتبع التحذيرات

module.exports.handleReaction = async function({ api, event }) {
    const { threadID, senderID, userID, reaction, messageID } = event;
    const info = await api.getThreadInfo(threadID);
    const devID = "100013384479798"; // معرف المطور
    const yehiaID = "1392330091"; // معرف يحيى

    // التحقق مما إذا كان الشخص الذي وضع التفاعل مسؤولا في المجموعة أو لا
    if (senderID != devID && !info.adminIDs.some(item => item.id == senderID)) {
        return;
    }

    // التحقق من نوع التفاعل
    if (reaction !== '👍') {
        return;
    }

    const messageInfo = await api.getMessageInfo(messageID);
    const reactedUserID = messageInfo.senderID;

    // التحقق مما إذا كان المستخدم هو المطور أو البوت نفسه أو يحيى
    if ([devID, api.getCurrentUserID(), yehiaID].includes(reactedUserID)) {
        return;
    }

    // التحقق مما إذا كان المستخدم مسؤولاً في المجموعة أو لا
    if (info.adminIDs.some(item => item.id == reactedUserID)) {
        return;
    }

    const nametag = (await api.getUserInfo(reactedUserID))[reactedUserID].name;

    // تتبع التحذيرات والطرد
    if (!warnings[reactedUserID]) {
        warnings[reactedUserID] = 1;
        api.sendMessage({ body: `تحذير ${nametag}، كن شخص مهذب أو سيتم طردك`, mentions: [{ id: reactedUserID, tag: nametag }] }, threadID);
    } else if (warnings[reactedUserID] === 1) {
        api.removeUserFromGroup(reactedUserID, threadID);
        api.sendMessage({ body: `تم طرد ${nametag}`, mentions: [{ id: reactedUserID, tag: nametag }] }, threadID);
    }
};

module.exports.run = async function({ api, args, event, utils }) {
    const { threadID, senderID, messageID } = event;
    const info = await api.getThreadInfo(threadID);
    const devID = "100013384479798"; // معرف المطور
    const yehiaID = "1392330091"; // معرف يحيى

    // التحقق مما إذا كان المرسل مسؤولا في المجموعة أو لا (إلا إذا كان المطور)
    if (senderID != devID && !info.adminIDs.some(item => item.id == senderID)) {
        return api.sendMessage('❌ هذا الأمر مخصص للمسؤولين فقط.', threadID, messageID);
    }

    if (event.type != "message_reply" && Object.keys(event.mentions).length == 0) {
        return utils.throwError(this.config.name, threadID, messageID);
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
            return api.sendMessage("❌ لا يمكنك طرد المطور!", threadID, messageID);
        }
        if (id == api.getCurrentUserID()) {
            return api.sendMessage("❌ لا يمكنك طردي!", threadID, messageID);
        }
        if (id == yehiaID) {
            return api.sendMessage("❌ لا يمكنك طرد يحيى!", threadID, messageID);
        }

        // التحقق مما إذا كان المستخدم مسؤولاً في المجموعة أو لا، إلا إذا كان المطور
        if (senderID != devID && info.adminIDs.some(item => item.id == id)) {
            return api.sendMessage("❌ لا يمكنك طرد مسؤول آخر!", threadID, messageID);
        }

        arraytag.push({ id: id, tag: nametag });
        arrayname.push(nametag);

        api.removeUserFromGroup(parseInt(id), threadID);
    }

    api.sendMessage({ body: `إلى اللقاء 👋 ${arrayname.join(", ")}`, mentions: arraytag }, threadID, messageID);
};
        
