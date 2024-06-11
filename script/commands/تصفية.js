let { gender } = await Users.getInfo(event.senderID);

gender = gender === 1 ? "Female" : "Male";

module.exports.config = {
    name: "تصفية",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "ProCoderMew",
    description: "🇦🇱 اخراج الحسابات المعطلة من المجموعة 🇦🇱",
    commandCategory: "〘 ادمن قروب ﮱ 〙",
    usages: "فقط",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    const { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);
    const adminCheck = adminIDs.map(e => e.id).some(e => e == global.data.botID);

    const filterOptions = "________________________________\n" +
        "رد بالرقم لتصفية\n" +
        "1 حسابات مغلقة\n" +
        "2 طرد الإناث\n" +
        "3 طرد الذكور\n" +
        "________________________________";

    api.sendMessage(filterOptions, event.threadID, async (err, info) => {
        global.client.handleReply.push({
            type: "filter",
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            userInfo: userInfo,
            adminCheck: adminCheck,
            threadID: event.threadID
        });
    });
};

module.exports.handleReply = async function({ api, event, handleReply }) {
    if (event.senderID != handleReply.author) return;

    const { userInfo, adminCheck, threadID } = handleReply;
    const choice = event.body;

    let arr = [];
    if (choice === '1') {
        for (const e of userInfo) {
            if (!e.gender) {
                arr.push(e.id);
            }
        }
    } else if (choice === '2') {
        for (const e of userInfo) {
            if (e.gender == 1) {
                arr.push(e.id);
            }
        }
    } else if (choice === '3') {
        for (const e of userInfo) {
            if (e.gender == 2) {
                arr.push(e.id);
            }
        }
    } else {
        return api.sendMessage("اختيار غير صالح، حاول مرة أخرى.", threadID);
    }

    if (arr.length == 0) {
        return api.sendMessage("لا يوجد مستخدمون مستوفون للشروط.", threadID);
    } else {
        if (!adminCheck) {
            return api.sendMessage("يرجى منحي صلاحيات الأدمن حتى أتمكن من تنفيذ التصفية.", threadID);
        }

        let success = 0, fail = 0;
        for (const e of arr) {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await api.removeUserFromGroup(parseInt(e), threadID);
                success++;
            } catch {
                fail++;
            }
        }

        api.sendMessage(`تمت تصفية ${success} أشخاص بنجاح.`, threadID, () => {
            if (fail != 0) {
                api.sendMessage(`حدث خطأ، لم أتمكن من تصفية ${fail} أشخاص.`, threadID);
            }
        });
    }
};
           
