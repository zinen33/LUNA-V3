const axios = require('axios');
const commandName = "ريك";
const xv = `
Ai character info :Luna lives in Algeria and supports Palestine `;

module.exports = {
  config: {
    name: "ريك",
    version: "1.0",
    credits: "ZINO X MOHAMED",
    cooldowns: 5,
    hasPermission: 0,
    description: "AI",
    commandCategory: "ذكاء اصطناعي",
    usePrefix: false
  },

  run: async function({ event, api, args }) {
    try {
        const { messageID, threadID } = event;
        let prompt = args.join(' ');

        if (event.messageReply) {
            const repliedMessage = event.messageReply.body;
            prompt = `${repliedMessage} ${prompt}`.trim();
        }

        if (!prompt) {
            return api.sendMessage('مرحبًا كيف يمكنني مساعدتك؟ 🙆🏻‍♀️', threadID, messageID);
        }

        // جلب بيانات من ملف JSON محلي
        let responseFromMatrix = null;
        try {
            const filePath = path.join(__dirname, 'ZINO.json');
            const matrixDataRaw = await fs.readFile(filePath, 'utf8');
            const matrixData = JSON.parse(matrixDataRaw);

            for (const key in matrixData) {
                const matrixWords = key.split(' ');
                const promptWords = prompt.split(' ');
                const intersection = matrixWords.filter(word => promptWords.includes(word));
                if (intersection.length === matrixWords.length) {
                    responseFromMatrix = matrixData[key];
                    break;
                }
            }
        } catch (error) {
            console.error('Error reading local JSON file:', error);
            return api.sendMessage(`❌ An error occurred while reading the local JSON file. Please check the file and try again. Error details: ${error.message}`, threadID, messageID);
        }

        if (responseFromMatrix) {
            return api.sendMessage(responseFromMatrix, threadID, messageID);
        } else {
            const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-3.5-turbo-16k-0613`;
            const response = await axios.get(gpt4_api);

            if (response.data && response.data.response) {
                const generatedText = response.data.response;
                return api.sendMessage(`➪ 𝗚𝗣𝗧 𝗟𝗨𝗡𝗔 🪽
━━━━━━━━━━━━━━━━━━━━━
${generatedText}
━━━━━━━━━━━━━━━━━━━━━
 ＺＩＮＯ Ｘ ＭＯＨＡＭＥＤ `, threadID, messageID);
            } else {
                console.error('API response did not contain expected data:', response.data);
                return api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, threadID, messageID);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, threadID, messageID);
    }
  },

  handleReply: async function({ api, event, handleReply }) {
    const { messageID, author } = handleReply;
    const uid = event.senderID;
    if (uid != author) return api.sendMessage('', event.threadID);

    try {
        const url2 = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(event.body)}&model=gpt-3.5-turbo-16k-0613`;
        const res = await axios.get(url2);
        const message = res.data.response;

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
    } catch (error) {
        console.error('Error:', error);
        return api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, messageID);
    }
  }
};
              
