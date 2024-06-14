const fs = require("fs-extra");
const path = require("path");
const pidusage = require("pidusage");
const axios = require('axios');

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
    const joinPath = path.join(__dirname, "cache", "joinGif");
    if (!fs.existsSync(joinPath)) fs.mkdirSync(joinPath, { recursive: true });

    const randomGifPath = path.join(joinPath, "randomgif");
    if (!fs.existsSync(randomGifPath)) fs.mkdirSync(randomGifPath, { recursive: true });

    return;
}

module.exports.run = async function({ api, event }) {
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`{ ${global.config.PREFIX} } × ${(!global.config.BOTNAME) ? "البوت" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        return api.sendMessage("✅", threadID, () => api.sendMessage({
            body: `┌─────━━❖❖━━──────┐\n\t\t\tٺــم اﻹٺــڝــاڸ بــڼــڃــٱح ‌‌‏✅\n💮________༺🖤༻________💮\nإستخدم:\n${global.config.PREFIX}أوامر:من أجل الإطلاع على الأوامر المتاحة\n${global.config.PREFIX}نداء:إستعمله إذا كان هناك أي مشكلة بالبوت\n[⚠️ملاحظة:لا تستعمل الأمر نداء إلا في حالة الطوارئ]\n💮________༺🖤༻________💮\nالمطور:حسين يعقوبي \nرابط فيسبوك المطور:https://www.facebook.com/profile.php?id=61552791186880&mibextid=ZbWKwL\n💮_________༺🖤༻________💮\n\t\t[شكرا على إختيار هيناتا البوت ☺️]\n└─────━━❖❖━━──────┘`,
            attachment: fs.createReadStream(path.join(__dirname, "cache", "join", "hello.gif"))
        }, threadID));
    } else {
        try {
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const joinPath = path.join(__dirname, "cache", "joinGif");
            const pathGif = path.join(joinPath, `${threadID}.gif`);
            let mentions = [], nameArray = [], memLength = [], i = 0;

            for (const participant of event.logMessageData.addedParticipants) {
                const userName = participant.fullName;
                const id = participant.userFbId;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
                const profilePictureUrl = `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
                const profilePicturePath = path.join(joinPath, `${id}.jpg`);
                await downloadImage(profilePictureUrl, profilePicturePath);
            }

            memLength.sort((a, b) => a - b);
            let msg = threadData.customJoin || `🌟───────💮───────🌟\n💞 مرحبا بك يا أيها العضو الجديد {name}\n┌────── ～🌺～ ──────┐\n ⚜️ مرحبا بك معنا في مجموعة {threadName}• {type} العضو رقم {soThanhVien}  في هذه المجموعة, أرجوك إستمتع! 🥳♥\n└────── ～🌺～ ──────┘\n[🍒 🎀 BOT LUNA 🎀 🍒]\n🌟───────💮───────🌟`;
            msg = msg.replace(/\{name}/g, nameArray.join(', '))
                .replace(/\{type}/g, (memLength.length > 1) ? 'أنتم' : 'أنت')
                .replace(/\{soThanhVien}/g, memLength.join(', '))
                .replace(/\{threadName}/g, threadName);

            const randomPath = fs.readdirSync(path.join(joinPath, "randomgif"));
            let formPush;
            if (fs.existsSync(pathGif)) {
                formPush = { body: msg, attachment: fs.createReadStream(pathGif), mentions };
            } else if (randomPath.length != 0) {
                const pathRandom = path.join(joinPath, "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: fs.createReadStream(pathRandom), mentions };
            } else {
                formPush = { body: msg, mentions };
            }

            return api.sendMessage(formPush, threadID);
        } catch (e) {
            console.error(e);
        }
    }
}

async function downloadImage(url, path) {
    const { createWriteStream } = require('fs');
    const axios = require('axios');
    const response = await axios({
        url,
        responseType: 'stream',
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(createWriteStream(path))
            .on('finish', () => resolve())
            .on('error', e => reject(e));
    });
			}
