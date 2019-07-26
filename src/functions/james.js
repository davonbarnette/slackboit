const Store = require('../store');
const IDoThings = require('../utils/idothings');
/*
 * This file is where you should put all of your slackboit functions. This codebase is structured so that you never
 * really have to deal with all the moving pieces of the code, and you can practically stay in this and the register.js
 * files to put all your slackboit functions together.
 *
 * Every function you write will ALWAYS have a set number of arguments: bot, storedUser, text, channel, submittedAt,
 * subtype, and previous_message. You can then use these fields to manipulate what you want the bot to send.
 *
 * bot: The slack bot API abstraction. https://github.com/mishk0/slack-bot-api for more details
 * storedUser (optional): The entire user object. Check /example_objects/slack_user for more details
 * text: The message sent by the user who initiated a slackboit command
 * channel: The channel that the message was sent in
 * submittedAt: The timestamp (ms) that the message was sent at
 * subtype (optional): The type of message - at this point I think it only exists when a message is deleted
 * previous_message (optional): On deletion, the message that was deleted
 *
 * NOTE: subtype, storedUser, and previous_message are sometimes optional fields, meaning that they won't always exist.
 * For example, if a message is deleted, you'll have {subtype:'message_deleted', previous_message: [Object]}, but if
 * it's just a regular slack message, it will be {subtype:undefined, previous_message:undefined}.
 *
 * 1. Copy the example function, and paste another one right below it.
 * 2. Change the name of the function to anything of your choosing.
 * 3. Change the const acknowledge = 'slackboit' to the word or phrase you want to acknowledge
 * 4. Create a conditional to check whether you want to send a message or not. Below I've added a text.startsWith()
 *    but you can do anything, e.g. text.endsWith(), text.contains(), etc.
 * 5. Add any logic you need to execute in order to get your desired functionality.
 * 6. Add any optional parameters (https://api.slack.com/methods/chat.postMessage).
 * 7. Post the message to the channel.
 * 8. Return the string 'stop' if you don't want any other functions to be run after this one.
 *
 */

class James {

    static exampleFunction(bot, storedUser, text, channel, submittedAt, subtype, previous_message){
        const acknowledge = 'slackboit';
        const message = 'example message';
        if (text.startsWith(acknowledge)) {
            //Start custom logic


            //End custom logic

            //Check out https://api.slack.com/methods/chat.postMessage for a list of potential parameters. You can do
            // stuff like change the icon url, e.g. {icon_url:'https://myicon.com/icon.png'}
            let params = {};

            //Post the message to the chat
            bot.postMessage(channel, message, params);

            // return 'stop' //Uncomment this line if you want to make sure no functions run after this one
        }
    }

    /* This is my version Bitches, also if you would like to add in a REAL food choice of some food establishment near the Atlanta area, you are welcome to.*/
    static fatBoit(bot, storedUser, text, channel){
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

            /* Add a nice logo for me bb!*/
            const icon_url = IDoThings.getImageURL('slackboit_chef.png');
            const choice = IDoThings.pickRandomElement(foodChoices);
            return bot.postMessage(channel,`Today I think you should try, ${choice}`, {icon_url});
        }
    }
    
    /* Where the boit is that establishment?! 
        THIS IS MY NO NO SQUARE!
    */
    static async whereFoodBoit(bot, storedUser, text, channel) {
        const mapMe = 'mapboit ';
        let lCase = text.toLowerCase();
        let place = IDoThings.spongebobMemeify(lCase, mapMe);
        if (lCase.startsWith(mapMe))
            {
                let encodeBoit = encodeURIComponent(place);
                let maps = 'https://google.com/maps/search/';
                let youAreEl = `${maps}${encodeBoit}`;
                let icon_url = IDoThings.getImageURL('mapboit.png');
                return bot.postMessage(channel, youAreEl, {icon_url});
            }
    }
    
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