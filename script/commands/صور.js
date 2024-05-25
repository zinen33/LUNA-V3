const axios = require("axios");
const request = require("request");

module.exports.config = {
    name: "صور",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "meow",
    description: "Pinterest search",
    commandCategory: "tools",
    usages: "pin text - number",
    cooldowns: 0
};

const userUsageCount = new Map();
const blockedUsers = new Set();

module.exports.run = async function({ api, event, args }) {
    const userID = event.senderID;

    // Check if user is blocked
    if (blockedUsers.has(userID)) {
        return;
    }

    // Get user name
    const userInfo = await api.getUserInfo(userID);
    const userName = userInfo[userID].name;

    // Check user's command usage count
    if (!userUsageCount.has(userID)) {
        userUsageCount.set(userID, 0);
    }

    const usageCount = userUsageCount.get(userID);

    if (usageCount >= 3) { 
        let message = ` تبا لك ألا تفهم لا يمكنك استخدام الأمر أكثر من ثلاث مرات ${userName}، أنت حقاً مزعج ❌`;
        if (usageCount === 3) { 
            message = `عذراً، يا ${userName}، لا يمكنك استخدام الأمر أكثر من ثلاث مرات`;
            userUsageCount.set(userID, usageCount + 1);
        } else {
            blockedUsers.add(userID);
            setTimeout(() => {
                blockedUsers.delete(userID);
            }, 50000); // 50 ثانية
        }
        return api.sendMessage(message, event.threadID);
    }

    userUsageCount.set(userID, usageCount + 1);

    const name = args.join(" ").trim().split("-")[0];
    const number = parseInt(args.join(" ").trim().split("-")[1], 10) || 6;

    if (!name) {
        return api.sendMessage("Missing Data", event.threadID);
    }

    const options = {
        url: 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(name) + '&rs=typed&term_meta[]=' + encodeURIComponent(name) + '%7Ctyped',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        }
    };

    request(options, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const arrMatch = body.match(/https:\/\/i\.pinimg\.com\/originals\/[^.]+\.jpg/g);
            if (!arrMatch || arrMatch.length === 0) {
                return api.sendMessage("لم أتمكن من العثور على الصور المطلوبة", event.threadID);
            }

            const imgabc = [];
            for (let i = 0; i < Math.min(number, arrMatch.length); i++) {
                try {
                    const imgStream = await axios.get(arrMatch[i], { responseType: "stream" });
                    imgabc.push(imgStream.data);
                } catch (err) {
                    console.error(`Failed to fetch image ${arrMatch[i]}: ${err}`);
                }
            }

            if (imgabc.length > 0) {
                const msg = {
                    body: `► 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧\n\n${name} - ${number}`,
                    attachment: imgabc
                };
                api.sendMessage(msg, event.threadID, event.messageID);
            } else {
                api.sendMessage("لم أتمكن من جلب الصور المطلوبة. حاول مرة أخرى.", event.threadID, event.messageID);
            }
        } else {
            console.error(`Failed to fetch Pinterest search results: ${error}`);
            api.sendMessage("حدث خطأ أثناء محاولة البحث عن الصور.", event.threadID, event.messageID);
        }
    });
};
