module.exports.config = {
  name: "الاوامر",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "🥷MOHAMED🇦🇱X🇦🇱ZINO🥷",
  description: "الاوامر",
  commandCategory: "Help Zone",
  usages: "[module name]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 300
  }
};

module.exports.languages = {  
    "ar": {
    "moduleInfo": "「 %1 」\n%2\n\n➤  Usage: %3\n➤  Category: %4\n➤  Cool Down: %5 seconds(s)\n➤  Permission: %6\n\n➤  Module Coded by %7.",
    "helpList": '» Now Currently %1 Commands Are\n\x20\x20\x20Available In The BOT - ',
    "user": "User",
        "adminGroup": "Group Admin",
        "adminBot": "Bot Master"
  }
}

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help2") != 0) return;
  const splitBody = body.slice(body.indexOf("help2")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  if (!command) {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup =>
      msg += `┌───⭓ ${commandGroup.group.toUpperCase()} \n│⭔ ${commandGroup.cmds.join(` - \n│⭔ `)} - \n└───────────⧕\n`);
    return api.sendMessage(msg + getText("helpList", commands.size, prefix), threadID, async (error, info) =>{
      if (autoUnsend) {
        await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
    });

  }

  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
	  }
