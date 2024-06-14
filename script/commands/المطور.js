module.exports.config = {
    name: "المطور",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Dridi-rayen",
    description: "معلومات البوت",
    commandCategory: "〘 المجموعات 〙",
    usages: "send message",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var ZiaRein3 = (`    〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━〙
    
⦿←~❪ معلومات ❫~→⦿

⦿¦✗¦← الـإسـم: ❪ لونا /LUNA ❫
⦿¦✗¦← الإصدار: ❪ V3 ❫
⦿¦✗¦← الـنشاط: ❪ 24 / 24 ❫
⦿¦✗¦←الـبـادئـة: ❪ . ❫
⦿¦✗¦←أكتب(ي) ".اوامر" للوصول الى الاوامر

⦿←~❪ المطوريين ❫~→⦿
⦿¦✗¦← زينو ✨
- فيسبوك: facebook.com/100013384479798
-أنستا: z99_no._.dz
⦿¦✗¦← محمد 🥷🏻
-فيسبوك: facebook.com/100044725279836
-انستا:////////////////////////`);
   var ZiaRein = [
"https://i.imgur.com/5gnYXyO.gif",
    ];
    var ZiaRein2 = () => api.sendMessage({ body: ZiaRein3, attachment: fs.createReadStream(__dirname + "/cache/ZiaRein1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ZiaRein1.jpg"), event.messageID);
    return request(encodeURI(ZiaRein[Math.floor(Math.random() * ZiaRein.length)])).pipe(fs.createWriteStream(__dirname + "/cache/ZiaRein1.jpg")).on("close", () => ZiaRein2());
};
