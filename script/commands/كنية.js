module.exports.config = {
    name: "كنية",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "MOHAMED X ZINO",
    MOHAMED: true,
    usePrefix: true,
    description: "وييي",
    commandCategory: "النظام",
    usages: "كنية",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event, client, Threads }) {
    const { threadID } = event;
    let { nicknames } = await api.getThreadInfo(threadID);
    const botNickname = nicknames[api.getCurrentUserID()];
    const correctNickname = `[ ${global.config.PREFIX} ] • ${global.config.BOTNAME || "Made by CatalizCS and SpermLord"}`;

    if (botNickname !== correctNickname) {
        api.changeNickname(correctNickname, threadID, api.getCurrentUserID());
        setTimeout(() => {
            api.sendMessage(`تم تغيير كنية البوت تلقائيًا يرجى عدم العبث بها 🙆🏻‍♀️✨`, threadID);
        }, 1500);
    }
};

module.exports.run = async ({ api, event, Threads }) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["cnamebot"] === "undefined" || data["cnamebot"] === false) data["cnamebot"] = true;
    else data["cnamebot"] = false;

    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);

    return api.sendMessage(`✅ ${(data["cnamebot"] === true) ? "تم تفعيل" : "تم تعطيل"} تغيير الكنية التلقائي للبوت!`, event.threadID);
};
