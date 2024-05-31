const axios = require("axios");

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
    if ("message_reply" != event.type || event.messageReply.attachments.length <= 0) {
      return api.sendMessage("[✨]➜ رد على صورة او مقطع", event.threadID, event.messageID);
    }
    
    const links = [];
    for (let { url } of event.messageReply.attachments) {
      try {
        const link = await this.uploadImage(url);
        links.push(link);
      } catch (err) {
        console.log(err);
      }
    }

    return api.sendMessage(links.join("\n"), event.threadID, event.messageID);
  }
}

module.exports = new Modules();
