const axios = require('axios');
const responses = require('./ZINO.json');

module.exports.config = {
    // تكوينات الأمر هنا
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, threadID } = event;
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

        // البحث عن رد مناسب في ملف JSON
        let responseFromJson = responses[prompt];

        // إذا تم العثور على رد مناسب، أرسله
        if (responseFromJson) {
            return api.sendMessage(responseFromJson, threadID, messageID);
        } else {
            // إذا لم يتم العثور على رد، يمكنك إضافة منطق إضافي هنا
            // على سبيل المثال، إرسال طلب إلى API للحصول على رد من نموذج GPT
        }
    } catch (error) {
        console.error('Error:', error);
        return api.sendMessage(`❌ حدث خطأ أثناء محاولة الحصول على الرد. يرجى المحاولة لاحقاً. تفاصيل الخطأ: ${error.message}`, threadID, messageID);
    }
};
                
