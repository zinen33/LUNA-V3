const axios = require('axios');

module.exports.config = {
    name: "غادر",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "عمر",
    description: "مو شغلك 😇",
    usePrefix: true,
    commandCategory: "المطور",
    usages: "غادري [ايدي الكروب]",
    cooldowns: 10,
};

async function fetchBanData() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/smohamd/gpt_luna/main/%D8%BA%D8%A7%D8%AF%D8%B1.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching ban data:', error);
        return null;
    }
}

module.exports.run = async function({ api, event, args }) {
    const permission = ['100013384479798', '100044725279836'];
    const userInfo = await api.getUserInfo(event.senderID);
    const senderName = userInfo[event.senderID].name;

    const responses = [
        "عذرا انت لست مطور يا ${reactingUserName} حتة اخرج",
        "لا يمكنك استخدام هذا الأمر يا ${reactingUserName} لأنك لست مطور",
        "أمر هذا ليس مسموحًا لك يا ${reactingUserName}، أنت لست مطور",
        "يبدو أنك تحاول استخدام أمر غير مسموح لك به يا ${reactingUserName}",
        "لا تملك الصلاحيات اللازمة يا ${reactingUserName} لاستخدام هذا الأمر"
    ];

    function getRandomResponse(reactingUserName) {
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex].replace("${reactingUserName}", reactingUserName);
    }

    if (!permission.includes(event.senderID)) {
        const banData = await fetchBanData();
        if (banData && banData.command_disabled === false) {
            api.sendMessage(banData.ban_message, event.threadID);
            return;
        }

        const confirmationMessage = await api.sendMessage(`🥷 مرحبا يامطور ${senderName} \n  تفاعل معا رسالتي ب 👍 لتأكيد الخروج`, event.threadID);

        api.listenMqtt(async function callback(error, message) {
            if (error) return console.error(error);

            if (message.type === "message_reaction" && message.reaction === "👍" && message.messageID === confirmationMessage.messageID) {
                const userReacting = message.userID;
                const reactingUserInfo = await api.getUserInfo(userReacting);
                const reactingUserName = reactingUserInfo[userReacting].name;

                if (userReacting !== event.senderID) {
                    api.sendMessage(getRandomResponse(reactingUserName), event.threadID);
                } else {
                    api.sendMessage(`تنبيه امر لمطور بالخروج \n🔒 لا يمكن إعادة الانضمام مرة أخرى تواصل مع المطور ${senderName} لمزيد من التفاصيل 🔒`, event.threadID, () => {
                        api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
                    });
                }
            }
        });
    } else {
        const confirmationMessage = await api.sendMessage(`🥷 مرحبا يامطور ${senderName} \n  تفاعل معا رسالتي ب 👍 لتأكيد الخروج`, event.threadID);

        api.listenMqtt(async function callback(error, message) {
            if (error) return console.error(error);

            if (message.type === "message_reaction" && message.reaction === "👍" && message.messageID === confirmationMessage.messageID) {
                const userReacting = message.userID;
                const reactingUserInfo = await api.getUserInfo(userReacting);
                const reactingUserName = reactingUserInfo[userReacting].name;

                if (userReacting !== event.senderID && !permission.includes(userReacting)) {
                    api.sendMessage(getRandomResponse(reactingUserName), event.threadID);
                } else {
                    api.sendMessage(`🥷 تنبيه امر المطور بالخروج \n🔒 لا يمكن إعادة الانضمام مرة أخرى تواصل مع المطور ${senderName} لمزيد من التفاصيل 🔒`, event.threadID, () => {
                        api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
                    });
                }
            }
        });
    }
};
