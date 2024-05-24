const axios = require('axios');

const userUsageCount = new Map();
const blockedUsers = new Set();

async function fetchBanData() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/smohamd/gpt_luna/main/GPT_BAN.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching ban data:', error);
        return null;
    }
}

module.exports.config = {
    name: "لونا",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Api by jerome",
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "خدمات",
    cooldowns: 1,
};

module.exports.run = async function ({ api, event, args }) {
    const userID = event.senderID;

    // Check if user is blocked
    if (blockedUsers.has(userID)) {
        return;
    }

    // Get user name
    const userInfo = await api.getUserInfo(userID);
    const userName = userInfo[userID].name;

    // Check user's command usage count
    if (!userUsageCount.has(userID)) {
        userUsageCount.set(userID, 0);
    }

    const usageCount = userUsageCount.get(userID);
    
    if (usageCount >= 3) { 
        let message = `تبا لك ألا تفهم لا يمكنك استخدام الأمر أكثر من ثلاث مرات ${userName}، أنت حقاً مزعج ❌`;
        if (usageCount === 3) { 
            message = `عذراً، يا ${userName}، لا يمكنك استخدام الأمر أكثر من ثلاث مرات`;
            userUsageCount.set(userID, usageCount + 1);
        } else {
            blockedUsers.add(userID);
            setTimeout(() => {
                blockedUsers.delete(userID);
            }, 50000); // 50 ثانية
        }
        return api.sendMessage(message, event.threadID);
    }
    
    userUsageCount.set(userID, usageCount + 1);

    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('مرحبا كيف يمكنني مساعدتك ؟🙆🏻‍♀️', event.threadID, messageID);
        }
        
        const banData = await fetchBanData();
        
        if (banData && banData.command_disabled === false) {
            return api.sendMessage(banData.ban_message, event.threadID, messageID);
        }

        // Check for custom responses
        const customResponses = {
            "لونا من قام بصنعك؟": "زينو و محمد"
            // يمكنك إضافة المزيد من الردود هنا بناءً على الحاجة
        };

        if (prompt in customResponses) {
            return api.sendMessage(customResponses[prompt], event.threadID, messageID);
        }

        await new Promise(resolve => setTimeout(resolve, 2000)); 
        const { data: matrixData } = await axios.get('https://raw.githubusercontent.com/smohamd/gpt_luna/main/GPT_LUNA.json%E2%80%8F');
        let responseFromMatrix = null;

        for (const key in matrixData) {
            const matrixWords = key.split(' ');
            const promptWords = prompt.split(' ');
            const intersection = matrixWords.filter(word => promptWords.includes(word));
            if (intersection.length === matrixWords.length) {
                responseFromMatrix = matrixData[key];
                break;
            }
        }

        if (responseFromMatrix) {
            api.sendMessage(responseFromMatrix, event.threadID, messageID);
        } else {
            const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-3.5-turbo-16k-0613`;
            const response = await axios.get(gpt4_api);

            if (response.data && response.data.response) {
                const generatedText = response.data.response;
                api.sendMessage(`➪ 𝗚𝗣𝗧 𝗟𝗨𝗡𝗔 𝗩 𝟵   🌟
━━━━━━━━━━━━━━━━━━━━━
${generatedText}
━━━━━━━━━━━━━━━━━━━━━
     ZINO X MOHAMED`, event.threadID, messageID);
            } else {
                console.error('API response did not contain expected data:', response.data);
                api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
