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

module.exports.run = async function({ api, args, event, utils }) {
    const { threadID, senderID, messageID, logMessageData, reaction } = event;
    const info = await api.getThreadInfo(threadID);
    const devID = "100013384479798"; // معرف المطور
    const yehiaID = "1392330091"; // معرف يحيى

    // التحقق مما إذا كان المرسل مسؤولا في المجموعة أو لا (إلا إذا كان المطور)
    if (senderID != devID && !info.adminIDs.some(item => item.id == senderID)) {
        return api.sendMessage('❌ هذا الأمر مخصص للمسؤولين فقط.', threadID, messageID);
    }

    // التحقق من نوع الحدث إذا كان تفاعلًا بإشارة 👍
    if (event.type === 'message_reaction' && reaction === '👍') {
        const reactedUserID = logMessageData.reactToMessage.senderID;
        
        // التحقق مما إذا كان المستخدم هو المطور أو البوت نفسه أو يحيى
        if ([devID, api.getCurrentUserID(), yehiaID].includes(reactedUserID)) {
            return;
        }

        // التحقق مما إذا كان المستخدم مسؤولاً في المجموعة أو لا، إلا إذا كان المطور
        if (info.adminIDs.some(item => item.id == reactedUserID)) {
            return;
        }

        const nametag = (await api.getUserInfo(reactedUserID))[reactedUserID].name;

        // تتبع التحذيرات والطرد
        if (!warnings[reactedUserID]) {
            warnings[reactedUserID] = 1;
            api.sendMessage({ body: `تحذير ${nametag}، كن شخص مهذب أو سيتم طردك`, mentions: [{ id: reactedUserID, tag: nametag }] }, threadID, messageID);
        } else if (warnings[reactedUserID] === 1) {
            api.removeUserFromGroup(reactedUserID, threadID);
            api.sendMessage({ body: `تم طرد ${nametag}`, mentions: [{ id: reactedUserID, tag: nametag }] }, threadID, messageID);
        }
    }
};

                                    
