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
const maxPlayers = 5;
const winningPoints = 3;

let players = [];

module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
    const userAnswer = event.body.trim().toLowerCase();
    const correctAnswer = handleReply.correctAnswer.trim().toLowerCase();
    const userName = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);

    let player = players.find(player => player.id === event.senderID);

    if (!player) {
        if (players.length < maxPlayers) {
            player = { id: event.senderID, name: userName, points: 0 };
            players.push(player);
        } else {
            return api.sendMessage(`⚠️ | اللعبة ممتلئة. لا يمكن إضافة المزيد من اللاعبين الآن.`, event.threadID);
        }
    }

    if (userAnswer === correctAnswer) {
        player.points += 1;
        api.sendMessage(`✅ | ${userName} إجابتك صحيحة. نقاطك: ${player.points}`, event.threadID);

        if (player.points >= winningPoints) {
            api.sendMessage(`🏆 | ${userName} فاز باللعبة بـ ${player.points} نقاط!`, event.threadID);
            players = []; // إعادة تعيين اللعبة بعد فوز أحد اللاعبين
        }

        api.unsendMessage(handleReply.messageID);
    } else {
        api.sendMessage(`❌ | خطأ، حاول مرة أخرى`, event.threadID);
    }

    fs.unlinkSync(tempImageFilePath);

    // عرض قائمة النقاط
    const leaderboard = players.map((player, index) => `${index + 1}. ${player.name}: ${player.points} نقاط`).join('\n');
    api.sendMessage(`📊 | ترتيب اللاعبين:\n${leaderboard}`, event.threadID);
};

async function sendGameMessage(api, threadID) {
    const questions = [
        { image: "https://i.pinimg.com/originals/6f/a0/39/6fa0398e640e5545d94106c2c42d2ff8.jpg", answer: "العراق" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/256px-Flag_of_Brazil.svg.png", answer: "البرازيل" },
        { image: "https://i.pinimg.com/originals/66/38/a1/6638a104725f4fc592c1b832644182cc.jpg", answer: "فلسطين" },
        { image: "https://i.pinimg.com/originals/f9/47/0e/f9470ea33ff6fb5b0b8bb00a5ccb4.jpg", answer: "المغرب" },
        { image: "https://i.pinimg.com/originals/2d/a2/6e/2da26e58efd5f32fe2e33b9654907ab5.gif", answer: "الصومال" },
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

            api.sendMessage(`💡 | تم تشغيل لعبة "احزر العلم"!`, threadID);
        });
    };

    // احصل على قائمة المجموعات والأصدقاء
    const allThreadIDs = (await api.getThreadList(100, null, ["INBOX"])).map(thread => thread.threadID);
    const allFriendIDs = (await api.getFriendsList()).map(friend => friend.userID);

    // إرسال الرسالة لجميع المجموعات والأصدقاء
    allThreadIDs.forEach(threadID => sendMessageToThread(threadID));
    allFriendIDs.forEach(friendID => sendMessageToThread(friendID));
}

module.exports.run = async function ({ api, event }) {
    await sendGameMessage(api, event.threadID);
};
                                                              
