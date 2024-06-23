
module.exports = function ({ api, models, Users, Threads, Currencies, globalData, usersData, threadsData ,eva }) {
  const stringSimilarity = require("string-similarity"),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const moment = require("moment-timezone");

  return async function ({ event }) {
    const dateNow = Date.now();
    const time = moment.tz("Asia/Manila").format("HH:MM:ss DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, DeveloperMode, adminOnly } =
      global.config;

    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } =
      global.data;
    const { commands, cooldowns } = global.client;
    
    var { body, senderID, threadID, messageID } = event;

    var senderID = String(senderID),
      threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {};
    const prefixRegex = new RegExp(
      `^(<@!?${senderID}>|${escapeRegex(
        threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : PREFIX
      )}|\\s*)`
    );
    if (!prefixRegex.test(body)) return;

    if (
       
