const IDoThings = require('../utils/idothings');

class Dan {
    static goodBoit(bot, storedUser, text, channel){
        const acknowledge = "good boit"
        let lowered = text.toLowerCase()
        if (lowered.includes(acknowledge))
            return bot.postMessage(channel, IDoThings.spongebobMemeify("thanks dad"), {})
    }

    static greetingBoit(bot, storedUser, text, channel){
        const acknowledge = ["good morning", "morno", "hello"];
        let lowered = text.toLowerCase()
        let userId = storedUser.id
        let boitRespond = false
        for(let phrase of acknowledge )
        {
            if(lowered.includes(phrase)) boitRespond = true
        }
        if (boitRespond)
        {
            let message = ''
            if(lowered.includes('good morning') || lowered.includes('morno'))
            {
                message = "good morning"
            }else
            {
                message = "greetings"
            }
            message += " " + IDoThings.convertToAids(userId)
            return bot.postMessage(channel, IDoThings.spongebobMemeify(message), {})
        }
    }

    static ahoit(boit, storedUser, textoit, channel) {
        const acknoit = "ahoy slackboit"
        let loit = textoit.toLowerCase()
        if (loit.includes(acknoit)) {
            let arroit = [
                "shiver me timbers",
                "my leg",
                "argh matey",
                "yer a salty sea dog",
                "yo ho yo ho",
                "avast, ye land lubber"
            ]
            const icon_url = IDoThings.getImageURL('slackboit_final_piraoit.png')
            const message = IDoThings.spongebobMemeify(IDoThings.pickRandomElement(arroit))
            return boit.postMessage(channel, message, {icon_url})
        }
    }

    static eightBallBoit(bot, storedUser, text, channel) {
        const acknowledge = "slackboit,"
        let lowered = text.toLowerCase()
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
            ]
            const icon_url = IDoThings.getImageURL('slackboit_final_eightboit.png')
            const message = IDoThings.spongebobMemeify(IDoThings.pickRandomElement(phrases))
            return bot.postMessage(channel, message, {icon_url})
        }
    }

    static uWu__Boit(bot, storedUser, text, channel) {
        const acknowledge = ['kawaiiboit', 'kawaiiboit act 2', 'kawaiiboit act 3']
        let level = 1
        let lowered = text.toLowerCase()
        if(lowered.startsWith(acknowledge[1])) level = 2
        else if(lowered.startsWith(acknowledge[2])) level = 3

        if(lowered.startsWith(acknowledge[0])) {
            let level = 1
            let heh = ['(✿◠‿◠)', '≧◡≦', '(●´ω｀●)', '(◕‿◕✿)', '（＊＾Ｕ＾）人（≧Ｖ≦＊）/', '●‿●', '┏(＾0＾)┛┗(＾0＾) ┓', '(⊙‿⊙✿)', '٩◔‿◔۶',
                         '●ᴥ●', '(o´ω｀o)', 'xD', '＼(●~▽~●)', '◤(¬‿¬)◥', '(`･ω･´)', '<(`o`<)', 'ッ', '(︶ω︶)', '（ミ￣ー￣ミ）', '(`･ω･´)', '◕‿◕', '^.^', '(^Ｏ^)',
                        '◃┆◉◡◉┆▷', '╰(◡‿◡✿╰)', '⊙﹏⊙', 'q(❂‿❂)p', '◕‿◕', ':3', ':smirk_cat:', ':joy_cat:', ':smile_cat:', ':smiley_cat:']
            let uWuString = ''
            if(lowered.startsWith(acknowledge[1])) {
                level = 2
                text = lowered.substring(acknowledge[1].length + 1)
                uWuString = IDoThings.pickRandomElement(heh) + ' '
            }else if(lowered.startsWith(acknowledge[2])) {
                level = 3
                text = lowered.substring(acknowledge[2].length + 1)
                uWuString = IDoThings.pickRandomElement(heh) + ' '
            }else {
                text = lowered.substring(acknowledge[0].length + 1)
            }

            for(let i = 0; i < text.length; i++) {
                let currentLetter = text[i]
                let previousLetter = text[i-1]
                let shouldAppend = true
                if(level == 2 || level == 3) {
                    switch(currentLetter) {
                        case '!':
                            uWuString += '! ' + IDoThings.pickRandomElement(heh)
                            shouldAppend = false
                            break
                        case '.':
                            uWuString += '. ' + IDoThings.pickRandomElement(heh)
                            shouldAppend = false
                            break
                        case '?':
                            uWuString += '? ' + IDoThings.pickRandomElement(heh)
                            shouldAppend = false
                            break
                        case ' ':
                            let rng = Math.floor(Math.random() * 100)
                            if(rng < 10) { //10% chance to appear
                                uWuString += ' ' + IDoThings.pickRandomElement(heh) + ' '
                                shouldAppend = false
                            }
                            break
                        default:
                            break
                    }
                }
                if(level == 3){
                    switch(currentLetter) {
                        case 'c':
                            previousLetter = text[i-1]
                            if(previousLetter) {
                                if(previousLetter == ' ') {
                                    uWuString += 'c-c-'
                                }
                            }
                            break
                        case 'd':
                            previousLetter = text[i-1]
                            if(previousLetter) {
                                if(previousLetter == ' ') {
                                    uWuString += 'd-d-'
                                }
                            }
                            break
                        case 'p':
                            previousLetter = text[i-1]
                            if(previousLetter) {
                                if(previousLetter == ' ') {
                                    uWuString += 'p-p-'
                                }
                            }
                            break
                        case 't':
                            previousLetter = text[i-1]
                            if(previousLetter) {
                                if(previousLetter == ' ') {
                                    uWuString += 't-t-'
                                }
                            }
                            break
                        case 'o':
                            uWuString += 'owo'
                            shouldAppend = false
                            break
                        case 'u':
                            uWuString += 'uwu'
                            shouldAppend = false
                            break
                        default:
                            break
                    }
                }
                switch(currentLetter) {
                    case 'l':
                        uWuString += 'w'
                        break
                    case 'n':
                        if(i + 1 < text.length) {
                            let nextLetter = text[i+1]
                            if(nextLetter == 'a' || nextLetter == 'e' || nextLetter == 'i' || nextLetter == 'o' || nextLetter == 'u') {
                                uWuString += 'ny'
                            }else {
                                uWuString += 'n'
                            }
                        }
                        break
                    case 'r':
                        uWuString += 'w'
                        break
                    default:
                        if(shouldAppend) uWuString += currentLetter
                        break
                }

            }
            if(level == 2 || level == 3) {
                uWuString += ' ' + IDoThings.pickRandomElement(heh)
            }
            const icon_url = IDoThings.getImageURL('narutoboit.png')
            return bot.postMessage(channel, IDoThings.spongebobMemeify(uWuString), {icon_url})
        }
    }

    static partyBoit(bot, storedUser, text, channel){
        const acknowledge = "リマインダー : Happy 420 @everyone"
        if (text.includes(acknowledge)){
            const icon_url = IDoThings.getImageURL('slackboit_monocle.png')
            return bot.postMessage(channel, ':snoop:', {icon_url})
        }
    }
}

module.exports = Dan;
