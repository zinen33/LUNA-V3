module.exports.config = {
    name: "adminUpdate",
    eventType: ["log:thread-admins","log:thread-name", "log:user-nickname", "log:thread-call","log:thread-icon", "log:thread-color", "log:link-status", "log:magic-words", "log:thread-approval-mode", "log:thread-poll"],
    version: "1.0.1",
    credits: "MrTomXxX",
    description: "Update group information quickly",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads, Users }) { 
    const { author, threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;
    const fs = require("fs");
    var iconPath = __dirname + "/emoji.json";
    if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
    if (author == threadID) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            case "log:thread-admins": {
                const userName = (await api.getUserInfo(logMessageData.TARGET_ID))[logMessageData.TARGET_ID].name;
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID });
                    api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n» المستخدم ${userName} أصبح مسؤول`, threadID);
                } else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n» تم ازالة المستخدم ${userName} من دور مسؤول`, threadID);
                }
                break;
            }

            case "log:user-nickname": {
                const userName = (await api.getUserInfo(logMessageData.participant_id))[logMessageData.participant_id].name;
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n» ${(logMessageData.nickname.length == 0) ? `تمت ازالة الكنية للمستخدم ${userName}` : `تم تحديث الكنية للمستخدم ${userName} إلى: ${logMessageData.nickname}`}.`, threadID);
                break;
            }

            case "log:thread-name": {
                dataThread.threadName = event.logMessageData.name || null;
                api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n» ${(dataThread.threadName) ? `تم تحديث اسم المجموعة الى : ${dataThread.threadName}` : 'تم حذف اسم المجموعة'}.`, threadID);
                break;
            }

            case "log:thread-icon": {
                let preIcon = JSON.parse(fs.readFileSync(iconPath));
                dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n»  ${event.logMessageBody.replace("emoticon", "icon")}\n» الايموجي الاصلي: ${preIcon[threadID] || "unclear"}`, threadID, async (error, info) => {
                    preIcon[threadID] = dataThread.threadIcon;
                    fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }

            case "log:thread-call": {
                if (logMessageData.event == "group_call_started") {
                    const name = await Users.getNameUser(logMessageData.caller_id);
                    api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n» ${name} تم بدأ مكالمة ${(logMessageData.video) ? 'فيديو ' : ''}صوتية.`, threadID);
                } else if (logMessageData.event == "group_call_ended") {
                    const callDuration = logMessageData.call_duration;

                    // Transform seconds to hours, minutes and seconds
                    let hours = Math.floor(callDuration / 3600);
                    let minutes = Math.floor((callDuration - (hours * 3600)) / 60);
                    let seconds = callDuration - (hours * 3600) - (minutes * 60);

                    // Add 0 if less than 10
                    if (hours < 10) hours = "0" + hours;
                    if (minutes < 10) minutes = "0" + minutes;
                    if (seconds < 10) seconds = "0" + seconds;

                    const timeFormat = `${hours}:${minutes}:${seconds}`;

                    api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n» ${(logMessageData.video) ? 'المكالمة انتهت' : ''}المكالمة انتهت.\n» مدة المكالمة: ${timeFormat}`, threadID);
                    
                } else if (logMessageData.joining_user) {
                    const name = await Users.getNameUser(logMessageData.joining_user);
                    api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n» ${name} تم الانضمام الى مكالمة ${(logMessageData.group_call_type == '1') ? 'فيديو ' : ''}صوتية.`, threadID);
                }
                break;
            }

            case "log:magic-words": {
                return api.sendMessage(`[⚜️] السمة ${event.logMessageData.magic_word} اضافة تأثيرات: ${event.logMessageData.theme_name}\n[⚜️] الايموجي: ${event.logMessageData.emoji_effect || "لا ايموجي"}\n[⚜️] الكل ${event.logMessageData.new_magic_word_count} تأثيرات الكلمات المضافة`, threadID);
            }

            case "log:thread-poll": {
                var str = event.logMessageData.question_json;
                var obj = JSON.parse(str);
                if (event.logMessageData.event_type == "question_creation") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID);
                }
                if (event.logMessageData.event_type == "update_vote") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID);
                }
                break;
            }

            case "log:thread-approval-mode": {
                return api.sendMessage(event.logMessageBody, threadID);
            }

            case "log:thread-color": {
                dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[⚜️] تحديث شيفرة المجموعة [⚜️]\n»  ${event.logMessageBody.replace("العنوان", "اللون")}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
};
