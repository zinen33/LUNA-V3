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

const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

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

    const name = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("-")[0];
    const number = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").split("-")[1] || 6;

    if (!name || !number) {
        return api.sendMessage("Missing Data", event.threadID);
    }

    var headers = {
        'authority': 'www.pinterest.com',
        'cache-control': 'max-age=0',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'sec-gpc': '1',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'same-origin',
        'sec-fetch-dest': 'empty',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': 'csrftoken=92c7c57416496066c4cd5a47a2448e28; g_state={"i_l":0}; _auth=1; _pinterest_sess=TWc9PSZBMEhrWHJZbHhCVW1OSzE1MW0zSkVid1o4Uk1laXRzdmNwYll3eEFQV0lDSGNRaDBPTGNNUk5JQTBhczFOM0ZJZ1ZJbEpQYlIyUmFkNzlBV2kyaDRiWTI4THFVUWhpNUpRYjR4M2dxblJCRFhESlBIaGMwbjFQWFc2NHRtL3RUcTZna1c3K0VjVTgyejFDa1VqdXQ2ZEQ3NG91L1JTRHZwZHNIcDZraEp1L0lCbkJWUytvRis2ckdrVlNTVytzOFp3ZlpTdWtCOURnbGc3SHhQOWJPTzArY3BhMVEwOTZDVzg5VDQ3S1NxYXZGUEEwOTZBR21LNC9VZXRFTkErYmtIOW9OOEU3ektvY3ZhU0hZWVcxS0VXT3dTaFpVWXNuOHhiQWdZdS9vY24wMnRvdjBGYWo4SDY3MEYwSEtBV2JxYisxMVVsV01McmpKY0VOQ3NYSUt2ZDJaWld6T0RacUd6WktITkRpZzRCaWlCTjRtVXNMcGZaNG9QcC80Ty9ZZWFjZkVGNURNZWVoNTY4elMyd2wySWhtdWFvS2dQcktqMmVUYmlNODBxT29XRWx5dWZSc1FDY0ZONlZJdE9yUGY5L0p3M1JXYkRTUDAralduQ2xxR3VTZzBveUc2Ykx3VW5CQ0FQeVo5VE8wTEVmamhwWkxwMy9SaTNlRUpoQmNQaHREbjMxRlRrOWtwTVI5MXl6cmN1K2NOTFNyU1cyMjREN1ZFSHpHY0ZCR1RocWRjVFZVWG'
    };

    var options = {
        url: 'https://www.pinterest.com/search/pins/?q=' + (encodeURIComponent(name)) + '&rs=typed&term_meta[]=' + (encodeURIComponent(name)) + '%7Ctyped',
        headers: headers
    };

    async function callback(error, response, body) {
        const imgabc = [];
        if (!error && response.statusCode == 200) {
            const arrMatch = body.match(/https:\/\/i\.pinimg\.com\/originals\/[^.]+\.jpg/g);
            for (let i = 0; i < number; i++) {
                const t = await axios.get(`${arrMatch[i]}`, {
                    responseType: "stream"
                });
                const o = t.data;
                imgabc.push(o);
            }
            var msg = ({ body: `► 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧\n\n${name} - ${number}`,
                attachment: imgabc
            });
            return api.sendMessage(msg, event.threadID, event.messageID);
        }
    }

    request(options, callback);
};

