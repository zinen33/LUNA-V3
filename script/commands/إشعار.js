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

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Africa/Casablanca").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `== رد المستخدم ==\n\n『الرد』 : ${body}\n\n\n إسم المستخدم ${name}  من المجموعة ${(await Threads.getInfo(threadID)).threadName || "unknown"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `== رد من المستخدم ==\n\n『الرد』 : ${body}\n\n\nإسم المستخدم: ${name} من المجموعة ${(await Threads.getInfo(threadID)).threadName || "unknown"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `إشعار ∬꫶ꪲ🥷✨ \n\t『الرسالة 📨』 :\n┏━━━━━━━━━━━━━━━━━━┓\n ${body}\n┗━━━━━━━━━━━━━━━━━━┛\n\n\n『إسم المطور』 ${name}\n\nقم بالرد على هذه الرسالة إذا كنت تريد متابعة إرسال الرسائل إلى المطور`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments,  ` إشعار ∬꫶ꪲ🥷✨ \n\t『الرسالة 📨  :\n┏━━━━━━━━━━━━━━━━━━┓\n ${body}\n┗━━━━━━━━━━━━━━━━━━┛\n\n\n『إسم المطور』 ${name}\n\nقم بالرد على هذه الرسالة إذا كنت تريد متابعة إرسال الرسائل إلى المطور`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Aftica/Casablanca").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("أرجوك قم بإدخال رسالة", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `إشعار ∬꫶ꪲ🥷✨ \n\nالرسالة 📨:  ${args.join(" ")}\n\nإسم المطور: ${await Users.getNameUser(senderID)} `;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `إشعار  ∬꫶ꪲ🥷✨\n\nالرسالة 📨:  ${args.join(" ")}\n\nإسم المطور: ${await Users.getNameUser(senderID)}`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`تم الإرسال إلى ${can} مجموعة, لم يتم إرساله إلى ${canNot} مجموعة`, threadID);
      
