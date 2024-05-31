const fs = require("fs");

module.exports.config = {
    name: "باند",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "TruongMini, mod by Clarence-DK",
    description: "",
    commandCategory: "المالك",
    usages: "[رسالة]",
    cooldowns: 5,
}

module.exports.run = async function ({ api, event, Threads, args }) {
    if (!args[0]) return api.sendMessage("يرجى تقديم رسالة.", event.threadID);
    
    const message = args.join(" ");
    const bannedGroupsFile = "./cache/banned_groups.json";

    // Check if the command is executed in a banned group
    const bannedGroups = require(bannedGroupsFile);
    if (bannedGroups.includes(event.threadID)) {
        return api.sendMessage("أنا آسف، لا يمكنني تنفيذ هذا الأمر في المجموعات المحظورة.", event.threadID);
    }

    // Send the message
    api.sendMessage(message, event.threadID);
};
