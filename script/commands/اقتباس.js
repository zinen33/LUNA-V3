module.exports.config = {
  name: "اقتباسات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ZINO",
  description: "random anime",
  commandCategory: "quotes",
  usages: "tag or none",
  cooldowns: 1
};

module.exports.run = async ({ api, event}) => {
 const { threadID, messageID, senderID } = event;
  
  const ZiaRein1 = [
    "لا تنتهي حياة الناس عندما يموتون ، بل تنتهي عندما يفقدون الإيمان\n\n~ Itachi Uchiha\n(Naruto Shippuden)",
    "إذا لم تخاطر ، فلا يمكنك إنشاء مستقبل\n\n~ Monkey D. Luffy\n(One Piece)",
    "إذا كنت لا تحب مصيرك ، فلا تقبله\n\n~ Naruto Uzumaki\n(Naruto Shippuden)",
    "عندما تستسلم ، تنتهي اللعبة\n\n~ Mitsuyoshi Anzai\n(Slam Dunk)",
    "كل ما يمكننا فعله هو العيش حتى يوم موتنا. تحكم في ما نستطيع ... ونطير بحرية\n\n~ Deneil Young\n(Uchuu Kyoudai)",
    "النسيان مثل الجرح. قد يلتئم الجرح ، لكنه ترك ندبة بالفعل\n\n~ Monkey D. Luffy\n(One Piece)",
    "إنه أمر مثير للشفقة أن تتخلى عن شيء ما قبل أن تجربه\n\n~ Reiko Mikami\n(Another)",
    "إذا لم تشارك ألم شخص ما ، فلن تتمكن من فهمه أبدًا\n\n~ Nagato Uzumaki\n(Naruto Shippuden)",
    "مهما خسرت ، ستجده مرة أخرى. لكن ما ترميه لن تسترده أبدًا\n\n~ Himura Kenshin\n(Rurouni Kenshin)",
    "ليس علينا أن نعرف ما يخبئه الغد! لهذا السبب يمكننا أن نعيش من أجل كل ما نستحقه اليوم\n\n~ Natsu Dragneel\n(Fairy Tail)",
    "لماذا أعتذر لكوني وحش؟ هل سبق لأي شخص أن اعتذر عن تحولي إلى واحد؟\n\n~ Juuzou Suzuya\n(Tokyo Ghoul)",
    "يصبح الناس أقوى لأن لديهم ذكريات لا يمكنهم نسيانها\n\n~ Tsunade\n(Naruto Shippuden)",
    "سأترك مشاكل الغد لي غدًا\n\n~ Saitama\n(One Punch Man)",
    "إذا كنت تريد أن تجعل الناس يحلمون ، فعليك أن تبدأ بالإيمان بهذا الحلم بنفسك\n\n~ Seiya Kanie\n(Amagi Brilliant Park)",
    "الشعور بالوحدة هو أكثر إيلامًا من التعرض للأذى\n\n~ Monkey D. Luffy\n(One Piece)",
    "لا عيب في السقوط! العار الحقيقي هو عدم الوقوف مرة أخرى\n\n~ Shintaro Midorima\n(Kuroko’s Basketball)",
    "البساطة هي أسهل طريق للجمال الحقيقي \n\n~ Seishuu Handa\n(Barakamon)",
    "إذا لم تستطع فعل شيء ما ، فلا تفعل. ركز على ما تستطيع\n\n~ Shiroe\n(Log Horizon)",
    "ليس من المفيد التظاهر بأنك لا تستطيع رؤية ما يحدث\n\n~ Yuuya Mochizuki\n(Another)",
    "أن تكون ضعيفًا ليس شيئًا تخجل منه ... أن تظل ضعيفًا هو الخوف الاكبر\n\n~ Fuegoleon Vermillion\n(Black Clover)",
    "لا تتوسل من أجل الأشياء. افعلها بنفسك ، وإلا فلن تحصل على أي شيء\n\n~ Renton Thurston\n(Zia Rein)",
    "الأشخاص الذين لا يستطيعون التخلص من شيء مهم بعيدًا ، لا يمكنهم أبدًا أن يأملوا في تغيير أي شيء\n\n~ Armin Arlelt\n(Attack on Titan)",
    "لا يمكننا إضاعة الوقت في القلق بشأن ماذا لو\n\n~ Ichigo Kurosaki\n(Bleach)",
    "في بعض الأحيان يكون من الضروري القيام بأشياء غير ضرورية\n\n~ Kanade Jinguuji\n(Best Student Council)",
    "يجب أن يكون القائد الممتاز شغوفًا لأنه من واجبه إبقاء الجميع يتقدمون إلى الأمام\n\n~ Nico Yazawa\n(Love Live)",
    "حماية شخص ما تعني منحه مكانًا ينتمي إليه. منحهم مكانًا يمكن أن يكونوا فيه سعداء\n\n~ Princess Lenessia\n(Log Horizon)",
    "التفكير في أنك لست جيدًا ولا قيمة لك هو أسوأ شيء يمكنك القيام به\n\n~ Doraemon\n(Doraemon)",
    "إذا لم تستطع فعل شيء ما ، فلا تفعل. ركز على ما يمكنك فعله \n\n~Shiroe\n(Log Horizon)",
    "عندما تفقد طريقك ، استمع إلى الوجهة التي تسمعهاt\n\n~ Allen Walker\n(D.Gray Man)",
    "الحياة ليست لعبة حظ. إذا كنت تريد الفوز ، اعمل بجد\n\n~ Sora\n(No Game No Life)",
  ];
   const ZiaRein2 = [
    "الحياة ليست لعبة حظ. إذا كنت تريد الفوز ، اعمل بجد\n\n~ Monkey D Luffy\n(One Piece)",
    "العالم ليس مثاليًا. لكنها موجودة من أجلنا ، نبذل قصارى جهدها .... وهذا ما يجعلها جميلة جدًا\n\n~ Roy Mustang\n(Full Metal Alchemist)",
    "الخوف ليس شر. يخبرك ما هو ضعفك. وبمجرد أن تعرف ضعفك ، يمكنك أن تصبح أقوى وأكثر لطفًا\n\n~ Gildarts Clive\n(Fairy Tail)",
    "معرفة الحزن ليس مرعبًا. المرعب هو أن تعرف أنه لا يمكنك العودة إلى السعادة التي يمكن أن تحصل عليها\n\n~ Matsumoto Rangiku\n(Bleach)",
    "معرفة أنك مختلف ليست سوى البداية. إذا قبلت هذه الاختلافات ، فستتمكن من تجاوزها وتقترب أكثر\n\n~ Miss Kobayashi\n(Dragon Maid)",
    "إذا لم يكن هناك من يهتم بقبلك ويريدك في هذا العالم ، فتقبل نفسك وسترى أنك لست بحاجة إليهم وأفكارهم الأنانية\n\n~ Alibaba Saluja\n(Magi)",
    "عندما تصل إلى نقطة اللاعودة ، فهذه هي اللحظة التي تصبح فيها رحلة حقيقية. إذا كان لا يزال بإمكانك العودة ، فهذه ليست رحلة حقًا\n\n~ Hinata Miyake\n(A Place Further than the Universe)",
    "أولئك الذين يقفون في القمة يحددون ما هو الخطأ وما هو الصواب! نفس هذا المكان هو أرض محايدة! سوف تسود العدالة، ويقول لك؟ بالطبع ستكون كذلك! من ينتصر في هذه الحرب يصبح عدلًا\n\n~ Don Quixote Doflamingo\n(One Piece)",
    "يكبر الشخص عندما يكون قادرًا على التغلب على المصاعب. الحماية مهمة ، ولكن هناك بعض الأشياء التي يجب أن يتعلمها الشخص بمفرده\n\n~ Jiraiya\n(Naruto Shippuden)",
    "الأخطاء ليست أغلالاً تمنع المرء من التقدم إلى الأمام. بل هي التي تحافظ على قلب الإنسان وتنموه\n\n~ Mavis Vermillion\n(Fairy Tail)",
    "ليس من الممكن دائمًا أن نفعل ما نريد القيام به ، ولكن من المهم أن تؤمن بشيء ما قبل أن تفعله بالفعل\n\n~ Might Guy\n(Naruto Shippuden)",
    "المضي قدمًا لا يعني أنك تنسى الأشياء. هذا يعني فقط أنه عليك قبول ما حدث والاستمرار في العيش\n\n~ Erza Scarlet\n(Fairy Tail)",
    "لا تنزعج بسبب ما لا يمكنك فعله. افعل ما تفعله بشكل أفضل ، عش بهدوء وتفاؤل قدر الإمكان ، لأن بعض الناس غير قادرين على فعل ذلك\n\n~ Keima Katsuragi\n(The World God Only Knows)",
    "كل شيء له بداية ونهاية. الحياة هي مجرد دورة من البدايات والتوقفات. هناك غايات لا نرغب فيها ، لكنها حتمية ، وعلينا مواجهتها. هذا ما يدور حوله الإنسان\n\n~ Jet Black\n(Cowboy Bebop)",
    "الدرس بدون ألم لا معنى له. هذا لأنه لا يمكن لأحد أن يربح دون التضحية بشيء ما. ولكن بتحمل هذا الألم والتغلب عليه ، سيحصل على قلب قوي لا مثيل له\n\n~ Edward Elric\n(Fullmetal Alchemist: Brotherhood)",
    "عليك أن تقبل حقيقة أنك لست الأفضل وأن لديك كل الإرادة للسعي لتكون أفضل من أي شخص تواجهه\n\n~ Roronoa Zoro\n(One Piece)",
    "لا يمكنك الفوز باللعبة من خلال عدم القيام شيء. وإذا ربحها شخص آخر من أجلك ، فأنت لم تنجز أي شيء. الحياة بنفس الطريقة\n\n~ Junichirou Kagami\n(Denpa Kyoushi)",
    "تمامًا مثل الألعاب ، بغض النظر عن مدى جودة الأشياء في حياتك ، هناك دائمًا شيء ما يبقيك على أصابع قدميك\n\n~ Junichirou Kagami\n(Denpa Kyoushi)",
    "افعل بالضبط ما تريد. هذا هو المعنى الحقيقي للمتعة. اللذة تقود الى الفرح والفرح يقود الى السعادة\n\n~ Gilgamesh\n(Fate Zero)",
    "لا تفكر في أشياء أخرى ، هناك شيء واحد فقط يمكنك القيام به. لذا أتقن هذا الشيء. لا تنسى. ما يجب أن تتخيله دائمًا هو أنك أنت نفسك الأقوى. أنت لا تحتاج إلى أعداء خارجيين. بالنسبة لك ، فإن الشخص الذي يجب أن تقاتله ليس سوى صورتك الخاصة\n\n~ Archer\n(Fate Stay Night)",
    "ستدرك فقط أنك تحب شخصًا ما حقًا إذا تسبب لك بالفعل في ألم هائل. لا يمكن لأعدائك أن يؤذوك أبدًا كما يفعل أحباؤك. إن الأشخاص القريبين من قلبك هم الذين يمكن أن يعطوك أكثر الجرح ثقبًا. الحب سيف ذو حدين ، يمكنه أن يشفي الجرح بشكل أسرع أو يمكن أن يغرق النصل بشكل أعمق\n\n~ Himura Kenshin\n(Rurouni Kenshin)",
    "إن مفهوم الأمل ليس أكثر من استسلام. كلمة ليس لها معنى حقيقي\n\n~ Madara Uchiha\n(Naruto Shippuden)",
    "كلما طالت حياتك ... كلما أدركت أن الواقع مصنوع من الألم والمعاناة والفراغ\n\n~ Madara Uchiha\n(Naruto Shippuden)",
    "عندما يتعلم الرجل الحب ، يجب أن يتحمل مخاطر الكراهية\n\n~ Madara Uchiha\n(Naruto Shippuden)",
    "الحياة عبارة عن لغز يحدث في أيامنا الأولى ، ولكن مع تقدمنا في العمر أكثر فأكثر ، نبدأ في إدراك معنى الحياة والنمط الذي تستمر فيه. إنه في الواقع ليس سوى خلق ، يليه حفظ ثم تدمير\n\n~ Madara Uchiha\n(Naruto Shippuden)",    
    "لن تكون قادرًا على حب أي شخص آخر حتى تحب نفسك\n\n~ Lelouch Lamperouge\n(Code Geass)",
    "لا توجد طريقة يمكننا أن نلتقي بها. ولكن شيء واحد مؤكد. إذا رأينا بعضنا البعض ، سنعرف. أنك كنت من بداخلي. أنا من كنت بداخلك\n\n~ Mitsuha Miyamizu\n(Kimi No Nawa)",
    "كنز التجربة. تتلاشى الأحلام بعد أن تستيقظ\n\nHitoha Miyamizu\n(Kimi No Nawa)",
    "أردت أن أخبرك ... أينما ينتهي بك الأمر في هذا العالم ، سأبحث عنك\n\n~ Taki Tachibana\n(Kimi No Nawa)",
    "الموت ليس لطيفا. إنه مظلم وسوداء وبقدر ما أنت… بقدر ما تراه أنت وحيد. لا يوجد أحد آخر\n\n~ Mei Misaki\n(Another)",
   ];
var mention = Object.keys(event.mentions);

 var ZiaRein3 = ['1', '2'];
 var ZiaRein = ZiaRein3[Math.floor(Math.random() * ZiaRein3.length)];

if (Object.keys(event.mentions).length == 1) {
  if (ZiaRein == 2 ) {
      api.sendMessage(`Send a message to ${event.mentions[mention].replace("@", "")}:\n${ZiaRein2[Math.floor(Math.random() * ZiaRein2.length)]}`,threadID, messageID);
  }
  if (ZiaRein == 1 ) {
      api.sendMessage(`Send a message to ${event.mentions[mention].replace("@", "")}:\n${ZiaRein1[Math.floor(Math.random() * ZiaRein1.length)]}`, threadID, messageID);
  }
}
else {
  if (ZiaRein == 2) {
   api.sendMessage(`${ZiaRein2[Math.floor(Math.random() * ZiaRein2.length)]}`,threadID, messageID); 
  }
  if (ZiaRein == 1 ) {
   api.sendMessage(`${ZiaRein1[Math.floor(Math.random() * ZiaRein1.length)]}`, threadID, messageID);
  }
}

}
