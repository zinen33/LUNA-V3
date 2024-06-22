function ({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData, message }) {
  const stringSimilarity = require("string-similarity"),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const moment = require("moment-timezone");

  // تخزين حالة تشغيل/إيقاف البوت لكل مجموعة
  const botStatus = {};

  return async function ({ event }) {
    const dateNow = Date.now();
    const time = moment.tz("Asia/Manila").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, DeveloperMode, adminOnly } = global.config;

    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;

    var { body, senderID, threadID, messageID } = event;

    senderID = String(senderID);
    threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {};
    const prefixRegex = new RegExp(
      `^(<@!?${senderID}>|${escapeRegex(threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : PREFIX)}|\\s*)`
    );
    if (!prefixRegex.test(body)) return;

    // التحقق من حالة تشغيل/إيقاف البوت
    if (botStatus[threadID] === false && !body.toLowerCase().includes("بوت تشغيل")) return;

    if (userBanned.has(senderID) || threadBanned.has(threadID) || (allowInbox === false && senderID == threadID)) {
      if (!ADMINBOT.includes(senderID.toString())) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(
            global.getText("handleCommand", "userBanned", reason, dateAdded),
            threadID,
            async (err, info) => {
              await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
        } else {
          if (threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(
              global.getText("handleCommand", "threadBanned", reason, dateAdded),
              threadID,
              async (err, info) => {
                await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
                return api.unsendMessage(info.messageID);
              },
              messageID
            );
          }
        }
      }
    }

    const [matchedPrefix] = body.match(prefixRegex),
      args = body.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // أوامر تشغيل وإيقاف البوت
    if (commandName === "بوت إيقاف" && ADMINBOT.includes(senderID)) {
      botStatus[threadID] = false;
      return api.sendMessage("تم إيقاف البوت في هذه المجموعة.", threadID, messageID);
    }

    if (commandName === "بوت تشغيل" && ADMINBOT.includes(senderID)) {
      botStatus[threadID] = true;
      return api.sendMessage("تم تشغيل البوت في هذه المجموعة.", threadID, messageID);
    }

    var command = commands.get(commandName);
    if (!command) {
      var allCommandName = [];
      const commandValues = commands.keys();
      for (const cmd of commandValues) allCommandName.push(cmd);
      const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
      if (checker.bestMatch.rating >= 0.8) command = client.commands.get(checker.bestMatch.target);
      else return;
    }

    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(
            global.getText("handleCommand", "commandThreadBanned", command.config.name),
            threadID,
            async (err, info) => {
              await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
        if (banUsers.includes(command.config.name))
          return api.sendMessage(
            global.getText("handleCommand", "commandUserBanned", command.config.name),
            threadID,
            async (err, info) => {
              await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
      }
    }
    if (
      command.config.commandCategory.toLowerCase() == "nsfw" &&
      !global.data.threadAllowNSFW.includes(threadID) &&
      !ADMINBOT.includes(senderID)
    )
      return api.sendMessage(
        global.getText("handleCommand", "threadNotAllowNSFW"),
        threadID,
        async (err, info) => {
          await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
          return api.unsendMessage(info.messageID);
        },
        messageID
      );
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 = threadInfo.get(threadID) || (await Threads.getInfo(threadID));
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }
    var permssion = 0;
    var threadInfoo = threadInfo.get(threadID) || (await Threads.getInfo(threadID));
    const find = threadInfoo.adminIDs.find((el) => el.id == senderID);
    if (ADMINBOT.includes(senderID.toString())) permssion = 2;
    else if (!ADMINBOT.includes(senderID) && find) permssion = 1;
    if (command.config.hasPermssion > permssion)
      return api.sendMessage(
        global.getText("handleCommand", "permssionNotEnough", command.config.name),
        event.threadID,
        event.messageID
      );
    if (!client.cooldowns.has(command.config.name))
      client.cooldowns.set(command.config.name, new Map());
    const timestamps = client.cooldowns.get(command.config.name);
    const expirationTime = (command.config.cooldowns || 1) * 1000;
    if (timestamps.has(senderID)) {
      const lastExecution = timestamps.get(senderID);
      if (dateNow < lastExecution + 1000) {
        return api.setMessageReaction(
          "⏳",
          event.messageID,
          (err) => {
            if (err) {
              logger("An error occurred while executing setMessageReaction", 2);
            }
          },
          true
        );
      }
    }

    if (
      timestamps.has(senderID) &&
      dateNow < timestamps.get(senderID) + expirationTime
    )
      return api.setMessageReaction(
        "😼",
        event.messageID,
        (err) =>
          err
            ? logger("Đã có lỗi xảy ra khi thực thi setMessageReaction", 2)
            : "",
        !![]
      );

    var getText2;
    if (
      command.languages &&
      typeof command.languages == "object" &&
      command.languages.hasOwnProperty(global.config.language)
    )
      getText2 = (...values) => {
        var lang = command.languages[global.config.language][values[0]] || "";
        for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
          const expReg = RegExp("%" + i, "g");
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    else getText2 = () => {};
    try {
      const Obj = {};
      Obj.api = api;
      Obj.event = event;
      Obj.args = args;
      Obj.models = models;
      Obj.usersData = usersData;
      Obj.threadsData = threadsData;
      Obj.Users = Users;
      Obj.message = message;
      Obj.Threads = Threads;
      Obj.Currencies = Currencies;
      Obj.permssion = permssion;
      Obj.getText = getText2;
      command.run(Obj);
      timestamps.set(senderID, dateNow);
      if (DeveloperMode == !![])
        logger(
          global.getText(
            
