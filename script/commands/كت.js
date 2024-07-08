module.exports.config = {
	name: "كت",
	version: "1.1.2",
	hasPermssion: 0,
	credits: "عمر",
	description: "البوت يسئلك اسئله عشوائيه",
	commandCategory: "كت",
	usages: "كت عشوائي",
	cooldowns: 1,
};

module.exports.handleEvent = function ({ api, event }) {
	const { commands } = global.client;
	
	if (!event.body) return;

	const { threadID, messageID, body } = event;

	if (body.indexOf("askme") != 0) return;

	const splitBody = body.slice(body.indexOf("askme")).trim().split(/\s+/);


	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());

	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	return api.sendMessage(`⚔️ ${command.config.name} ⚔️\n${command.config.description}\n\n❯ Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯ Thuộc nhóm: ${command.config.commandCategory}\n❯ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯ Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n\n» Module code by ${command.config.credits} «`, threadID, messageID);
};

module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
const { commands } = global.client;
const { threadID, messageID } = event;
const command = commands.get((args[0] || "").toLowerCase());
const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
if (!command) {
const command = commands.values();
var tl = [


      '‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟',
      '‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!',
      '‏كت تويت |أقوى كذبة مشت عليك ؟',
      '‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟',
      'كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟',
      '‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟', 
      '‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟', 
      '‏كت تويت | وش محتاج عشان تكون مبسوط ؟',
      '‏كت تويت | مطلبك الوحيد الحين ؟',
      '‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟',
      "كت تويت | ما هي أغرب عادة لديك؟",
"كت تويت | ما هي اللغة التي ترغب في تعلمها ولماذا؟",
"كت تويت | ما هي أفضل نصيحة حصلت عليها في حياتك؟",
"كت تويت | ما هو الكتاب الذي غير حياتك؟",
"كت تويت | ما هو أفضل هدية حصلت عليها في حياتك؟",
"كت تويت | إذا كنت تستطيع العيش في أي عصر تاريخي، فما هو العصر الذي تختاره؟",
"كت تويت | ما هو الحلم الذي لم تتحقق لك حتى الآن؟",
"كت تويت | ما هي الأغنية التي تجعلك تشعر بالسعادة في كل مرة تستمع إليها؟",
"كت تويت | ما هي الأفلام التي شاهدتها أكثر من مرة؟",
"كت تويت | ما هي الوظيفة التي تحلم بها؟",
"كت تويت | ما هي المهارة التي ترغب في تعلمها؟",
"كت تويت | ما هو الشيء الذي يجعلك تشعر بالتحدي في الحياة؟",
"كت تويت | ما هو الشيء الذي لا يمكنك الاستغناء عنه في حياتك؟",
"كت تويت | ما هو الشيء الذي يجعلك تشعر بالإلهام؟",
"كت تويت | ما هو الشيء الذي تفتقده في حياتك؟",
"كت تويت | ما هي المواقع الإلكترونية التي تزورها بانتظام؟",
"كت تويت | ما هي الرحلة التي تحلم بالقيام بها؟",
"كت تويت | ما هي الطعام الذي لا يمكنك الاستغناء عنه في حياتك؟",
"كت تويت | ما هي الأشياء التي تجعل يومك أفضل؟",
  
  
  "إذا كان لديك اهتمام العالم لمدة 30 ثانية ، ماذا تقول؟","إذا كان عليك العمل ولكنك لا تحتاج إلى المال ، فماذا تختار أن تفعل؟","إذا كنت في المنزل بعد ظهر يوم الخميس الممطر ، ما هو الفيلم الذي ترغب في مشاهدته على شاشة التلفزيون؟","إذا تمكنت من حذف شيء واحد ، فماذا سيكون؟","ماذا سيكون أفضل شيء عن عدم الشعور بالرائحة؟","هل ستترك بلدتك إلى الأبد أم ستبقى في بلدتك إلى الأبد؟","عند التمرير عبر وسائل التواصل الاجتماعي ، هل تفضل المشاركات من المشاهير أو من أفضل أصدقائك؟","هل هناك تطبيق تكرهه ولكنك تستخدمه على أي حال؟","إذا استطعت أن تتكلم كلمة واحدة فقط اليوم ، فماذا ستقول؟","ما هو أغبى شيء قمت به لأن شخصا ما تحداك؟","ما هو أغبى شيء قمت به بمحض إرادتك؟","إذا أمكنك حبس شخص واحد في مؤسسة عقلية ، فمن سيكون؟","أي جزء من الجسم يمكن أن يستخدم القليل من الميكب؟","أي جزء من وجه الإنسان هو المفضل لديك؟","هل ترقص بجنون عندما لا أحد معك؟","إذا تمكنت من اختيار أي شخصية تاريخية ، فمن تختار؟","ما هو أعنف شيء قمت به على الإطلاق؟","هل تفضل الاحتفاظ بجدول نومك الحالي أو سباتك لمدة 3 أشهر ويكون لديك 9 أشهر من التأهب لمدة 24/7 دون تعب؟","ما هو الشيء الذي حاولت تجربته ، والذي لن تجربه أبدًا ، مرة أخرى؟","ما هو عيد الميلاد / عطلة مثالية بالنسبة لك؟","ما هو أصعب تحد في حياتك حتى الآن؟","عندما تنهار الأمور ، هل تفضل إصلاحها أو استبدالها؟","إذا كان طعامك سيئًا في أحد المطاعم ، فهل تقول شيئًا؟","كم مرة تنظر إلى هاتفك كل يوم؟","هل بكيت في فيلم؟","مع من في ماضيك ، هل تتمنى بالفعل أن تكون على اتصال به؟","إذا كان لديك كل المال في العالم ، فما هو أول شيء تشتريه؟","ما أكثر ما تتطلع إليه في السنوات العشر القادمة؟","هل تريد أن تبتعد عن التكنولوجيا؟","ما الذي يجعلك تبتسم علنا؟","إذا كنت تستطيع رسم صورة لأي مشهد شاهدته من قبل ، فماذا ترسم؟","عندما تبلغ من العمر 90 عامًا ، ما هو الشيء الأكثر أهمية بالنسبة لك؟","أي جزء من جسم الإنسان هو المفضل لديك؟"];
var tle = tl[Math.floor(Math.random() * tl.length)];
var lon = ` ${tle}.`;
return api.sendMessage(lon, event.threadID, event.messageID);
}
const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
return api.sendMessage(`⚔️ ${command.config.name} ⚔️\n${command.config.description}\n\n❯ Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n❯ Thuộc nhóm: ${command.config.commandCategory}\n❯ Thời gian chờ: ${command.config.cooldowns} giây(s)\n❯ Quyền hạn: ${((command.config.hasPermssion == 0) ? "Người dùng" : (command.config.hasPermssion == 1) ? "Quản trị viên" : "Người vận hành bot" )}\n❯ Prefix: ${prefix}\n\n» Module code by ${command.config.credits} «`, threadID, messageID);
};
