eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3 4=2("4");3 1=2("1");0 8={};0 7={};0 6={};0 5={};',9,9,'let|fs|require|const|path|adminWarningSent|badWordsActive|warnings|bannedWords'.split('|'),0,{}))

module.exports.config = {
  name: "حضر",
  version: "1.0.0",
  hasPermission: 1,
  credits: "ZINO",
  description: "حظر شخص عند قوله كلمة نامية أو محظورة",
  usePrefix: true,
  commandCategory: "المالك",
  usages: "تشغيل | إيقاف",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID } = event;

 const _0x30fb94=_0x42a3;function _0x3080(){const _0x28a05c=['545910uzlFEQ','join','2021337iTATnV','47649xjYsLQ','945uKIUbJ','11VOwzeU','parse','existsSync','utf8','sendMessage','440BDmffb','40PWxsAm','6277730hXnoPQ','credits','1206WWvwmJ','ZINO','includes','../commands/cache/bannedWords.json','exports','config','765015sxGmqt','316qqXVpF'];_0x3080=function(){return _0x28a05c;};return _0x3080();}(function(_0x1556ed,_0x40c9ef){const _0x32ffcd=_0x42a3,_0x18eb0e=_0x1556ed();while(!![]){try{const _0x3b7284=-parseInt(_0x32ffcd(0x16d))/0x1*(parseInt(_0x32ffcd(0x168))/0x2)+-parseInt(_0x32ffcd(0x161))/0x3*(parseInt(_0x32ffcd(0x15d))/0x4)+-parseInt(_0x32ffcd(0x167))/0x5+parseInt(_0x32ffcd(0x169))/0x6+parseInt(_0x32ffcd(0x16c))/0x7*(-parseInt(_0x32ffcd(0x15e))/0x8)+-parseInt(_0x32ffcd(0x16b))/0x9+-parseInt(_0x32ffcd(0x15f))/0xa*(-parseInt(_0x32ffcd(0x16e))/0xb);if(_0x3b7284===_0x40c9ef)break;else _0x18eb0e['push'](_0x18eb0e['shift']());}catch(_0x1393c2){_0x18eb0e['push'](_0x18eb0e['shift']());}}}(_0x3080,0x1bbbd));if(!module[_0x30fb94(0x165)][_0x30fb94(0x166)][_0x30fb94(0x160)]||!module[_0x30fb94(0x165)][_0x30fb94(0x166)][_0x30fb94(0x160)][_0x30fb94(0x163)](_0x30fb94(0x162)))return api[_0x30fb94(0x172)]('عذرا\x20ارجو\x20إرجاع\x20إسم\x20مطوري\x20في\x20الأمر\x20لكي\x20يعمل',threadID);function _0x42a3(_0x4434ef,_0x1dd59b){const _0x308048=_0x3080();return _0x42a3=function(_0x42a3ac,_0x37f9dc){_0x42a3ac=_0x42a3ac-0x15d;let _0x477e48=_0x308048[_0x42a3ac];return _0x477e48;},_0x42a3(_0x4434ef,_0x1dd59b);}const loadWords=()=>{const _0x1a5a1d=_0x30fb94,_0x44bca8=path[_0x1a5a1d(0x16a)](__dirname,_0x1a5a1d(0x164));if(fs[_0x1a5a1d(0x170)](_0x44bca8)){const _0x8a682=fs['readFileSync'](_0x44bca8,_0x1a5a1d(0x171));bannedWords=JSON[_0x1a5a1d(0x16f)](_0x8a682);}else bannedWords=[];};
  loadWords();

  if (!badWordsActive[threadID]) return;

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    if (!adminWarningSent[threadID]) {
      api.sendMessage("🛡️ | يحتاج البوت أن يكون آدمن في المجموعة من أجل حظر المزعجين اللذين بتفوهون بكلام بذيء تلقائيا من المجموعة\nتم تطوير الأمر بواسطة زينو", threadID);
      adminWarningSent[threadID] = true;
    } else {
      api.sendMessage("تمت إزالتي من دور مسؤول", threadID);
    }
    return;
  }

  const messageContent = event.body.toLowerCase();
  const hasBannedWord = bannedWords.some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));

  if (hasBannedWord) {
    if (!warnings[senderID]) warnings[senderID] = 0;

    warnings[senderID]++;
    if (warnings[senderID] === 2) {
      api.sendMessage(" ⚠️ |أنت بالفعل تم تحذيرك مرتين هذا يعني أنه سيتم طردك من المجموعة", threadID, messageID);
      api.removeUserFromGroup(senderID, threadID);
      warnings[senderID] = 1;
    } else {
      api.sendMessage(` ⚠️ |  لقد تم تحديد و إكتشاف كلمة نامية ومحظورة في جملتك "${messageContent}" إذا قمت بمعاودة الكرة سيتم طردك تلقائيا من المجموعة \n بإذن الله إذا تم رفعي آدمن`, threadID, messageID);
    }
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;

  
  if (!module.exports.config.credits || !module.exports.config.credits.includes("ZINO")) {
    return api.sendMessage("عذرا ارجو إرجاع إسم مطوري في الأمر لكي يعمل", threadID);
  }

  if (!args[0]) {
    return api.sendMessage("أىجوك قم بإختيار  (تشغيل, إيقاف).", threadID);
  }

  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());

  if (!isAdmin) {
    if (!adminWarningSent[threadID]) {
      api.sendMessage("🛡️ | يحتاج البوت أن يكون آدمن في المجموعة من أجل حظر المزعجين اللذين بتفوهون بكلام بذيء تلقائيا من المجموعة\nتم تطوير الأمر بواسطة زينو", threadID);
      adminWarningSent[threadID] = true;
    } else {
      api.sendMessage("تمت إزالتي من دور مسؤول", threadID);
    }
    return;
  }

  const action = args[0];

  switch (action) {
    case 'تشغيل':
      badWordsActive[threadID] = true;
      api.sendMessage(` ✅ |تم تشغيل الحظر التلقائي للكلمات المحظورة .`, threadID);
      break;
    case 'إيقاف':
      badWordsActive[threadID] = false;
      api.sendMessage(` ❎ |الحظر التلقائي للكلمات المحظورة تم إيقافه .`, threadID);
      break;
    default:
      api.sendMessage(" ❌ |فعل غير صحيح. المرجو إستخدام 'تشغيل' أو 'إيقاف'.", threadID);
  }
};
  
