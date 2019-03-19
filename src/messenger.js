const Store = require('./store');

/*
 * This file is where you'll create all functions that you want the bot to run through. Each function will always be
 * passed the same parameters: bot, username, text, channel, and submittedAt. When you want to send a message, the
 * bot has a method called postMessage. Lastly, when you create your function, throw it in the Register constant
 * at the bottom of the file to make sure Slackboit uses it.
 *
 * NOTE: For storedUser, check the store.js file for more details.
 */

class Messenger {

    static omaeWaMouShindeiru(bot, storedUser, text, channel, submittedAt){
        const kill = 'お前はもう死んでいる';
        const acknowledge = 'slackboit ';
        let lowered = text.toLowerCase();

        if (lowered === acknowledge + kill){
            bot.postMessage(channel, 'なに', {});
            return Store.disabledUntil = new Date().getTime() + 60 * 1000;
        }
    }

    static spongebobMeme(bot, storedUser, text, channel, submittedAt){
        const acknowledge = 'slackboit ';
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge)) {
            let profile = storedUser['profile'];
            let image = profile['image_48'];
            return bot.postMessage(channel, IDoThings.spongebobMemeify(lowered), {icon_url:image});
        }
    }

    static goodBoit(bot, storedUser, text, channel, submittedAt){
        const acknowledge = "good boit";
        let lowered = text.toLowerCase();
        if (lowered.includes(acknowledge)) return bot.postMessage(channel, IDoThings.spongebobMemeify("thanks dad"), {});
    }

    static greetingBoit(bot, storedUser, text, channel, submittedAt){
        const acknowledge = ["good morning", "morno", "hello"];
        let lowered = text.toLowerCase();
        let profile = storedUser['profile'];
        let username = profile['display_name'];

        if (acknowledge.includes(lowered))
        {
            let message = '';
            if(lowered.includes('good morning') || lowered.includes('morno'))
            {
                message = "good morning "
            }else
            {
                message = "greetings "
            }
            message += " " + IDoThings.getName(username);
            return bot.postMessage(channel, IDoThings.spongebobMemeify(message), {});
        } 
    }
}

class IDoThings {
    //this functions expects a string
    static spongebobMemeify(text)
    {
        if(text.startsWith('slackboit '))
        {
            text = text.split('');
            text.splice(0,10);
        }else{
            text = text.split('')
        }
        let memed = text.map((char, index) => {
            if (index % 2 === 0) return char.toLowerCase();
            else return char.toUpperCase();
        }).join('');

        return memed;
    }

    static getName(username)
    {
        if(username.includes('logab'))
        {
            return 'logan-san'
        }else if(username.includes('Dan'))
        {
            return 'dan-kun'
        }else if(username.includes('Andy Miller'))
        {
            return 'sebrene-chan'
        }else if(username.includes('Burtle'))
        {
            return 'andrew "boitle" burtle'
        }else if(username.includes('Davon Barnette'))
        {
            return 'dabbo-sama'
        }else if(username.includes('Jamz'))
        {
            return 'james-kun'
        }else 
        {
            return username;
        }
    }
}

const Register = [
    Messenger.goodBoit,
    Messenger.spongebobMeme,
    Messenger.omaeWaMouShindeiru,
    Messenger.greetingBoit
];

module.exports = Register;

