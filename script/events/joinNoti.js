const request = require("request");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "CatalizCS",
    description: "Notify bot or group member with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache", "joinGif");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;

    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`{ ${global.config.PREFIX} } × ${(!global.config.BOTNAME) ? "البوت" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("إفسحو المجال قد أتت الملكة 😎", event.threadID, () => api.sendMessage({
            body: `┌─────━━❖❖━━──────┐\n\t\t\tٺــم اﻹٺــڝــاڸ بــڼــڃــٱح ‌‌‏✅\n💮________༺🖤༻________💮\nإستخدم:\n${global.config.PREFIX}أوامر: من أجل الإطلاع على الأوامر المتاحة\n${global.config.PREFIX}نداء: إستعمله إذا كان هناك أي مشكلة بالبوت\n[⚠️ملاحظة: لا تستعمل الأمر نداء إلا في حالة الطوارئ]\n💮________༺🖤༻________💮\nالمطور: حسين يعقوبي\nرابط فيسبوك المطور: https://www.facebook.com/profile.php?id=61552791186880&mibextid=ZbWKwL\n💮_________༺🖤༻________💮\n\t\t[شكرا على إختيار هيناتا البوت ☺️]\n└─────━━❖❖━━──────┘`,
            attachment: fs.createReadStream(__dirname + "/cache/join/hello.gif")
        }, threadID));
    } else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);

            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinGif");

            var mentions = [], nameArray = [], memLength = [], i = 0;

            for (const user of event.logMessageData.addedParticipants) {
                const userName = user.fullName;
                const userID = user.userFbId;
                nameArray.push(userName);
                mentions.push({ tag: userName, id: userID });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);

            let msg = threadData.customJoin || "🌟───────💮───────🌟\n💞 مرحبا بك يا أيها العضو الجديد {name}\n┌────── ～🌺～ ──────┐\n ⚜️ مرحبا بك معنا في مجموعة {threadName}• {type} العضو رقم {soThanhVien} في هذه المجموعة, أرجوك إستمتع! 🥳♥\n└────── ～🌺～ ──────┘\n[🍒 🎀 ℍ𝕀ℕ𝔸𝕋𝔸 𝔹𝕆𝕋 🎀 🍒]\n🌟───────💮───────🌟";
            msg = msg.replace(/\{name}/g, nameArray.join(', '))
                     .replace(/\{type}/g, (memLength.length > 1) ? 'أنتم' : 'أنت')
                     .replace(/\{soThanhVien}/g, memLength.join(', '))
                     .replace(/\{threadName}/g, threadName);

            const profilePics = [];
            for (const user of event.logMessageData.addedParticipants) {
                const userId = user.userFbId;
                const picturePath = join(__dirname, "cache", "joinGif", `${userId}.jpg`);
                const pictureUrl = `https://graph.facebook.com/${userId}/picture?type=large`;

                await new Promise((resolve, reject) => {
                    request(pictureUrl)
                        .pipe(fs.createWriteStream(picturePath))
                        .on("finish", resolve)
                        .on("error", reject);
                });

                profilePics.push(picturePath);
            }

            const attachments = profilePics.map(pic => createReadStream(pic));

            return api.sendMessage({ body: msg, mentions, attachment: attachments }, threadID);

        } catch (e) {
            console.log(e);
            return api.sendMessage("حدث خطأ أثناء محاولة الترحيب بالعضو الجديد.", threadID);
        }
    }
}
