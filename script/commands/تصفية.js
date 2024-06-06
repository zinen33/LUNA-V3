module.exports.config = {
    name: "تصفية",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "ProCoderMew",
    description: "🇦🇱 اخراج لحسابة لمعطلة من لقروب 🇦🇱",
    commandCategory: "〘 ادمن قروبﮱ 〙",
    usages: "فقط",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    const filterMessage = 
        "________________________________\n" +
        "رد بالرقم لتصفية\n" +
        "1 حسابات مغلقة \n" +
        "2 طرد الإناث \n" +
        "3 طرد الأولاد \n" +
        "________________________________";

    api.sendMessage(filterMessage, event.threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "filterSelection"
        });
    });
};

module.exports.handleReply = async function({ api, event, handleReply }) {
    if (event.senderID !== handleReply.author) return;
    
    var { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);
    var success = 0, fail = 0;
    var arr = [];

    switch (event.body) {
        case "1":
            arr = userInfo.filter(e => e.gender === undefined).map(e => e.id);
            break;
        case "2":
            arr = userInfo.filter(e => e.gender === 2).map(e => e.id);
            break;
        case "3":
            arr = userInfo.filter(e => e.gender === 1).map(e => e.id);
            break;
        default:
            return api.sendMessage("اختيار غير صحيح. الرجاء الرد برقم صحيح.", event.threadID);
    }

    if (arr.length === 0) {
        return api.sendMessage("- لا توجد حسابات للتصفية بالمعايير المختارة.", event.threadID);
    } else {
        adminIDs = adminIDs.map(e => e.id).some(e => e == global.data.botID);
        if (!adminIDs) {
            return api.sendMessage("- صعدني أدمن حتى أقدر أصفيهم.", event.threadID);
        } else {
            api.sendMessage("- جار التصفية ..", event.threadID, async function() {
                for (const e of arr) {
                    try {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await api.removeUserFromGroup(parseInt(e), event.threadID);
                        success++;
                    } catch {
                        fail++;
                    }
                }

                api.sendMessage("تمت تصفية " + success + " أشخاص بنجاح.", event.threadID, function() {
                    if (fail !== 0) return api.sendMessage("- حدث خطأ، لم أتمكن من تصفية " + fail + " أشخاص.", event.threadID);
                });
            });
        }
    }
};
