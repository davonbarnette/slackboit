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

class Andy {

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

    static tobefair(bot, storedUser, text, channel, submittedAt, subtype, previous_message){
        const Store = require('../store');
        const acknowledge = 'to be fair';
        if (text.includes(acknowledge)) {
            Store.tbfCounter = Store.tbfCounter + 1
            const icon_url = IDoThings.getImageURL('slackboit_monocle.png');

            let message = 'to be fair number: ' + Store.tbfCounter;
            bot.postMessage(channel, message, {icon_url})
            return 'stop';
        }
    }

    static technically(bot, storedUser, text, channel, submittedAt, subtype, previous_message){
        const acknowledge = 'technically';
        let lowered = text.toLowerCase();
        if (lowered.includes(acknowledge)) {
            let technically = IDoThings.spongebobMemeify(lowered, 'technically');
            const icon_url = IDoThings.getImageURL('slackboit_matrix.png');

            return bot.postMessage(channel, technically, {icon_url});
        }
    }
}

module.exports = Andy;

