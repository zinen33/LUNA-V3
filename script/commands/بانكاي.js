module.exports.config = {
    name: "طرد",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "زينو",
    description: "ازالة الاعضاء من المجموعة",
    usage: "/طرد [تاغ]",
    cooldowns: 5,
    args: "mention",
    commandCategory: "admin",
    usages: "طرد @user",
    isAdminOnly: true,
    dependencies: {
        "fs-extra": "",
    }
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    const fs = require("fs-extra");
    
    // التحقق من صلاحيات المستخدم
    const threadInfo = await api.getThreadInfo(threadID);
    const isAdmin = threadInfo.adminIDs.some(admin => admin.id == senderID);
    const isBotAdmin = threadInfo.adminIDs.some(admin => admin.id == api.getCurrentUserID());
    
    if (!isAdmin || !isBotAdmin) {
        return api.sendMessage('❌ هذا الأمر مخصص للمسؤولين فقط.', threadID, messageID);
    }

    // كود التفاعل مع الإيموجيات المغضبة
    if (event.type === "message_reaction" && event.reaction === "😡") {
        if (bans.banned[threadID].includes(senderID)) {
            return api.sendMessage("باي أيها مزجع مع ذكره", threadID);
        } else {
            bans.banned[threadID].push(senderID);
            fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
            return api.sendMessage("تحذير: كن عضو لطيف وجيد، أو سيتم طردك", threadID);
        }
    }

    // التفاعل مع الرسائل المرتدة
    if (event.type === "message_reply") {
        const repliedMsg = (await api.getMessageInfo(event.messageReply.messageID, threadID)).body;
        if (repliedMsg.includes("😡")) {
            if (bans.banned[threadID].includes(senderID)) {
                return api.sendMessage("باي أيها مزجع  ", threadID);
            } else {
                bans.banned[threadID].push(senderID);
                fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
                return api.sendMessage("تحذير: كن عضو لطيف وجيد، أو سيتم ردك", threadID);
            }
        }
    }
};
