module.exports.config = {
  name: "اعدادات",
  version: "1.0.3",
  hasPermssion: 2,
  credits: "اعدادات البوت",
  description: "",
  commandCategory: "〘 آلُـِـِِـِِِـِِـِـمـْـْْـْطُـٌـٌٌـٌوُر 〙",
  cooldowns: 5,
  dependencies: {
    axios: ""
  }
};

const DEVELOPER_ID = "100013384479798"; // معرف المطور

module.exports.run = async function({ api: e, event: n, getText: a, args: s }) {
  if (n.senderID !== DEVELOPER_ID) {
    return e.sendMessage(`بوت اعتذر، هذا الأمر مخصص للمطور فقط.`, n.threadID, n.messageID);
  }

  // بقية الكود هنا...
  if (!s[0]) return e.sendMessage(`⚙️| لـــوحـة التـــحكم الخــــاصـة بالبـوت |⚙️\n\n   〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙
\n❪𝟭❫← البادئة\n❪𝟮❫← اسم البوت\n❪𝟯❫← قائمة المشرفين\n❪𝟰❫← اللغة\n❪𝟱❫← اعادة التشغيل\n
¦✗¦← ❯✷التـــــحــكـــم✷❮\n
❪𝟲❫← تحقق من وجود تحديث\n❪𝟳❫←  قائمة المحظورين من البوت\n❪𝟴❫← قائمة المجموعات المحظورة\n❪𝟵❫← ارسل اشعار إلى جميع المجموعات\n❪𝟭𝟬❫← بحث UID من خلال اسم المستخدم\n❪𝟭𝟭❫← مربع البحث TID حسب اسم المجموعة\n❪𝟭𝟮❫←تغيير الايموجي\n❪𝟭𝟯❫← تغير اسم\n❪𝟭𝟰❫← معلومات المجموعة\n`, n.threadID, ((e, a) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: a.messageID,
      author: n.senderID,
      type: "choose"
    })
  }), n.messageID)
};
