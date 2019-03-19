const Store = require('./store');

/*
 * This file is where you'll create all functions that you want the bot to run through. Each function will always be
 * passed the same parameters: bot, username, text, channel, and submittedAt. When you want to send a message, the
 * bot has a method called postMessage. Lastly, when you create your function, throw it in the Register constant
 * at the bottom of the file to make sure Slackboit uses it.
 */

class Messenger {

    static omaeWaMouShindeiru(bot, username, text, channel, submittedAt){
        const kill = 'お前はもう死んでいる';
        const acknowledge = 'slackboit ';
        let lowered = text.toLowerCase();

        if (lowered === acknowledge + kill){
            bot.postMessage(channel, 'なに', {});
            return Store.disabledUntil = new Date().getTime() + 60 * 1000;
        }
    }

    static spongebobMeme(bot, username, text, channel, submittedAt){
        const acknowledge = 'slackboit ';
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge)) {
            let split = text.split('');
            split.splice(0, 10);

            let joined = split.map((char, index) => {
                if (index % 2 === 0) return char.toLowerCase();
                else return char.toUpperCase();
            }).join('');

            return bot.postMessage(channel, joined, {});
        }
    }

    static goodBoit(bot, username, text, channel, submittedAt){
        const acknowledge = "good boit";
        let lowered = text.toLowerCase();
        if (lowered.includes(acknowledge)) return bot.postMessage(channel, "tHaNkS DaD", {});
    }
}

const Register = [
    Messenger.goodBoit,
    Messenger.spongebobMeme,
    Messenger.omaeWaMouShindeiru
];

module.exports = Register;

