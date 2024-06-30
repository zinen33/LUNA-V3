module.exports.config = {
    name: "اعلام",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "عمر",
    description: "لعبة احزر العلم",
    usages: ["لعبة"],
    commandCategory: "العاب",
    cooldowns: 0
};

const fs = require('fs');
const axios = require('axios');
const tempImageFilePath = __dirname + "/cache/tempImage.jpg";

module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
    const userAnswer = event.body.trim().toLowerCase();
    const correctAnswer = handleReply.correctAnswer.toLowerCase();
    const userName = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);

    if (userAnswer === correctAnswer) {
        Currencies.increaseMoney(event.senderID, 1);  // تأكد من وضع قيمة المكافأة هنا
        api.sendMessage(`✅ | ${userName} إجابتك صحيحة`, event.threadID);

        api.unsendMessage(handleReply.messageID);
    } else {
        api.sendMessage(`خطأ، حاول مرة أخرى`, event.threadID);
    }

    fs.unlinkSync(tempImageFilePath);
};

async function sendGameMessage(api, threadID) {
    const questions = [
        { image: "https://i.pinimg.com/originals/6f/a0/39/6fa0398e640e5545d94106c2c42d2ff8.jpg", answer: "العراق" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/256px-Flag_of_Brazil.svg.png", answer: "البرازيل" },
        { image: "https://i.pinimg.com/originals/66/38/a1/6638a104725f4fc592c1b832644182cc.jpg", answer: "فلسطين" },
        { image: "https://i.pinimg.com/originals/f9/47/0e/f9470ea33ff6fb5b0b8bb00a5ccb4.jpg", answer: "المغرب" },
        { image: "https://i.pinimg.com/originals/2d/a2/6e/2da26e58efd5f32fe2e33b9654907ab5.gif", answer: "الصومال" },
        { image: "https://i.postimg.cc/CLK3nHk8/images-1.jpg", answer: "إسرائيل" },
        { image: "https://i.pinimg.com/originals/0e/10/d2/0e10d2240dd28af2eff27ce0fa8b5b8d.jpg", answer: "اليابان" },
        { image: "https://i.pinimg.com/originals/e8/8e/e7/e88ee7f3ba7ff9181aabdd9520bdfa64.jpg", answer: "الجزائر" },
        { image: "https://i.pinimg.com/564x/21/47/ba/2147ba2a3780fb5b9395af5a0eb30deb.jpg", answer: "سوريا" },
        { image: "https://i.pinimg.com/564x/a9/e9/c3/a9e9c3a54aa9fbe2400cc85c8dc45dc3.jpg", answer: "ليبيا" },
        { image: "https://i.pinimg.com/564x/72/d7/d9/72d7d9586177d3cd05adbd0d9f494b20.jpg", answer: "السعودية" },
        { image: "https://i.pinimg.com/564x/e1/2d/13/e12d13ee06067dc324086ac1cf699a4f.jpg", answer: "تونس" },
        { image: "https://i.pinimg.com/564x/03/d1/24/03d1245ce41669d15ab285c31e1b2b4c.jpg", answer: "موريتانيا" },
        { image: "https://i.pinimg.com/564x/69/b2/0a/69b20a2431b0f6105661f1d4d5d7509c.jpg", answer: "كوريا" },
        { image: "https://i.pinimg.com/236x/53/76/b4/5376b4793712faa060cabb4fe8e85b20.jpg", answer: "الصين" },
        { image: "https://i.pinimg.com/564x/8a/40/f6/8a40f62eadc052d92641ec1f32f67053.jpg", answer: "الارجنتين" },
        { image: "https://i.pinimg.com/236x/c8/aa/36/c8aa36dadd87d63233ef72e84aebe694.jpg", answer: "كندا" },
        { image: "https://i.pinimg.com/564x/d3/28/0f/d3280f4c8423cb190eebadd0acc6c88e.jpg", answer: "فرنسا" },
        { image: "https://i.pinimg.com/236x/8f/ef/24/8fef241778c6e4c6bfcdab543567adff.jpg", answer: "امريكا" },
        { image: "https://i.pinimg.com/236x/41/cf/c8/41cfc821d08adfdee59d6a3503ba0c0b.jpg", answer: "لبنان" },
        { image: "https://i.pinimg.com/564x/49/1d/40/491d4027acb78b7d4bad83ed011cb0db.jpg", answer: "البوسنة" },
        { image: "https://i.pinimg.com/564x/2d/2d/6e/2d2d6ec65a733e1a04c4442ed1aad404.jpg", answer: "الكويت" },
        { image: "https://i.pinimg.com/564x/94/46/15/94461526e1bdd96f36daf2a788c51ea7.jpg", answer: "الاردن" },
        { image: "https://i.pinimg.com/564x/d0/da/17/d0da173c43093d6dd7d557bdbc8fef65.jpg", answer: "السودان" },
        { image: "https://i.pinimg.com/564x/4f/f7/36/4ff736715682f408b3683cbc89c8e166.jpg", answer: "بريطانيا" },
        { image: "https://i.pinimg.com/236x/40/0a/7a/400a7a4ed35c8e7e847d9a105fbf098a.jpg", answer: "الهند" },
        { image: "https://i.pinimg.com/564x/45/a1/52/45a152547ef5afc0875d705a59d28573.jpg", answer: "بولندا" },
        { image: "https://i.pinimg.com/564x/fa/cb/ec/facbecb0fdabf0d22b0e4c2dbbac7c63.jpg", answer: "بورتوريكو" },
        { image: "https://i.pinimg.com/564x/0a/eb/02/0aeb028d568adf3772ded313cceb288d.jpg", answer: "الدنمارك" },
        { image: "https://i.pinimg.com/564x/d8/31/f1/d831f19af6450de0859baf975581994c.jpg", answer: "المانيا" },
        { image: "https://i.pinimg.com/564x/6a/b5/fe/6ab5fe27d6b1ca8b5d028afee1a6f7e8.jpg", answer: "سويسرا" },
        { image: "https://i.pinimg.com/564x/8e/52/a7/8e52a79e25ea5b8da3cc1c5ca199c2d5.jpg", answer: "قطر" },
        { image: "https://i.pinimg.com/236x/71/16/33/711633aa590dba2b6b55c5dec8cf00a8.jpg", answer: "ماليزيا" },
        { image: "https://i.pinimg.com/236x/2a/cb/7d/2acb7d9371550e4f145d5a1a841a41cb.jpg", answer: "فيتنام" },
        { image: "https://i.pinimg.com/236x/2c/60/86/2c608693f21531817c6b10129840e9b3.jpg", answer: "المك" },
        
