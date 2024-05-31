module.exports.config = {
    name: "log",
    eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
    version: "1.0.0",
    credits: "𝐊𝐈𝐓𝐄 凧",
    description: "Record bot activity notifications and manage bans!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function ({ api, event, Users, Threads, args }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    let botID = api.getCurrentUserID();
    var allThreadID = global.data.allThreadID;

    if (args.length > 0) {
        if (args[0] === "unban") {
            const threadID = args[1];
            if (!threadID) return api.sendMessage("يرجى تقديم معرف المجموعة.", event.threadID);
            const data = (await Threads.getData(threadID)).data || {};
            data.banned = false;
            data.reason = null;
            data.dateAdded = null;
            await Threads.setData(threadID, { data });
            global.data.threadBanned.delete(threadID);
            return api.sendMessage(`تم إلغاء حظر المجموعة بالمعرف ${threadID}.`, event.threadID);
        }

        if (args[0] === "ban") {
            const threadID = args[1];
            if (!threadID) return api.sendMessage("يرجى تقديم معرف المجموعة.", event.threadID);
            const time = new Date().toLocaleString("africa/morocco");
            const data = (await Threads.getData(threadID)).data || {};
            data.banned = true;
            data.reason = "تم حظر هذه المجموعة.";
            data.dateAdded = time;
            await Threads.setData(threadID, { data });
            global.data.threadBanned.set(threadID, { reason: data.reason, dateAdded: data.dateAdded });
            return api.sendMessage(`تم حظر المجموعة بالمعرف ${threadID}.`, event.threadID);
        }
    }

    for (const singleThread of allThreadID) {
        const thread = global.data.threadData.get(singleThread) || {};
        if (typeof thread["log"] != "undefined" && thread["log"] == false) return;
    }

    const moment = require("moment-timezone");
    const time = moment.tz("africa/morocco").format("D/MM/YYYY HH:mm:ss");
    let nameThread = global.data.threadInfo.get(event.threadID).threadName || "Name does not exist"; 
    let threadInfo = await api.getThreadInfo(event.threadID);
    nameThread = threadInfo.threadName;
    const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);

    var formReport = "[⚜️] إشعار هام [⚜️]" +
        "\n\n[⚜️] إسم المجموعة: " + nameThread +
        "\n[⚜️] ID المجموعة: " + event.threadID +
        "\n[⚜️] الفعل: {task}" +
        "\n[⚜️] اسم المستخدم: " + nameUser +
        "\n[⚜️] ID المستخدم: " + event.author +
        "\n\n[⚜️] الوقت: " + time + "",
        task = "";

    switch (event.logMessageType) {
        case "log:thread-name": {
            newName = event.logMessageData.name || "Name does not exist";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == botID)) task = "[⚜️] هذا المستخدم اضاف البوت لمجموعة جديدة";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId == botID) {
                if(event.senderID == botID) return;
                const data = (await Threads.getData(event.threadID)).data || {};
                data.banned = true;
                var reason = "[⚜️] استخدم البوت بشكل مكثف دون اذن 🚫";
                data.reason = reason || null;
                data.dateAdded = time;
                await Threads.setData(event.threadID, { data });
                global.data.threadBanned.set(event.threadID, { reason: data.reason, dateAdded: data.dateAdded });

                task = "[⚜️] المستخدم قام بطرد البوت من المجموعة"
            }
            break;
        }
        default:
            break;
    }

    if (task.length == 0) return;

    formReport = formReport.replace(/\{task}/g, task);

    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger(formReport, "Logging Event");
    });
};
                
