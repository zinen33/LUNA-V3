const fs = require('fs');
const path = require('path');

function readJSONFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJSONFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const usersFilePath = path.join(__dirname, 'users.json');
const threadsFilePath = path.join(__dirname, 'threads.json');

module.exports = {
    Preset: {
        name: "تقييد",
        version: "1.0.0",
        hasPermssion: 2,
        credits: "حضر",
        description: "منع",
        commandCategory: "المطور",
        usages: "send message",
        cooldowns: 5,
    },
    Start: async function({ args, api, Message, event }) {
        // Load users and threads data from JSON files
        const usersData = readJSONFile(usersFilePath);
        const threadsData = readJSONFile(threadsFilePath);

        const thqq = event.participantIDs;
        for (let uid of thqq) {
            if (!usersData[uid]) {
                usersData[uid] = { name: null, gender: null };
            }
        }

        let name = usersData[event.senderID]?.name || "Unknown User";
        let box = threadsData[event.threadID]?.adbox || false;

        if (!box) {
            threadsData[event.threadID] = { adbox: true };
            Message.react("🔒");
            api.changeNickname(`𝙻𝚄𝙽𝙰︙➟❎`, event.threadID, api.getCurrentUserID());
            Message.reply(`تم تقييد البوت ✅\nالفاعل: ${name}`);
        } else {
            threadsData[event.threadID].adbox = false;
            Message.react("🔓");
            api.changeNickname(`𝙻𝚄𝙽𝙰︙➟✅`, event.threadID, api.getCurrentUserID());
            Message.reply(`تم الغاء تقييد البوت ✅\nالفاعل: ${name}`);
        }

        // Save users and threads data back to JSON files
        writeJSONFile(usersFilePath, usersData);
        writeJSONFile(threadsFilePath, threadsData);
    }
};
