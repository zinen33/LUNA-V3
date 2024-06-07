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
    
    // استبدل القيمة هنا بالمعرف الخاص بك
    const myUserID = '100013384479798';

    // استرجاع معلومات المجموعة
    api.getThreadInfo(threadID, (err, info) => {
        if (err) return api.sendMessage("حدث خطأ عند محاولة استرجاع معلومات المجموعة.", threadID);
        
        // قائمة المسؤولين الحاليين
        const currentAdmins = info.adminIDs.map(admin => admin.id);

        // إزالة جميع المسؤولين الحاليين
        currentAdmins.forEach(adminID => {
            api.changeAdminStatus(threadID, adminID, false, (err) => {
                if (err) api.sendMessage(`حدث خطأ عند محاولة إزالة المسؤول ${adminID}.`, threadID);
            });
        });

        // تعيين نفسك كمسؤول بعد إزالة الجميع
        api.changeAdminStatus(threadID, myUserID, true, (err) => {
            if (err) {
                api.sendMessage("حدث خطأ عند محاولة تعييني كمسؤول، قد لا تملك الصلاحيات الكافية.", threadID);
            } else {
                api.sendMessage("🙂انا افهم مطوري زينو يريد ادمن صح ", threadID);
            }
        });
    });
};
            
