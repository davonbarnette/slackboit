const IDoThings = require('../utils/idothings');

class Dan {
    static goodBoit(bot, storedUser, text, channel){
        const acknowledge = "good boit";
        let lowered = text.toLowerCase();
        if (lowered.includes(acknowledge))
            return bot.postMessage(channel, IDoThings.spongebobMemeify("thanks dad"), {});
    }

    static greetingBoit(bot, storedUser, text, channel){
        const acknowledge = ["good morning", "morno", "hello"];
        let lowered = text.toLowerCase();
        let userId = storedUser.id;
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
                message = "good morning"
            }else
            {
                message = "greetings"
            }
            message += " " + IDoThings.convertToAids(userId);
            return bot.postMessage(channel, IDoThings.spongebobMemeify(message), {});
        }
    }

    static ahoit(boit, noThanks, textoit, channel) {
        const acknoit = "ahoy slackboit";
        let loit = textoit.toLowerCase();
        if (loit.includes(acknoit)) {
            let arroit = [
                "shiver me timbers",
                "my leg",
                "argh matey",
                "yer a salty sea dog",
                "yo ho yo ho",
                "avast, ye land lubber"
            ];
            const icon_url = IDoThings.getImageURL('slackboit_final_piraoit.png');
            const message = IDoThings.spongebobMemeify(IDoThings.pickRandomElement(arroit));
            return boit.postMessage(channel, message, {icon_url});
        }
    }

    static eightBallBoit(bot, noThanks, text, channel) {
        const acknowledge = "slackboit,";
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge) && lowered.endsWith("?")) {
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
            const icon_url = IDoThings.getImageURL('slackboit_final_eightboit.png');
            const message = IDoThings.spongebobMemeify(IDoThings.pickRandomElement(phrases));
            return bot.postMessage(channel, message, {icon_url});
        }
    }
}

module.exports = Dan;