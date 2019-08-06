const Store = require('../store');
const IDoThings = require('../utils/idothings');
const EatMeDaddyService = require('../services/eat_me_daddy_service');
const axios = require('axios');

class James {
    //Post a new example function below this line:

    /* This is my version Bitches, also if you would like to add in a REAL food choice of some food establishment near the Atlanta area, you are welcome to.*/
    /* static fatBoit(bot, storedUser, text, channel){
        const hangry = 'feed me boit';
        let lCase = text.toLowerCase();
        if (lCase.startsWith(hangry)) {
            let foodChoices =
                [
                    "Victory",
                    "Taco Bell",
                    "Del Taco",
                    "Zaxby's",
                    "Da Vincis",
                    "Bell Street Burrito",
                    "Five Guys",
                    "Superica",
                    "bartaco",
                    "Pub Subs",
                    "KFC",
                    "The Vortex",
                    "Chipotle",
                    "Wagaya",
                    "Ton Ton",
                    "Co",
                    "Waffle House",
                    "Chick Fil a",
                    "Stevi B's",
                    "9292",
                    "D92",
                    "Babs",
                    "Bojangles",
                    "Moe's",
                    "Cookout",
                    "IHOP",
                    "Jimmy Johns",
                    "Whole Foods Hot Bar",
                    "Tazikis",
                    "Salata",
                    "Sushi",
                    "Krog Street",
                    "Farm Burger",
                ];

            const icon_url = IDoThings.getImageURL('slackboit_chef.png');
            const choice = IDoThings.pickRandomElement(foodChoices);
            return bot.postMessage(channel,`Today I think you should try, ${choice}`, {icon_url});
        }
    }*/

        /*Dis my test version, biatches*/
    static async fatBoit(bot, user, slackMessage) {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url: IDoThings.getImageURL('slackboit_chef.png')},
        };

        const feedMe = 'feed me boit ';
        let lCase = text.toLowerCase();
        if (lCase.startsWith(feedMe)) {
            //Once it contains feedMe then it will determine if they used the correct beginning word (add/del/get)
            let subStrang = lCase.substr(feedMe.length);
            // format >> add|name|type|location
            if (subStrang.startsWith("add")) {
                let sploice = subStrang.split("|");
                let name = sploice[1];
                let type = sploice[2];
                let location = sploice[3];
                let addWaiting = await EatMeDaddyService.createASpotToEatDaddy(user.id, name, type, location);
                if (addWaiting) {
                    post.message = `you have successfully added ${name} to ${location}!`;
                    return post;
                } else {
                    post.message = "I cAnNoT aDd BeCaUsE wRoNg 4mAt";
                    return post;
                }
            }
            // format del|name|location
            if (subStrang.startsWith("del")) {
                let secondSploice = subStrang.split("|");
                let name = secondSploice[1];
                let location = secondSploice[2];
                let delWaiting = await EatMeDaddyService.deleteASpotToEatDaddy(name, location);
                if (delWaiting) {
                    post.message = `you have successfully deleted ${name} from ${location}!`;
                    return post;
                } else {
                    post.message = "I cAnNoT dElEtE tHaT, wRoNg 4mAt";
                    return post;
                }
            }
            // If no text or spaces after feed me boit he will return a choice from all options
            if (subStrang === "") {
                let allChoice = await EatMeDaddyService.getAllSpotsToEatDaddy();
                if (allChoice) {
                    let randomPick = IDoThings.pickRandomElement(allChoice);
                    let memeChoice = IDoThings.spongebobMemeify(randomPick);
                    post.message = `i think you should try, ${memeChoice}`;
                    return post;
                }
            }
            // If there is text behind feed me boit it will pass it through EatMeDaddy
            else {
                let location = subStrang;
                let boitChoice = await EatMeDaddyService.getAllSpotsToEatDaddy(location);
                if (boitChoice !== 0) {
                    let randoPick = IDoThings.pickRandomElement(boitChoice);
                    let memeBoitChoice = IDoThings.spongebobMemeify(randoPick);
                    post.message = `i think you should try, ${memeBoitChoice}`;
                    return post;
                }
                // If the string passed through doesn't exist in the Database, will return error
                else {
                    post.message = `there is nothing on the menu for ${location}`;
                    return post;
                }
            }
        }
    }
        
    /* Where the boit is that establishment?! 
        THIS IS MY NO NO SQUARE!
    */
    static async whereFoodBoit(bot, user, slackMessage) {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url: IDoThings.getImageURL('mapboit.png')},
            spongebobify:false,
        };

        const mapMe = 'mapboit ';
        let lCase = text.toLowerCase();
        let place = IDoThings.spongebobMemeify(lCase, mapMe);
        if (lCase.startsWith(mapMe))
            {
                let encodeBoit = encodeURIComponent(place);
                let maps = 'https://google.com/maps/search/';
                post.message = `${maps}${IDoThings.spongebobMemeify(encodeBoit)}`;
                return post;
            }
    }

    static async urbanBoit(bot, user, slackMessage) {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        //urbanboit [word]
        //takes the new word, strips off the acknowledge
        //uses the word and appends to the url
        //awaits the results, then uses those results to pick a random definition
        //posts the random definition by multiple sections

        const acknowledge = 'urbanboit ';
        let lCase = text.toLowerCase();
        if (lCase.startsWith(acknowledge)) {
            searchWord = IDoThings.deletusAcknowledge(acknowledge);
            let encodeWord = encodeURIComponent(searchWord);
            let apiResults = await axios.get(`https://api.urbandictionary.com/v0/define?term={${encodeWord}}`);
            if (apiResults) {
                let apiObject = apiResults.data.list;
                //let randomDef = IDoThings.pickRandomElement(apiObject);
                let definition = apiObject[0].definition;
                let author = apiObject[0].author;
                let example = apiObject[0].example;
                post.message = `searching for: ${searchWord}
                definition: ${definition}
                example: ${example}
                author: ${author}`;
                return post;

            }
            else {
                post.message = "eRrOr";
                return post;
            }
        }
    }

    /*static async smdhBoit(bot, user, slackMessage) {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null, 
            params: {icon_url: IDoThings.getImageURL(``)},
        };

        const smdhText = `smdh`;
        let lCase = text.toLowerCase();
        if (lCase.includes(smdhText)) {
            let s = await db.call(sList);
            let m = await db.call(mList);
            let d = await db.call(dList);
            let h = await db.call(hList);
            let smdhArray = [s,m,d,h];
            for (i = 0; i < 4; i++) {
                if (smdhArray[i]) {
                    let smdhRandom[i] = IDoThings.pickRandomElement(smdhArray[i]);
                    message = `${smdhRandom[i]}`
                }
                else {
                    message = "ErRoR";
                }
                post.message = message;
                return post
            }
        }
    }*/
    
    /*Are you ready to rumble?
    static rumbleBoit(bot, storedUser, text, channel){
        const readyToRumble = 'Battle Royale ';
        let lCase = text.toLowerCase;
        if (lCase.startsWith(readyToRumble)){
            let break = readyToRumble.substr(13);
            let breakdown = break.split(" vs ");
            let oppoOne = breakdown[0];
            let oppoTwo = breakdown[1];
            let oppoList = ['logan','dan','andy','burtle','davon','james',];
            for (i = 0; oppoOne === oppoList[i]; i++){
                return bot.postMessage(channel, IDoThings.introductions(oppoList[i]));
            }
            
        }
    }*/
}

module.exports = James;