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
    
    if (!permission.includes(event.senderID)) {
        const banData = await fetchBanData();
        if (banData && banData.command_disabled === false) {
            api.sendMessage(banData.ban_message, event.threadID);
            return;
        }
        
        const confirmationMessage = await api.sendMessage(`🥷 مرحبا يامطور ${senderName} \n  تفاعل معا رسالتي ب 👍 لتأكيد الخروج`, event.threadID);
        
        api.listen(function callback(error, event) {
            if (error) return console.error(error);
            
            if (event.type === "message_reaction" && event.reaction === "👍" && event.messageID === confirmationMessage.messageID) {
                if (event.userID !== confirmationMessage.senderID) {
                    const userName = userInfo[event.userID].name;
                    api.sendMessage(`عذرا انت لست مطور يا ${userName} حتة اخرج`, event.threadID);
                    return;
                }
                
                api.sendMessage(`تنبيه امر لمطور بالخروج \n🔒 لا يمكن إعادة الانضمام مرة أخرى تواصل مع المطور ${senderName} لمزيد من التفاصيل 🔒`, event.threadID, () => {
                    api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
                });
            }
        });
    } else {
        const confirmationMessage = await api.sendMessage(`🥷 مرحبا يامطور ${senderName} \n  تفاعل معا رسالتي ب 👍 لتأكيد الخروج`, event.threadID);
        
        api.listen(function callback(error, event) {
            if (error) return console.error(error);
            
            if (event.type === "message_reaction" && event.reaction === "👍" && event.messageID === confirmationMessage.messageID) {
                if (event.userID !== confirmationMessage.senderID) {
                    const userName = userInfo[event.userID].name;
                    api.sendMessage(`عذرا انت لست مطور يا ${userName} حتة اخرج`, event.threadID);
                    return;
                }
                
                api.sendMessage(`🥷 تنبيه امر المطور بالخروج \n🔒 لا يمكن إعادة الانضمام مرة أخرى تواصل مع المطور ${senderName} لمزيد من التفاصيل 🔒`, event.threadID, () => {
                    api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
                });
            }
        });
    }
}
