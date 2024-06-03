const axios = require('axios');

module.exports.config = {
    name: "لونا",
    version: "1.0.0",
    hasPermission: 0,
    credits: "ZINO X MOHAMED",
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "خدمات",
    cooldowns: 1,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, threadID } = event;

        // تحقق من وجود الحقل credits ومن قيمته
        if (!module.exports.config.hasOwnProperty('credits') || module.exports.config.credits !== "ZINO X MOHAMED") {
            return api.sendMessage('عذرا، لن يعمل الأمر حتى ترجع اسم ZINO X MOHAMED في credits.', threadID, messageID);
        }

        let prompt = args.join(' ');

        // إذا كانت هناك رسالة مرد عليها، أضفها إلى النص المدخل
        if (event.messageReply) {
            const repliedMessage = event.messageReply.body;
            prompt = `${repliedMessage} ${prompt}`.trim();
        }

        // إذا لم يكن هناك نص مدخل أو رد على رسالة، أرسل رسالة ترحيبية
        if (!prompt) {
            return api.sendMessage('مرحبًا كيف يمكنني مساعدتك؟ 🙆🏻‍♀️', threadID, messageID);
        }

        // جلب بيانات من ملف JSON
        const { data: matrixData } = await axios.get('https://raw.githubusercontent.com/smohamd/gpt_luna/main/GPT_LUNA.json%E2%80%8F');
        let responseFromMatrix = null;

        // البحث عن رد مناسب في البيانات المصفوفة
        for (const key in matrixData) {
            const matrixWords = key.split(' ');
            const promptWords = prompt.split(' ');
            const intersection = matrixWords.filter(word => promptWords.includes(word));
            if (intersection.length === matrixWords.length) {
                responseFromMatrix = matrixData[key];
                break;
            }
        }

        // إذا تم العثور على رد مناسب، أرسله
        if (responseFromMatrix) {
            return api.sendMessage(responseFromMatrix, threadID, messageID);
        } else {
            // إرسال طلب إلى API للحصول على رد من نموذج GPT
            const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-3.5-turbo-16k-0613`;
            const response = await axios.get(gpt4_api);

            if (response.data && response.data.response) {
                const generatedText = response.data.response;
                return api.sendMessage(`➪ 𝗚𝗣𝗧 𝗟𝗨𝗡𝗔 𝗩 𝟵   🥷
━━━━━━━━━━━━━━━━━━━━━
${generatedText}
━━━━━━━━━━━━━━━━━━━━━
    ZINO X MOHAMED`, threadID, messageID);
            } else {
                console.error('API response did not contain expected data:', response.data);
                return api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, threadID, messageID);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, threadID, messageID);
    }
};

