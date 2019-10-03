const axios = require('axios')
const IDoThings = require('../utils/idothings')
const TESLAService = require('../services/dans_tesla_service')
const thesaurus = require('../services/thesaurus_service')

class Dan {
    static goodBoit(bot, user, slackMessage){
        const {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        const acknowledge = "good boit"
        let lowered = text.toLowerCase()
        if (lowered.includes(acknowledge)){
            post.message = "thanks dad"
            return post;
        }
    }

    static greetingBoit(bot, user, slackMessage){
        const {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        const acknowledge = ["good morning", "morno", "hello"];
        let lowered = text.toLowerCase()
        let userId = user.id
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
            post.message = message;
            return post;
        }
    }

    static ahoit(boit, user, slackMessage) {
        const {text:textoit, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL('slackboit_final_piraoit.png')},
        };

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
            post.message = IDoThings.pickRandomElement(arroit)
            return post
        }
    }

    static eightBallBoit(bot, user, slackMessage) {
        const {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL('slackboit_final_eightboit.png')},
        };

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
            post.message = IDoThings.pickRandomElement(phrases)
            return post
        }
    }

    static uWu__Boit(bot, user, slackMessage) {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL('narutoboit.png')},
        };

        const acknowledge = ['kawaiiboit', 'kawaiiboit act 1', 'kawaiiboit act 2', 'kawaiiboit act 3']
        let level = 0
        let lowered = text.toLowerCase().trim()
        if(lowered.startsWith(acknowledge[1])) level = 1
        else if(lowered.startsWith(acknowledge[2])) level = 2
        else if(lowered.startsWith(acknowledge[3])) level = 3




        if(lowered.startsWith(acknowledge[0])) {
            let heh = ['(✿◠‿◠)', '≧◡≦', '(●´ω｀●)', '(◕‿◕✿)', '（＊＾Ｕ＾）人（≧Ｖ≦＊）/', '●‿●', '┏(＾0＾)┛┗(＾0＾) ┓', '(⊙‿⊙✿)', '٩◔‿◔۶',
                         '●ᴥ●', '(o´ω｀o)', 'xD', '＼(●~▽~●)', '◤(¬‿¬)◥', '(`･ω･´)', '<(`o`<)', 'ッ', '(︶ω︶)', '（ミ￣ー￣ミ）', '(`･ω･´)', '◕‿◕', '^.^', '(^Ｏ^)',
                        '◃┆◉◡◉┆▷', '╰(◡‿◡✿╰)', '⊙﹏⊙', 'q(❂‿❂)p', '◕‿◕', ':3', ':smirk_cat:', ':joy_cat:', ':smile_cat:', ':smiley_cat:']
            let uWuString = ''
            if (level === 0) {
                text = lowered.substring(acknowledge[0].length + 1)
                let diceRoll = Math.floor(Math.random() * 100)
                if (diceRoll <= 33) {
                    level = 1
                } else if (diceRoll > 33 && diceRoll <= 66) {
                    level = 2
                } else if (diceRoll > 66) {
                    level = 3
                }
            }else if(level === 1) {
                text = lowered.substring(acknowledge[1].length + 1)
            }else if(level === 2) {
                text = lowered.substring(acknowledge[2].length + 1)
                uWuString = IDoThings.pickRandomElement(heh) + ' '
            }else if(level === 3) {
                text = lowered.substring(acknowledge[3].length + 1)
                uWuString = IDoThings.pickRandomElement(heh) + ' '
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
            post.message = uWuString
            return post
        }
    }

    static partyBoit(bot, user, slackMessage){
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL('slackboit_monocle.png')},
        };

        const acknowledge = "リマインダー : Happy 420"
        if (text.includes(acknowledge)){
            post.message = ':snoop:'
            return post
        }
    }

    static async elonBoit(bot, user, slackMessage){
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        const acknowledge = 'teslaboit'
        let lowered = text.toLowerCase()

        if(lowered.includes(acknowledge)) {
            let post = {
                message: null,
                params: {icon_url:IDoThings.getImageURL('rollboit.jpg')},
            }

            //commands
            let temp = (lowered.includes('temperature') || lowered.includes('temp') || lowered.includes('cold') || lowered.includes('hot'))
            let location = (lowered.includes('location') || lowered.includes('where') || lowered.includes('place'))
            let batteryLevel = (lowered.includes('battery') || lowered.includes('charge') || lowered.includes('level'))
            let isCharging = (lowered.includes('charging'))
            let turnOnMyAC = (lowered.includes('on') || lowered.includes('up') || lowered.includes('activate'))
            let turnOffMyAC = (lowered.includes('off') || lowered.includes('down') || lowered.includes('deactivate'))


            //errors
            let errorFace = 'im dead'
            try {
                //command priority based on order here if multiple keywords in slack command
                if(temp) {
                    let degrees = await TESLAService.getMyCarsTemperature()
                    if(!degrees) { post.message = errorFace }
                    let message = ''
                    if(degrees == 69) {
                        message = ':ok_hand: _nice_ :ok_hand:'
                    }else {
                        if(degrees < 65) {
                            let cold = await thesaurus.getSynonym('cold')
                            let hope = await thesaurus.getSynonym('hope')
                            let jack = await thesaurus.getSynonym('jacket')
                            let possibleChoices = [
                                `its ${cold}`,
                                `:snowman: :snowman: :snowman:`
                                `i ${hope} you brought a ${jack} :eyes:`,
                            ]
                            message = IDoThings.pickRandomElement(possibleChoices)
                        }else if(degrees >= 65 && degrees < 80) {
                            let get_in = await thesaurus.getSynonym('get_in')
                            let nice = await thesaurus.getSynonym('nice')
                            message = `${get_in}, its ${nice} in here`
                        }else if(degrees >= 80) {
                            let boy = await thesaurus.getSynonym('boy')
                            let hot = await thesaurus.getSynonym('hot')
                            let possibleChoices = [
                                `${boy} its sure ${hot} out there!!`,
                                `:fire: :fire: :fire:`,
                            ]
                            message = IDoThings.pickRandomElement(possibleChoices)
                        }
                    }
                    post.message = message + ': ' + degrees + ' degrees'
                }else if(location){
                    let resp = await TESLAService.getMyCarsLocation()
                    if(!resp) { post.message = errorFace }
                    post.message = resp
                }else if(batteryLevel){
                    let resp = await TESLAService.getMyCarsBatteryLevel()
                    if(!resp) { post.message = errorFace }
                    let level = parseInt(resp.replace('%', ''), 10)
                    let message = ''
                    if(level > 20) {
                        let possibleChoices = [
                            'electric gas tank is at',
                            ':b:attery level',
                            'zoop',
                            ':bearoverdrive: :bearoverdrive: :bearoverdrive: :bearoverdrive:'
                        ]
                        message = IDoThings.pickRandomElement(possibleChoices)
                    }else {
                        let possibleChoices = [
                            'ruh-roh',
                            'gettin low :( ',
                            'pls feed me'
                        ]
                        message = IDoThings.pickRandomElement(possibleChoices)
                    }

                    post.message = message + ': ' + resp
                }else if(isCharging){
                    let resp = await TESLAService.isMyCarCharging()
                    let message = ''
                    if(resp == 'true' || resp) {
                        let possibleChoices = [
                            ':thumbsup_all:',
                            'yep'
                        ]
                        message = IDoThings.pickRandomElement(possibleChoices)
                    }else {
                        message = 'nope',
                        message = `:thumbsdown:`
                    }
                    post.message = message
                }else if(turnOnMyAC){
                    let resp = await TESLAService.startMyCarsClimate()
                    if(!resp) { post.message = errorFace }
                    let starting = await thesaurus.getSynonym('starting')
                    post.message = `AC/Heater is ${starting}`
                }else if(turnOffMyAC){
                    let resp = await TESLAService.stopMyCarsClimate()
                    if(!resp) { post.message = errorFace }
                    let stopping = await thesaurus.getSynonym('shutting_off')
                    post.message = `AC/Heater is ${stopping}`
                }else {
                    post.message = errorFace
                }
            } catch (error) {
                post.message = error
            }

            return post
        }
    }

    static async giffyBoiteru(bot, user, slackMessage) {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;
        /*
        BEGONE THOT
                                 BEGONE THOT
                                BEGONE THOT
                               BEGONE THOT
                              BEGONE THOT
                             BEGONE THOT
                            BEGONE THOT
                           BEGONE THOT
                          BEGONE THOT
                         BEGONE THOT
                        BEGONE THOT
                       BEGONE THOT
                      BEGONE THOT
                     BEGONE THOT
                    BEGONE THOT
                   BEGONE THOT
                  BEGONE THOT
                 BEGONE THOT
                BEGONE THOT
               BEGONE THOT
              BEGONE THOT
             BEGONE THOT
            BEGONE THOT
           BEGONE THOT
          BEGONE THOT
         BEGONE THOT
        BEGONE THOT
       BEGONE THOT
      BEGONE THOT
     BEGONE THOT
    BEGONE THOT
   BEGONE THOT
  BEGONE THOT
 BEGONE THOT
BEGONE THOT
 BEGONE THOT
  BEGONE THOT
   BEGONE THOT
    BEGONE THOT
     BEGONE THOT
    B EGONE THOT
   B  EGONE THOT
  B   EGONE THOT
 B    EGONE THOT
B     EGONE THOT
B    E GONE THOT
B   E  GONE THOT
B  E   GONE THOT
B E    GONE THOT
BE     GONE THOT
BE    G ONE THOT
BE   G  ONE THOT
BE  G   ONE THOT
BE G    ONE THOT
BEG     ONE THOT
BEG    O NE THOT
BEG   O  NE THOT
BEG  O   NE THOT
BEG O    NE THOT
BEGO     NE THOT
BEGO    N E THOT
BEGO   N  E THOT
BEGO  N   E THOT
BEGO N    E THOT
BEGON     E THOT
BEGON    E  THOT
BEGON   E   THOT
BEGON  E    THOT
BEGON E     THOT
BEGONE      THOT
BEGONE      THOT
BEGONE      THOT
BEGONE      THOT
BEGONE      THOT
BEGONE      THOT
BEGONE     T HOT
BEGONE    T  HOT
BEGONE   T   HOT
BEGONE  T    HOT
BEGONE T     HOT
BEGONE T    H OT
BEGONE T   H  OT
BEGONE T  H   OT
BEGONE T H    OT
BEGONE TH     OT
BEGONE TH    O T
BEGONE TH   O  T
BEGONE TH  O   T
BEGONE TH O    T
BEGONE THO     T
BEGONE THO    T
BEGONE THO   T
BEGONE THO  T
BEGONE THO T
BEGONE THOT
BEGONE THOT
TBEGONE THO
OTBEGONE TH
HOTBEGONE T
THOTBEGONE
 THOTBEGONE
E THOTBEGON
NE THOTBEGO
ONE THOTBEG
GONE THOTBE
EGONE THOTB
BEGONE THOT
TBEGONE THO
OTBEGONE TH
HOTBEGONE T
THOTBEGONE
 THOTBEGONE
E THOTBEGON
NE THOTBEGO
ONE THOTBEG
GONE THOTBE
EGONE THOTB
BEGONE THOT
TBEGONE THO
OTBEGONE TH
HOTBEGONE T
THOTBEGONE
 THOTBEGONE
E THOTBEGON
NE THOTBEGO
ONE THOTBEG
GONE THOTBE
EGONE THOTB
BEGONE THOT
BEGONE THOT
 BEGONE THOT
  BEGONE THOT
   BEGONE THOT
    BEGONE THOT
     BEGONE THOT
      BEGONE THOT
       BEGONE THOT
        BEGONE THOT
         BEGONE THOT
          BEGONE THOT
         BEGONE   THOT
        BEGONE     THOT
       BEGONE       THOT
      BEGONE         THOT
     BEGONE           THOT
    BEGONE             THOT
   BEGONE               THOT
  BEGONE                 THOT
 BEGONE                   THOT
BEGONE                     THOT
 BEGONE                   THOT
  BEGONE                 THOT
   BEGONE               THOT
    BEGONE             THOT
     BEGONE           THOT
      BEGONE         THOT
       BEGONE       THOT
        BEGONE     THOT
         BEGONE   THOT
          BEGONE THOT
           BEGON THOT
            BEGO THOT
             BEG THOT
              BE THOT
               B THOT
                THOTE
               THOTNE
              THOTONE
             THOTGONE
            THOTEGONE
           THOTBEGONE
          THOT  BEGONE
         THOT    BEGONE
        THOT      BEGONE
       THOT        BEGONE
      THOT          BEGONE
     THOT            BEGONE
    THOT              BEGONE
   THOT                BEGONE
  THOT                  BEGONE
 THOT                    BEGONE
  THOT                  BEGONE
   THOT                BEGONE
    THOT              BEGONE
     THOT            BEGONE
      THOT          BEGONE
       THOT        BEGONE
        THOT      BEGONE
         THOT    BEGONE
          THOT  BEGONE
           THOTBEGONE
            THOBEGONE
             THBEGONE
              TBEGONE
               BEGONE
               BEGONE
              BEGONET
             BEGONEOT
            BEGONEHOT
           BEGONETHOT
          BEGONE THOT
         BEGONE   THOT
        BEGONE     THOT
       BEGONE       THOT
      BEGONE         THOT
     BEGONE           THOT
    BEGONE             THOT
   BEGONE               THOT
  BEGONE                 THOT
 BEGONE                   THOT
BEGONE                     THOT
 BEGONE                   THOT
  BEGONE                 THOT
   BEGONE               THOT
    BEGONE             THOT
     BEGONE           THOT
      BEGONE         THOT
       BEGONE       THOT
        BEGONE     THOT
         BEGONE   THOT
          BEGONE THOT
           BEGON THOT
            BEGO THOT
             BEG THOT
              BE THOT
               B THOT
                THOTE
               THOTNE
              THOTONE
             THOTGONE
            THOTEGONE
           THOTBEGONE
          THOT  BEGONE
         THOT    BEGONE
        THOT      BEGONE
       THOT        BEGONE
      THOT          BEGONE
     THOT            BEGONE
    THOT              BEGONE
   THOT                BEGONE
  THOT                  BEGONE
 THOT                    BEGONE
  THOT                  BEGONE
   THOT                BEGONE
    THOT              BEGONE
     THOT            BEGONE
      THOT          BEGONE
       THOT        BEGONE
        THOT      BEGONE
         THOT    BEGONE
          THOT  BEGONE
           THOTBEGONE
            THOBEGONE
             THBEGONE
              TBEGONE
               BEGONE
               BEGONE
              BEGONET
             BEGONEOT
            BEGONEHOT
           BEGONETHOT
          BEGONE THOT
         BEGONE   THOT
        BEGONE     THOT
       BEGONE       THOT
      BEGONE         THOT
     BEGONE           THOT
    BEGONE             THOT
   BEGONE               THOT
  BEGONE                 THOT
 BEGONE                   THOT
BEGONE                     THOT
 BEGONE                   THOT
  BEGONE                 THOT
   BEGONE               THOT
    BEGONE             THOT
     BEGONE           THOT
      BEGONE         THOT
       BEGONE       THOT
        BEGONE     THOT
         BEGONE   THOT
          BEGONE THOT
           BEGON THOT
            BEGO THOT
             BEG THOT
              BE THOT
               B THOT
                THOTE
               THOTNE
              THOTONE
             THOTGONE
            THOTEGONE
           THOTBEGONE
          THOT  BEGONE
         THOT    BEGONE
        THOT      BEGONE
       THOT        BEGONE
      THOT          BEGONE
     THOT            BEGONE
    THOT              BEGONE
   THOT                BEGONE
  THOT                  BEGONE
 THOT                    BEGONE
  THOT                  BEGONE
   THOT                BEGONE
    THOT              BEGONE
     THOT            BEGONE
      THOT          BEGONE
       THOT        BEGONE
        THOT      BEGONE
         THOT    BEGONE
          THOT  BEGONE
           THOTBEGONE
            THOBEGONE
             THBEGONE
              TBEGONE
               BEGONE
               BEGONE
              BEGONET
             BEGONEOT
            BEGONEHOT
           BEGONETHOT
          BEGONE THOT
         BEGONE   THOT
        BEGONE     THOT
       BEGONE       THOT
      BEGONE         THOT
     BEGONE           THOT
    BEGONE             THOT
   BEGONE               THOT
  BEGONE                 THOT
 BEGONE                   THOT
BEGONE                     THOT
 BEGONE                   THOT
  BEGONE                 THOT
   BEGONE               THOT
    BEGONE             THOT
     BEGONE           THOT
      BEGONE         THOT
       BEGONE       THOT
        BEGONE     THOT
         BEGONE   THOT
          BEGONE THOT
           BEGON THOT
            BEGO THOT
             BEG THOT
              BE THOTBEGONE THOT
                                 BEGONE THOT
                                BEGONE THOT
                               BEGONE THOT
                              BEGONE THOT
                             BEGONE THOT
                            BEGONE THOT
                           BEGONE THOT
                          BEGONE THOT
                         BEGONE THOT
                        BEGONE THOT
                       BEGONE THOT
                      BEGONE THOT
                     BEGONE THOT
                    BEGONE THOT
                   BEGONE THOT
                  BEGONE THOT
                 BEGONE THOT
                BEGONE THOT
               BEGONE THOT
              BEGONE THOT
             BEGONE THOT
            BEGONE THOT
           BEGONE THOT
          BEGONE THOT
         BEGONE THOT
        BEGONE THOT
       BEGONE THOT
      BEGONE THOT
     BEGONE THOT
    BEGONE THOT
   BEGONE THOT
  BEGONE THOT
 BEGONE THOT
BEGONE THOT
 BEGONE THOT
  BEGONE THOT
   BEGONE THOT
    BEGONE THOT
     BEGONE THOT
    B EGONE THOT
   B  EGONE THOT
  B   EGONE THOT
 B    EGONE THOT
B     EGONE THOT
B    E GONE THOT
B   E  GONE THOT
B  E   GONE THOT
B E    GONE THOT
BE     GONE THOT
BE    G ONE THOT
BE   G  ONE THOT
BE  G   ONE THOT
BE G    ONE THOT
BEG     ONE THOT
BEG    O NE THOT
BEG   O  NE THOT
BEG  O   NE THOT
BEG O    NE THOT
BEGO     NE THOT
BEGO    N E THOT
BEGO   N  E THOT
BEGO  N   E THOT
BEGO N    E THOT
BEGON     E THOT
BEGON    E  THOT
BEGON   E   THOT
BEGON  E    THOT
BEGON E     THOT
BEGONE      THOT
BEGONE      THOT
BEGONE      THOT
BEGONE      THOT
BEGONE      THOT
BEGONE      THOT
BEGONE     T HOT
BEGONE    T  HOT
BEGONE   T   HOT
BEGONE  T    HOT
BEGONE T     HOT
BEGONE T    H OT
BEGONE T   H  OT
BEGONE T  H   OT
BEGONE T H    OT
BEGONE TH     OT
BEGONE TH    O T
BEGONE TH   O  T
BEGONE TH  O   T
BEGONE TH O    T
BEGONE THO     T
BEGONE THO    T
BEGONE THO   T
BEGONE THO  T
BEGONE THO T
BEGONE THOT
BEGONE THOT
TBEGONE THO
OTBEGONE TH
HOTBEGONE T
THOTBEGONE
 THOTBEGONE
E THOTBEGON
NE THOTBEGO
ONE THOTBEG
GONE THOTBE
EGONE THOTB
BEGONE THOT
TBEGONE THO
OTBEGONE TH
HOTBEGONE T
THOTBEGONE
 THOTBEGONE
E THOTBEGON
NE THOTBEGO
ONE THOTBEG
GONE THOTBE
EGONE THOTB
BEGONE THOT
TBEGONE THO
OTBEGONE TH
HOTBEGONE T
THOTBEGONE
 THOTBEGONE
E THOTBEGON
NE THOTBEGO
ONE THOTBEG
GONE THOTBE
EGONE THOTB
BEGONE THOT
BEGONE THOT
 BEGONE THOT
  BEGONE THOT
   BEGONE THOT
    BEGONE THOT
     BEGONE THOT
      BEGONE THOT
       BEGONE THOT
        BEGONE THOT
         BEGONE THOT
          BEGONE THOT
         BEGONE   THOT
        BEGONE     THOT
       BEGONE       THOT
      BEGONE         THOT
     BEGONE           THOT
    BEGONE             THOT
   BEGONE               THOT
  BEGONE                 THOT
 BEGONE                   THOT
BEGONE                     THOT
 BEGONE                   THOT
  BEGONE                 THOT
   BEGONE               THOT
    BEGONE             THOT
     BEGONE           THOT
      BEGONE         THOT
       BEGONE       THOT
        BEGONE     THOT
         BEGONE   THOT
          BEGONE THOT
           BEGON THOT
            BEGO THOT
             BEG THOT
              BE THOT
               B THOT
                THOTE
               THOTNE
              THOTONE
             THOTGONE
            THOTEGONE
           THOTBEGONE
          THOT  BEGONE
         THOT    BEGONE
        THOT      BEGONE
       THOT        BEGONE
      THOT          BEGONE
     THOT            BEGONE
    THOT              BEGONE
   THOT                BEGONE
  THOT                  BEGONE
 THOT                    BEGONE
  THOT                  BEGONE
   THOT                BEGONE
    THOT              BEGONE
     THOT            BEGONE
      THOT          BEGONE
       THOT        BEGONE
        THOT      BEGONE
         THOT    BEGONE
          THOT  BEGONE
           THOTBEGONE
            THOBEGONE
             THBEGONE
              TBEGONE
               BEGONE
               BEGONE
              BEGONET
             BEGONEOT
            BEGONEHOT
           BEGONETHOT
          BEGONE THOT
         BEGONE   THOT
        BEGONE     THOT
       BEGONE       THOT
      BEGONE         THOT
     BEGONE           THOT
    BEGONE             THOT
   BEGONE               THOT
  BEGONE                 THOT
 BEGONE                   THOT
BEGONE                     THOT
 BEGONE                   THOT
  BEGONE                 THOT
   BEGONE               THOT
    BEGONE             THOT
     BEGONE           THOT
      BEGONE         THOT
       BEGONE       THOT
        BEGONE     THOT
         BEGONE   THOT
          BEGONE THOT
           BEGON THOT
            BEGO THOT
             BEG THOT
              BE THOT
               B THOT
                THOTE
               THOTNE
              THOTONE
             THOTGONE
            THOTEGONE
           THOTBEGONE
          THOT  BEGONE
         THOT    BEGONE
        THOT      BEGONE
       THOT        BEGONE
      THOT          BEGONE
     THOT            BEGONE
    THOT              BEGONE
   THOT                BEGONE
  THOT                  BEGONE
 THOT                    BEGONE
  THOT                  BEGONE
   THOT                BEGONE
    THOT              BEGONE
     THOT            BEGONE
      THOT          BEGONE
       THOT        BEGONE
        THOT      BEGONE
         THOT    BEGONE
          THOT  BEGONE
           THOTBEGONE
            THOBEGONE
             THBEGONE
              TBEGONE
               BEGONE
               BEGONE
              BEGONET
             BEGONEOT
            BEGONEHOT
           BEGONETHOT
          BEGONE THOT
         BEGONE   THOT
        BEGONE     THOT
       BEGONE       THOT
      BEGONE         THOT
     BEGONE           THOT
    BEGONE             THOT
   BEGONE               THOT
  BEGONE                 THOT
 BEGONE                   THOT
BEGONE                     THOT
 BEGONE                   THOT
  BEGONE                 THOT
   BEGONE               THOT
    BEGONE             THOT
     BEGONE           THOT
      BEGONE         THOT
       BEGONE       THOT
        BEGONE     THOT
         BEGONE   THOT
          BEGONE THOT
           BEGON THOT
            BEGO THOT
             BEG THOT
              BE THOT
               B THOT
                THOTE
               THOTNE
              THOTONE
             THOTGONE
            THOTEGONE
           THOTBEGONE
          THOT  BEGONE
         THOT    BEGONE
        THOT      BEGONE
       THOT        BEGONE
      THOT          BEGONE
     THOT            BEGONE
    THOT              BEGONE
   THOT                BEGONE
  THOT                  BEGONE
 THOT                    BEGONE
  THOT                  BEGONE
   THOT                BEGONE
    THOT              BEGONE
     THOT            BEGONE
      THOT          BEGONE
       THOT        BEGONE
        THOT      BEGONE
         THOT    BEGONE
          THOT  BEGONE
           THOTBEGONE
            THOBEGONE
             THBEGONE
              TBEGONE
               BEGONE
               BEGONE
              BEGONET
             BEGONEOT
            BEGONEHOT
           BEGONETHOT
          BEGONE THOT
         BEGONE   THOT
        BEGONE     THOT
       BEGONE       THOT
      BEGONE         THOT
     BEGONE           THOT
    BEGONE             THOT
   BEGONE               THOT
  BEGONE                 THOT
 BEGONE                   THOT
BEGONE                     THOT
 BEGONE                   THOT
  BEGONE                 THOT
   BEGONE               THOT
    BEGONE             THOT
     BEGONE           THOT
      BEGONE         THOT
       BEGONE       THOT
        BEGONE     THOT
         BEGONE   THOT
          BEGONE THOT
           BEGON THOT
            BEGO THOT
             BEG THOT
              BE THOT
               B THOT
                THOTE
               THOTNE
              THOTONE
             THOTGONE
            THOTEGONE
           THOTBEGONE
          THOT  BEGONE
         THOT    BEGONE
        THOT      BEGONE
       THOT        BEGONE
      THOT          BEGONE
     THOT            BEGONE
    THOT              BEGONE
   THOT                BEGONE
  THOT                  BEGONE
 THOT                    BEGONE
  THOT                  BEGONE
   THOT                BEGONE
    THOT              BEGONE
     THOT            BEGONE
      THOT          BEGONE
       THOT        BEGONE
        THOT      BEGONE
         THOT    BEGONE
          THOT  BEGONE
           THOTBEGONE
            THOBEGONE
             THBEGONE
              TBEGONE
               BEGONE
               BEGONE
              BEGONET
             BEGONEOT
            BEGONEHOT
           BEGONETHOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
         BEGONE THOT
        BEGONE THOT
       BEGONE THOT
      BEGONE THOT
     BEGONE THOT
    BEGONE THOT
   BEGONE THOT
  BEGONE THOT
 BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
 BEGONE THOT
  BEGONE THOT
   BEGONE THOT
    BEGONE THOT
     BEGONE THOT
      BEGONE THOT
       BEGONE THOT
        BEGONE THOT
         BEGONE THOT
               B THOT
                THOTE
               THOTNE
              THOTONE
             THOTGONE
            THOTEGONE
           THOTBEGONE
          THOT  BEGONE
         THOT    BEGONE
        THOT      BEGONE
       THOT        BEGONE
      THOT          BEGONE
     THOT            BEGONE
    THOT              BEGONE
   THOT                BEGONE
  THOT                  BEGONE
 THOT                    BEGONE
  THOT                  BEGONE
   THOT                BEGONE
    THOT              BEGONE
     THOT            BEGONE
      THOT          BEGONE
       THOT        BEGONE
        THOT      BEGONE
         THOT    BEGONE
          THOT  BEGONE
           THOTBEGONE
            THOBEGONE
             THBEGONE
              TBEGONE
               BEGONE
               BEGONE
              BEGONET
             BEGONEOT
            BEGONEHOT
           BEGONETHOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
          BEGONE THOT
         BEGONE THOT
        BEGONE THOT
       BEGONE THOT
      BEGONE THOT
     BEGONE THOT
    BEGONE THOT
   BEGONE THOT
  BEGONE THOT
 BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
BEGONE THOT
*/


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                let lowered = text.toLowerCase()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                let acknowledge = 'gifboit'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (lowered.startsWith(acknowledge)) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text = lowered.substring(acknowledge.length + 1)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if(text.includes('pennywise') || text.includes('clown')) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        let post = {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            message: 'fuck you clown man',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            params: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        icon_url:IDoThings.getImageURL('slackboit_final_laser.jpeg')
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            spongebobify: true
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        return post
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    let api_key = 'bj0wxDW7G1GEZldQxdU5LuGxCXKGHQQV'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    let url = 'https://api.giphy.com/v1/gifs/search'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    let gifUrl = 'https://gph.is/1IGK4qV'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    let gif = await axios.get(url, {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        params: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            api_key: api_key,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            q: text
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        gifUrl = IDoThings.pickRandomElement(gif.data.data).bitly_gif_url
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    } catch (error) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    let post = {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        message: gifUrl,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        params: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    icon_url:IDoThings.getImageURL('slackboit_final_eightboit.png'),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    attachments: [{"title": text, "image_url": gifUrl}]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        spongebobify: false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    return post
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

    }

    static spookBoit(bot, user, slackMessage){
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        const acknowledge = "spookboit"
        if (text.includes(acknowledge)){
            let post = {
                message: 'https://i.imgur.com/yGTUsK0.gif',
                params: {icon_url:IDoThings.getImageURL('slackboit_spook.png'),attachments: [{"title": '', "image_url": 'https://imgur.com/a/kGhRDN3'}]},
                spongebobify: false
            }
            return post
        }
    }
}

module.exports = Dan;
