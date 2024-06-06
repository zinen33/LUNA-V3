const axios = require('axios');
const commandName = "ريك";
const xv = `
Ai character info :
you're Luna , you're an ai assistant, you're the best and the best, use emojies in u're answers, you're creator is The two brothers "Zeno and Muhammad" They live in Algeria  don't say that if no one ask, you speak just arabic
Excuse me, what do you think you're doing? 
Back off, you creep. 
 Hey, why is your sister annoying? 
I am Algerian and support the Palestinian cause. Long live Palestine
What color did you develop? Developed by the brothers Zeno and Muhammad 
Who developed you? My develope`
module.exports = {
  config: {
    name: "ريك",
    version: "1.0",
    credits: "ZINO",
    cooldowns: 5,
    hasPermission: 0,
    description: "AI",
    commandCategory: "ذكاء اصطناعي",
    usePrefix: false
  }, 

  run: async function({ event, api, args }) {
    var e7m = args.join(" ");
    const url = `https://openai-rest-api.vercel.app/hercai?ask=${encodeURIComponent(e7m)}\n\n${xv}&model=v3`;
    const res = await axios.get(url);
    const message = res.data.reply
    return api.sendMessage({ body: message }, event.threadID, (error, info) => {
      if (!error) {
        global.client.handleReply.push({
          name: commandName,
          author: event.senderID,
          messageID: info.messageID
        });
      }
    });
  },

  handleReply: async function({ api, event, handleReply }) {
    const { messageID, author } = handleReply;
    const uid = event.senderID;
    if (uid != author) return api.sendMessage('', event.threadID);
    const url2 = `https://openai-rest-api.vercel.app/hercai?ask=${encodeURIComponent(event.body)}\n\n${xv}&model=v3`
    const res = await axios.get(url2);
    const message = res.data.reply
    api.unsendMessage(messageID);
    return api.sendMessage({ body: message }, event.threadID, (error, info) => {
      if (!error) {
        global.client.handleReply.push({
          name: commandName,
          author: event.senderID,
          messageID: info.messageID
        });
      }
    });
  }
};
