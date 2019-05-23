const Store = require('./store');
const CryptoManager = require('./crypto');
/*
 * This file is where you'll create all functions that you want the bot to run through. Each function will always be
 * passed the same parameters: bot, username, text, channel, and submittedAt. When you want to send a message, the
 * bot has a method called postMessage. Lastly, when you create your function, throw it in the Register constant
 * at the bottom of the file to make sure Slackboit uses it.
 *
 * You can return 'stop' as a string to make sure that none of the remaining functions in Register are executed.
 *
 * NOTE: For storedUser, check the store.js file for more details.
 */

let resetCryptoTime = new Date().getTime();
let listingsById = {};

class Messenger {

    static async refreshCrypto(bot, storedUser, text, channel, submittedAt){
        const acknowledge = 'SLACKBOITED RESET MY CRYPTO!!!';
        if (acknowledge === text && new Date().getTime() > resetCryptoTime){
            let res = await CryptoManager.refreshCryptoListings();
            if (res) {
                listingsById = res;
                bot.postMessage(channel, IDoThings.spongebobMemeify('resetted crypto'), {});
                resetCryptoTime = Date().getTime() + 6000;
                return 'stop';
            }
        }
    }

    static getCrypto(bot, storedUser, text, channel, submittedAt){
        const acknowledge = 'slackboiter what is ';

        if (text.startsWith(acknowledge) && text.length === 23){
            let symbol = text.substring(text.length - 3).toUpperCase();
            let cryptoObject = CryptoManager.getCryptoObjectBySymbol(listingsById, symbol);
            const {cmc_rank, quote} = cryptoObject;
            let newObject = {cmc_rank, quote};

            bot.postMessage(channel, JSON.stringify(newObject), {});
        }
    }

    static omaeWaMouShindeiru(bot, storedUser, text, channel, submittedAt){
        const kill = 'お前はもう死んでいる';
        const acknowledge = 'slackboit ';
        let lowered = text.toLowerCase();

        if (lowered === acknowledge + kill){
            bot.postMessage(channel, 'なに', {});
            Store.disabledUntil = new Date().getTime() + 60 * 1000;
            return 'stop';
        }
    }

    static spongebobMeme(bot, storedUser, text, channel, submittedAt){
        const acknowledge = 'slackboit ';
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge)) {
            let profile = storedUser['profile'];
            return bot.postMessage(channel, IDoThings.spongebobMemeify(lowered), {});
        }
    }

    static goodBoit(bot, storedUser, text, channel, submittedAt){
        const acknowledge = "good boit";
        let lowered = text.toLowerCase();
        if (lowered.includes(acknowledge))
            return bot.postMessage(channel, IDoThings.spongebobMemeify("thanks dad"), {});
    }

    static greetingBoit(bot, storedUser, text, channel, submittedAt){
        const acknowledge = ["good morning", "morno", "hello"];
        let lowered = text.toLowerCase();
        let profile = storedUser['profile'];
        let username = profile['display_name'];
        let boitRespond = false;
        for(let phrase of acknowledge )
        {
            if(lowered.includes(phrase)) boitRespond = true
        }
        if (boitRespond)
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

    static ahoit(boit, noThanks, textoit, channel, submittedAt)
    {
        const acknoit= "ahoy slackboit";
        let loit = textoit.toLowerCase();
        if(loit.includes(acknoit))
        {
            let arroit = [
                "shiver me timbers",
                "my leg",
                "argh matey",
                "yer a salty sea dog",
                "yo ho yo ho",
                "avast, ye land lubber"
            ];

            return boit.postMessage(channel, IDoThings.spongebobMemeify(IDoThings.pickRandomElement(arroit)), {
                icon_url:'https://slackboit.davon.dev/static/imgs/slackboit_final_piraoit.png'
            });
        }
    }

    static eightBallBoit(bot, noThanks, text, channel, submittedAt)
    {
        const acknowledge= "slackboit,";
        let lowered = text.toLowerCase();
        if(lowered.startsWith(acknowledge) && lowered.endsWith("?"))
        {
            let phrases = [
                "It is certain",
                "It is decidedly so",
                "Without a doubt",
                "Yes - definitely",
                "You may rely on it",
                "As I see it, yes",
                "Most likely",
                "Outlook good",
                "Yes",
                "Signs point to yes",
                "Reply hazy, try again",
                "Ask again later",
                "Better not tell you now",
                "Cannot predict now",
                "Concentrate and ask again",
                "Don't count on it",
                "My reply is no",
                "My sources say no",
                "Outlook not so good",
                "Very doubtful"
            ];

            return bot.postMessage(channel, IDoThings.spongebobMemeify(IDoThings.pickRandomElement(phrases)), {
                icon_url:'https://slackboit.davon.dev/static/imgs/slackboit_final_eightboit.png'
            });
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

    static pickRandomElement(list)
    {
        return list[Math.floor(Math.random() * list.length)];
    }

    static getName(username)
    {
        username = username.toLowerCase();
        if(username.includes('logab'))
        {
            return 'desu-chan'
        }else if(username.includes('Dan'))
        {
            return 'dank-kun'
        }else if(username.includes('Andy Miller'))
        {
            return 'andrew michael sebrene-chan'
        }else if(username.includes('Burtle'))
        {
            return 'andrew "boitle" burtle'
        }else if(username.includes('yeetus'))
        {
            return 'yoitus'
        }else if(username.includes('Jamz'))
        {
            return 'james "hams" jamz-kun'
        }else 
        {
            return username;
        }
    }
}

const Register = [
    Messenger.getCrypto,
    Messenger.refreshCrypto,
    Messenger.ahoit,
    Messenger.eightBallBoit,
    Messenger.omaeWaMouShindeiru,
    Messenger.goodBoit,
    Messenger.spongebobMeme,
    Messenger.greetingBoit
];

module.exports = Register;

