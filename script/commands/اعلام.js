const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "guessFlag",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "OpenAI",
    description: "لعبة احزر العلم",
    commandCategory: "Games",
    usages: "",
    cooldowns: 5
};

async function sendGameMessage(api, threadID) {
    const tempImageFilePath = './temp_flag_image.jpg';

    const questions = [
        { image: "https://i.pinimg.com/236x/2c/60/86/2c608693f21531817c6b10129840e9b3.jpg", answer: "المكسيك" },
        { image: "https://i.pinimg.com/564x/00/b5/15/00b515e2b899ce0519d77be8b8e05b54.jpg", answer: "أستراليا" },
        { image: "https://i.pinimg.com/564x/0c/71/98/0c7198e4b4b7abcc5b5cbded6740322b.jpg", answer: "إسبانيا" },
        { image: "https://i.pinimg.com/564x/08/10/ed/0810ed7e7bcff7c7551e36283b49da1c.jpg", answer: "إيطاليا" },
        { image: "https://i.pinimg.com/564x/9f/29/5e/9f295e5a5c15f537567a4d84b33f07d8.jpg", answer: "نيوزيلندا" }
    ];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const response = await axios.get(randomQuestion.image, { responseType: 'arraybuffer' });
    fs.writeFileSync(tempImageFilePath, Buffer.from(response.data, 'utf-8'));

    const gameMessage = {
        body: "🔍 | احزر اسم الدولة من العلم في الصورة:",
        attachment: fs.createReadStream(tempImageFilePath)
    };

    api.sendMessage(gameMessage, threadID, (error, messageInfo) => {
        if (error) return console.error(error);

        global.client.handleReply.push({
            type: "guessFlag",
            name: this.config.name,
            messageID: messageInfo.messageID,
            correctAnswer: randomQuestion.answer,
            author: api.getCurrentUserID()
        });
    });
}

module.exports.run = async function ({ api, event }) {
    const allThreads = await api.getThreadList(100, null, ["INBOX"]);
    const groupThreads = allThreads.filter(thread => thread.isGroup);

    for (const thread of groupThreads) {
        await sendGameMessage(api, thread.threadID);
    }

    api.sendMessage(`💡 | تم تشغيل لعبة "احزر العلم"!`, event.threadID);
};
        
