const axios = require("axios");
const moment = require("moment-timezone");

class Imgur {
  constructor() {
    this.clientId = "fc9369e9aea767c";
    this.client = axios.create({
      baseURL: "https://api.imgur.com/3/",
      headers: {
        Authorization: `Client-ID ${this.clientId}`
      }
    });
  }

  async uploadImage(url) {
    return (await this.client.post("image", {
      image: url
    })).data.data.link;
  }
}

class Modules extends Imgur {
  constructor() {
    super();
  }

get config() {
    return {
      name: "رفع",
      version: "1.0.0",
      hasPermssion: 0,
      credits: "🥷MOHAMED🇦🇱X🇦🇱ZINO🥷",
      usePrefix: false,
      description: "تحويل صورة الى رابط",
      commandCategory: "خدمات",
      usages: "رد على صورة",
      cooldowns: 5
    };
  } 

  run = async ({ api, event }) => {
    const startTime = Date.now(); 

    var array = [];
    if ("message_reply" != event.type || event.messageReply.attachments.length < 0) return api.sendMessage("[✨]➜ رد على صورة او مقطع", event.threadID, event.messageID);
    for (let { url } of event.messageReply.attachments) await this.uploadImage(url).then((res => array.push(res))).catch((err => console.log(err)));
    
    const userInfo = await api.getUserInfo(event.senderID);
    const userName = userInfo[event.senderID].name;

    const endTime = Date.now(); 
    const mohamed = (endTime - startTime) / 1000; 
    
    const mohamed1 = moment.tz("Africa/Algiers").format("YYYY-MM-DD HH:mm:ss");

    return api.sendMessage(`${array.join("\n")}`, event.threadID, event.messageID);
  }
}

module.exports = new Modules();
