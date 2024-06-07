module.exports.config = {
    name: "تصفية",
    version: "1.0.0",
    hasPermissions: 1,
    credits: "ZINO",
    description: "🇦🇱 اخراج الحسابات المعطلة من القروب 🇦🇱",
    commandCategory: "〘 ادمن قروب ﮱ 〙",
    usages: "فقط",
    cooldowns: 5
};

function getUserGender(genderCode) {
    if (genderCode === 2) return 'ولد';
    if (genderCode === 1) return 'فتاة';
    return 'غير معروف';
}

module.exports.run = async function({ api, event }) {
    const filterMessage = 
        "________________________________\n" +
        "رد بالرقم لتصفية\n" +
        "1 حسابات مغلقة \n" +
        "2 طرد الإناث \n" +
        "3 طرد الأولاد \n" +
        "________________________________";

    api.sendMessage(filterMessage, event.threadID, (error, info) => {
        if (error) return console.error(error);
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

    const threadInfo = await api.getThreadInfo(event.threadID);
    const userInfo = threadInfo.userInfo;
    const adminIDs = threadInfo.adminIDs;

    let success = 0, fail = 0;
    let arr = [];

    // اختيار تصفية حسب الجنس
    switch (event.body) {
        case "1":
            arr = userInfo.filter(e => e.gender === undefined || e.gender === null).map(e => e.id);
            break;
        case "2":
            arr = userInfo.filter(e => e.gender === 1).map(e => e.id); // 1 للفتيات
            break;
        case "3":
            arr = userInfo.filter(e => e.gender === 2).map(e => e.id); // 2 للأولاد
            break;
        default:
            return api.sendMessage("اختيار غير صحيح. الرجاء الرد برقم صحيح.", event.threadID);
    }

    if (arr.length === 0) {
        return api.sendMessage("لا توجد حسابات للتصفية بالمعايير المختارة.", event.threadID);
    } else {
        const botAdmin = adminIDs.some(e => e.id === api.getCurrentUserID());
        if (!botAdmin) {
            return api.sendMessage("صعدني أدمن حتى أقدر أصفيهم.", event.threadID);
        } else {
            api.sendMessage("جار التصفية ...", event.threadID, async function() {
                for (const e of arr) {
                    try {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await api.removeUserFromGroup(parseInt(e), event.threadID);
                        success++;
                    } catch (err) {
                        console.error("فشل في طرد المستخدم: ", e, err);
                        fail++;
                    }
                }

                let resultMessage = `تمت تصفية ${success} أشخاص بنجاح.`;
                if (fail !== 0) resultMessage += `\nحدث خطأ، لم أتمكن من تصفية ${fail} أشخاص.`;
                api.sendMessage(resultMessage, event.threadID);
            });
        }
    }
};
        
