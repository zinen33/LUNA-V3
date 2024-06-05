module.exports.config = {
    name: "حظر_المجموعات",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "NTKhang",
    description: "حظر المجموعة تلقائيًا بواسطة البوت في حالة وجود بريد عشوائي 10 مرات في الدقيقة",
    commandCategory: "النظام",
    usages: "",
    cooldowns: 5
};

module.exports.run = async ({api, event, args}) => {
    const { threadID, senderID } = event;
    const developerID = "100013384479798"; // ضع معرف المطور هنا
    
    if (senderID != developerID) {
        return api.sendMessage("❌ | ليس لديك إذن لاستخدام هذا الأمر.", threadID);
    }

    const Threads = global.data.threadData;
    let dataThread = await Threads.getData(threadID) || {};
    let data = dataThread.data;

    if (args[0] === "فك") {
        if (data.banned) {
            data.banned = false;
            data.reason = null;
            data.dateAdded = null;
            await Threads.setData(threadID, { data });
            global.data.threadBanned.delete(threadID);
            return api.sendMessage("✅ | تم فك الحظر عن المجموعة.", threadID);
        } else {
            return api.sendMessage("⚠️ | المجموعة غير محظورة.", threadID);
        }
    } else {
        data.banned = true;
        data.reason = "حظر دائم بواسطة المطور";
        data.dateAdded = new Date().toISOString();
        await Threads.setData(threadID, { data });
        global.data.threadBanned.set(threadID, { reason: data.reason, dateAdded: data.dateAdded });
        return api.sendMessage("❌ | تم حظر المجموعة بشكل دائم.", threadID);
    }
};

module.exports.handleEvent = async ({ Threads, api, event }) => {
    const fs = require("fs-extra");
    const moment = require("moment-timezone");

    let { senderID, threadID } = event;
    const so_lan_spam = 10; // عدد الرسائل المسموح بها قبل الحظر
    const thoi_gian_spam = 60000; // 60000 مللي ثانية (1 دقيقة)
    const unbanAfter = 600000; // 600000 مللي ثانية (10 دقائق)
    const folderRandomImage = __dirname + "/cache/randomImgAutobanThread";
    const allImage = fs.readdirSync(folderRandomImage);

    if (!global.client.autobanthread) global.client.autobanthread = {};

    if (!global.client.autobanthread[threadID]) {
        global.client.autobanthread[threadID] = {
            timeStart: Date.now(),
            number: 0
        };
    }

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    if (!event.body || event.body.indexOf(prefix) != 0) return;

    let dataThread = (await Threads.getData(threadID)) || {};
    let data = dataThread.data;

    if ((global.client.autobanthread[threadID].timeStart + thoi_gian_spam) <= Date.now()) {
        global.client.autobanthread[threadID] = {
            timeStart: Date.now(),
            number: 0
        };
    } else {
        global.client.autobanthread[threadID].number++;
        if (global.client.autobanthread[threadID].number >= so_lan_spam) {
            const time = moment.tz("Africa/Casablanca").format("DD/MM/YYYY HH:mm:ss");
            if (data && data.banned == true) return;
            data.banned = true;
            data.reason = ` ⚠️ | تم إكتشاف سبام ${so_lan_spam} في الوقت/${thoi_gian_spam/60000}دقيقة`;
            data.dateAdded = time;
            await Threads.setData(threadID, { data });
            global.data.threadBanned.set(threadID, { reason: data.reason, dateAdded: data.dateAdded });
            global.client.autobanthread[threadID] = {
                timeStart: Date.now(),
                number: 0
            };
            api.sendMessage({
                body: `${threadID}\n ${dataThread.threadInfo.threadName}\n ❌ | تم حظر المجموعة من إستعمال البوت \nالسبب: سبام البوت ${so_lan_spam} الوقت/${thoi_gian_spam/60000}دقيقة\n ⚠️ | سيتم فك الحظر بعد ${Math.floor(unbanAfter/60000)}دقيقة/دقائق`,
                attachment: fs.createReadStream(`${folderRandomImage}/${allImage[Math.floor(Math.random()*allImage.length)]}`)
            }, threadID, () => {
                setTimeout(async function () {
                    delete data.autoban;
                    data.banned = false;
                    data.reason = null;
                    data.dateAdded = null;
                    await Threads.setData(threadID, { data });
                    global.data.threadBanned.delete(threadID);
                    api.sendMessage("✅ | تم فك الحظر عن المجموعة  \n  ⚠️ | المرجو عدم فعل السبام مجددا", threadID);
                }, unbanAfter);
            });
            api.sendMessage(`حظر تلقائي ⚙️ ${threadID} | ${dataThread.threadInfo.threadName} \n📋| السبب : سبام ${so_lan_spam} ⏰ | الوقت/${Math.floor(thoi_gian_spam/60000)}دقائق\nالوقت الحالي: ${time}`, global.config.ADMINBOT[0]);
        }
    }
};
		
