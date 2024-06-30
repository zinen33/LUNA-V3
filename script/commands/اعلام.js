module.exports.config = {
    name: "اعلام",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "عمر",
    description: "لعبة احزر العلم",
    usages: ["لعبة"],
    commandCategory: "العاب",
    cooldowns: 0
};

const fs = require('fs');
const axios = require('axios');
const tempImageFilePath = __dirname + "/cache/tempImage.jpg";

module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
    const userAnswer = event.body.trim().toLowerCase();
    const correctAnswer = handleReply.correctAnswer.toLowerCase();
    const userName = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);

    if (userAnswer === correctAnswer) {
        Currencies.increaseMoney(event.senderID, 1);  // تأكد من وضع قيمة المكافأة هنا
        api.sendMessage(`✅ | ${userName} إجابتك صحيحة`, event.threadID);

        api.unsendMessage(handleReply.messageID);
    } else {
        api.sendMessage(`خطأ، حاول مرة أخرى`, event.threadID);
    }

    fs.unlinkSync(tempImageFilePath);
};

async function sendGameMessage(api, threadID) {
    const questions = [
        { image: "https://i.pinimg.com/originals/6f/a0/39/6fa0398e640e5545d94106c2c42d2ff8.jpg", answer: "العراق" },
        // أضف باقي الأسئلة هنا...
    ];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const response = await axios.get(randomQuestion.image, { responseType: 'arraybuffer' });
    fs.writeFileSync(tempImageFilePath, Buffer.from(response.data, 'utf-8'));

    const gameMessage = {
        body: "🔍 | احزر اسم الدولة من العلم في الصورة:",
        attachment: fs.createReadStream(tempImageFilePath)
    };

    const sendMessageToThread = (threadID) => {
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
    };

    // احصل على قائمة المجموعات والأصدقاء
    const allThreadIDs = (await api.getThreadList(100, null, ["INBOX"])).map(thread => thread.threadID);
    const allFriendIDs = (await api.getFriendsList()).map(friend => friend.userID);

    // إرسال الرسالة لجميع المجموعات والأصدقاء
    allThreadIDs.forEach(threadID => sendMessageToThread(threadID));
    allFriendIDs.forEach(friendID => sendMessageToThread(friendID));

    api.sendMessage(`💡 | تم تشغيل لعبة "احزر العلم"!`, threadID); // إشعار عند تشغيل اللعبة للمجموعة الحالية
}

module.exports.run = async function ({ api, event }) {
    await sendGameMessage(api, event.threadID);
};
        
