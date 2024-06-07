module.exports.config = {
    name: "تصفية",
    version: "1.0.0",
    hasPermissions: 1,
    credits: "ZINO",
    description: "🇦🇱 اخراج الحسابات المعطلة من القروب 🇦🇱",
    commandCategory: "〘 ادمن قروب ﮱ 〙",
    usages: "فقط",
    cooldowns: 5
};

function getUserGender(genderCode) {
    if (genderCode === 3) return 'ولد';
    if (genderCode === 2) return 'فتاة';
    return 'غير معروف';
}

module.exports.run = async function({ api, event }) {
    const filterMessage = 
        "________________________________\n" +
        "رد بالرقم لتصفية\n" +
        "1 حسابات مغلقة \n" +
        "________________________________";

    api.sendMessage(filterMessage, event.threadID, (error, info) => {
        if (error) return console.error(error);
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "filterSelection"
        });
    });
};

module.exports.handleReply = async function({ api, event, handleReply }) {
    if (event.senderID !== handleReply.author) return;

    const { userInfo, adminIDs } = await api.getThreadInfo(event
                                                           
