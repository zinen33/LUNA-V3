module.exports.config = {
    name: "سيم",
    version: "4.3.7",
    hasPermssion: 2,
    credits: "عمر", 
    description: "استخدم الامر .سيم تشغيل \n .سيم ايقاف",
    commandCategory: "خدمات",
    usages: "[نص]",
    cooldowns: 5
};

async function simsimi(a) {
    const g = encodeURIComponent(a);
    try {
        const response = await fetch("https://simsimi.vn/web/simtalk", {
            method: "POST",
            headers: {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-GB,en;q=0.9,fr-MA;q=0.8,fr;q=0.7,en-US;q=0.6",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": "\"Android\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "Referer": "https://simsimi.vn/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: `text=${g}&lc=ar`
        });

        const data = await response.json();
        return { error: !1, data: data };
    } catch (p) {
        return { error: !0, data: {} };
    }
}

module.exports.onLoad = async function () {
    if (typeof global === "undefined") {
        global = {};
    }
    if (typeof global.simsimi === "undefined") {
        global.simsimi = new Map();
    }
};

module.exports.handleEvent = async function ({ api: b, event: a }) {
    const { threadID: c, messageID: d, senderID: e, body: f } = a;
    const g = (e) => b.sendMessage(e, c, d);
    if (global.simsimi.has(c)) {
        if (e == b.getCurrentUserID() || "" == f || d == global.simsimi.get(c)) return;
        var { data: h, error: i } = await simsimi(f);
        if (i) return;
        if (!h.success) return g(h.error);
        return g(h.success);
    }
};

module.exports.run = async function ({ api: b, event: a, args: c }) {
    const { threadID: d, messageID: e } = a;
    const f = (c) => b.sendMessage(c, d, e);
    if (0 == c.length) return f("عيوني");
    switch (c[0]) {
        case "تشغيل":
            return global.simsimi.has(d) ? f("عيوني.") : (global.simsimi.set(d, e), f("تم تشغيل سمسمي."));
        case "ايقاف":
            return global.simsimi.has(d) ? (global.simsimi.delete(d), f("تم ايقاف تشغيل سمسمي.")) : f("تم ايقاف تشغيل سمسمي.");
        default:
            var { data: g, error: h } = await simsimi(c.join(" "));
            if (h) return;
            if (!g.success) return f(g.error);
            return f(g.success);
    }
};
