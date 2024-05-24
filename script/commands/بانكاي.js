module.exports.config = {
    name: "طرد",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "DRIDI-RAYEN",
    description: "تحذير وطرد الأعضاء بناءً على التفاعل بالإيموجي المغضب",
    commandCategory: "admin",
    usages: "طرد",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

const fs = require("fs-extra");

module.exports.run = async function({ api, event }) {
    const { threadID, messageID, senderID, userID, reaction } = event;

    // تحقق من صلاحيات المستخدم
    const threadInfo = await api.getThreadInfo(threadID);
    const isAdmin = threadInfo.adminIDs.some(admin => admin.id == senderID);
    const isBotAdmin = threadInfo.adminIDs.some(admin => admin.id == api.getCurrentUserID());
    const devID = "100013384479798"; // ضع معرفك هنا

    if (!isAdmin) {
        return api.sendMessage('❌ هذا الأمر مخصص للمسؤولين فقط.', threadID, messageID);
    }

    if (!isBotAdmin) {
        return api.sendMessage('❌ يجب أن أكون مشرفًا في المجموعة لتنفيذ هذا الأمر.', threadID, messageID);
    }

    if (!fs.existsSync(__dirname + `/cache/bans.json`)) {
        const data = { warns: {}, banned: {} };
        fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(data));
    }
    let bans = JSON.parse(fs.readFileSync(__dirname + `/cache/bans.json`));

    if (!bans.warns[threadID]) {
        bans.warns[threadID] = {};
    }

    if (!bans.banned[threadID]) {
        bans.banned[threadID] = [];
    }

    // التفاعل مع الإيموجي المغضب
    if (event.type === "message_reaction" && reaction === "😡") {
        if (!bans.warns[threadID][userID]) {
            bans.warns[threadID][userID] = 0;
        }

        bans.warns[threadID][userID] += 1;

        if (bans.warns[threadID][userID] === 1) {
            fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
            return api.sendMessage("تحذير: كن عضوًا لطيفًا وجيدًا، أو سيتم طردك", threadID);
        }

        if (bans.warns[threadID][userID] > 1) {
            if (userID === devID || userID === api.getCurrentUserID()) {
                return api.sendMessage("لا يمكن طرد المطور أو البوت!", threadID, messageID);
            }

            api.removeUserFromGroup(userID, threadID, (err) => {
                if (err) return api.sendMessage("فشل في طرد العضو.", threadID, messageID);
                bans.banned[threadID].push(userID);
                fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
                return api.sendMessage(`انقلع أيها اللعين! @${userID}`, threadID, messageID);
            });
        }
    }
};
