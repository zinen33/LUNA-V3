module.exports.config = {
    name: "بانكاي",
    version: "2.0.5",
    hasPermssion: 1,
    credits: "DRIDI-RAYEN",
    description: "ازالة الاعضاء من المجموعة ☑️✨",
    usePrefix: true,
    commandCategory: "〘 ادمن المجموعات 〙",
    usages: "/حضر (رد على رسالة شخص او اعمل له اشارة)",
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
            prompt: '"تاغ" او "فارغ" او "عرض_الكل", يُستخدم على التوالي لمعرفة عدد المرات التي تم فيها تحذير الشخص الذي وضع علامة باسمك أو نفسك أو أحد أعضاء المربع',
            type: '',
            example: 'حضر عرض [@تاغ] /يحذر الراي'
        },
        {
            key: 'ريست',
            prompt: 'Reset all data in your group',
            type: '',
            example: 'حضر ريست'
        }
    ]
};

const devID = "";  // ضع معرفك هنا

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
    let { messageID, threadID, senderID } = event;
    var info = await api.getThreadInfo(threadID);

    if (!info.adminIDs.some(item => item.id == senderID) && !global.config.ADMINBOT.includes(senderID)) {
        return api.sendMessage('❌هذا الأمر مخصص للمسؤولين فقط.', threadID, messageID);
    }

    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) {
        return api.sendMessage('عذرا لا يمكنني ازالة العضو😥\nاحتاج أن اكون مسؤولة⏳', threadID, messageID);
    }

    var fs = require("fs-extra");

    if (!fs.existsSync(__dirname + `/cache/bans.json`)) {
        const dataaa = { warns: {}, banned: {} };
        fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(dataaa));
    }
    var bans = JSON.parse(fs.readFileSync(__dirname + `/cache/bans.json`)); // read file contents

    if (!bans.warns.hasOwnProperty(threadID)) {
        bans.warns[threadID] = {};
        fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
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
                return api.sendMessage("باي أيها مزجع مع ذكره", threadID);
            } else {
                bans.banned[threadID].push(senderID);
                fs.writeFileSync(__dirname + `/cache/bans.json`, JSON.stringify(bans, null, 2));
                return api.sendMessage("تحذير: كن عضو لطيف وجيد، أو سيتم طردك", threadID);
}
}
    }
if (args[0] == "عرض") {
    // تنفيذ الأمر
} else if (args[0] == "فك") {
    // تنفيذ الأمر
} else if (args[0] == "قائمة_الحضر") {
    // تنفيذ الأمر
} else if (args[0] == "ريست") {
    // تنفيذ الأمر
} else {
    // تنفيذ الأمر
}
