const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "إشعار",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "TruongMini, mod by Clarence-DK",
    description: "",
    commandCategory: "المالك",
    usages: "[رسالة]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => {
    return new Promise(async (resolve) => {
        let msg = { body };
        let attachment = [];
        
        for (let eachAtm of atm) {
            await new Promise((res) => {
                try {
                    request.get(eachAtm.url)
                        .on('response', (response) => {
                            let ext = response.headers['content-type'].split('/')[1];
                            let path = `${__dirname}/cache/${eachAtm.filename}.${ext}`;
                            response
                                .pipe(fs.createWriteStream(path))
                                .on('close', () => {
                                    attachment.push(fs.createReadStream(path));
                                    atmDir.push(path);
                                    res();
                                });
                        })
                        .on('error', (e) => {
                            console.log(e);
                            res();
                        });
                } catch (e) {
                    console.log(e);
                    res();
                }
            });
        }
        
        msg.attachment = attachment;
        resolve(msg);
    });
};

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
    var gio = moment.tz("Africa/Casablanca").format("DD/MM/YYYY - HH:mm:ss");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);

    switch (handleReply.type) {
        case "sendnoti": {
            let text = `== رد المستخدم ==\n\n『الرد』 : ${body}\n\n\nإسم المستخدم: ${name} من المجموعة: ${(await Threads.getInfo(threadID)).threadName || "unknown"}`;
            if (event.attachments.length > 0) {
                let atmMsg = await getAtm(event.attachments, text);
                for (let devID of handleReply.devIDs) {
                    api.sendMessage(atmMsg, devID, (err, info) => {
                        if (err) console.log(err);
                    });
                }
                atmDir.forEach(each => fs.unlinkSync(each));
                atmDir = [];
            } else {
                for (let devID of handleReply.devIDs) {
                    api.sendMessage(text, devID, (err, info) => {
                        if (err) console.log(err);
                    });
                }
            }
            break;
        }
        case "reply": {
            let text = `إشعار من مطور ∬꫶ꪲ🥷\n\t『الرسالة 📨』 :\n╔═.✵.════════════╗\n ${body}\n╚════════════.✵.═╝\n\n\n『إسم المطور』 ${name}\n\nقم بالرد على هذه الرسالة إذا كنت تريد متابعة إرسال الرسائل إلى المطور`;
            if (event.attachments.length > 0) {
                let atmMsg = await getAtm(event.attachments, text);
                api.sendMessage(atmMsg, handleReply.threadID, (err, info) => {
                    atmDir.forEach(each => fs.unlinkSync(each));
                    atmDir = [];
                });
            } else {
                api.sendMessage(text, handleReply.threadID, (err, info) => {});
            }
            break;
        }
    }
};

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
    var gio = moment.tz("Africa/Casablanca").format("DD/MM/YYYY - HH:mm:ss");
    const { threadID, messageID, senderID, messageReply } = event;
    const developerIDs = ['100013384479798', '100044725279836']; // ضع معرفي المطورين هنا

    if (!args[0]) return api.sendMessage("أرجوك قم بإدخال رسالة", threadID);

    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `إشعار من مطور ∬꫶ꪲ🥷 \n\nالرسالة 📨: ${args.join(" ")}\n\nإسم المطور: ${await Users.getNameUser(senderID)}`;
    if (event.type == "message_reply") {
        text = await getAtm(messageReply.attachments, text);
    }

    await new Promise(resolve => {
        let sentCount = 0;
        allThread.forEach((each) => {
            api.sendMessage(text, each, (err, info) => {
                sentCount++;
                if (err) {
                    canNot++;
                } else {
                    can++;
                    global.client.handleReply.push({
                        name: module.exports.config.name,
                        type: "sendnoti",
                        messageID: info.messageID,
                        threadID: each,
                        devIDs: developerIDs // إضافة معرفي المطورين هنا
                    });
                }

                if (sentCount === allThread.length) {
                    resolve();
                }
            });
        });
    });

    api.sendMessage(`تم الإرسال إلى ${can} مجموعة, لم يتم إرساله إلى ${canNot} مجموعة`, threadID);
};
                                                                                                         
