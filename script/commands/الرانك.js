module.exports.config = {
	name: "الرانك",
	version: "7.3.1",
	hasPermssion: 1,
	credits: "MrTomXxX",
	description: "إشعار بتطور مستوى نشاط الأعضاء",
	commandCategory: "النظام",
	dependencies: {
		"fs-extra": ""
	},
	cooldowns: 2,
};

module.exports.handleEvent = async function({ api, event, Currencies, Users, getText }) {
	var {threadID, senderID } = event;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { loadImage, createCanvas } = require("canvas");
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + "/noprefix/rankup/rankup.png";
  let pathAvt1 = __dirname + "/cache/Avtmot.png";
  var id1 = event.senderID;
  

	threadID = String(threadID);
	senderID = String(senderID);

	const thread = global.data.threadData.get(threadID) || {};

	let exp = (await Currencies.getData(senderID)).exp;
	exp = exp += 1;

	if (isNaN(exp)) return;

	if (typeof thread["rankup"] != "undefined" && thread["rankup"] == false) {
		await Currencies.setData(senderID, { exp });
		return;
	};

	const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
	const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

	if (level > curLevel && level != 1) {
		const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);
		var messsage = (typeof thread.customRankup == "undefined") ? msg = getText("levelup") : msg = thread.customRankup, 
			arrayContent;

		messsage = messsage
			.replace(/\{name}/g, name)
			.replace(/\{level}/g, level);

		const moduleName = this.config.name;

    var background = [
  "https://imgur.com/4B5nncg.jpeg"
  ];
    var rd = background[Math.floor(Math.random() * background.length)];
    let getAvtmot = (
    await axios.get(
      `https://graph.facebook.com/${id1}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
      { responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));
  
  let getbackground = (
    await axios.get(`${rd}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));
  
    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(pathAvt1);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.rotate(-25 * Math.PI / 180);
    ctx.drawImage(baseAvt1, 32, 120, 131, 131);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);
		api.sendMessage({body: messsage, mentions: [{ tag: name, id: senderID }], attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg));
    
}

	await Currencies.setData(senderID, { exp });
	return;
}

module.exports.languages = {
	"vi": {
		"off": "𝗧𝗮̆́𝘁",
		"on": "𝗕𝗮̣̂𝘁",
		"successText": "𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐭𝐡𝐨̂𝐧𝐠 𝐛𝐚́𝐨 𝐫𝐚𝐧𝐤𝐮𝐩 ✨",
		"levelup": "🌸 𝗞𝗶̃ 𝗻𝗮̆𝗻𝗴 𝘅𝗮̣𝗼 𝗹𝗼̂̀𝗻𝗻 𝗼̛̉ 𝗺𝗼̂𝗻 𝗽𝗵𝗮́𝗽 𝗵𝗮̂́𝗽 𝗱𝗶𝗲̂𝗺 𝗰𝘂̉𝗮 {name} 𝘃𝘂̛̀𝗮 𝗹𝗲̂𝗻 𝘁𝗼̛́𝗶 𝗹𝗲𝘃𝗲𝗹 {level} 🌸"
	},
	"en": {
    "on": "تم تشغيل",
    "off": "تم إطفاء",
    "successText": "تطورات إشعار المستوى بنجاح تام ✅",
    "levelup": " 🌸▬▬▬▬๑۩💮۩๑▬▬▬🌸\n\t|إࡅ࠭ߺࡅ𐫥ߺߺࡅٜߺוܤߺ⚠️|\nܩߺࡅٜߺ𐬠𐬛ܭ ࡅ࡙ߺו ✨{name}✨، ܩߺܚࡅߺࡅ𐫥ߺߺ𐬛 וܭ ܦ߳ߺݏࡉ إ𐬠ࡅ𐫥ߺܦ࠭ߺ𐭦ߺ ࡋߺࡅ𐫥ߺߺ𐬛 𐬛 ࡅ𐫥ߺߺܩߺࡅ𐫥ߺߺ ࡅ𐫥ߺߺ𐬠ܦ߳ߺࡅ࡙ߺࡅ𐫥ߺߺܭ إࡋߺى ܩߺܚࡅߺࡅ𐫥ߺߺ𐬛ى  {level}.\n🌸▬▬▬▬๑۩💮۩๑▬▬▬▬🌸",
	}
}

module.exports.run = async function({ api, event, Threads, getText }) {
	const { threadID, messageID } = event;
	let data = (await Threads.getData(threadID)).data;
  
	if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
	else data["rankup"] = false;
	
	await Threads.setData(threadID, { data });
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
             }
