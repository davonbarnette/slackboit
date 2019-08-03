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

class Logan {

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

    static standBoit(bot, storedUser, text, channel, submittedAt, subtype, previous_message){
        const acknowledge = 'standboit ';
        const axios = require("axios");
        
        let lowered = text.toLowerCase();
        
        if (lowered.startsWith(acknowledge)) {

            /*
            let standUser = "logab";
            let standName = "Unwrinkled Bandit";

            let statList = ["A", "B", "C", "D", "E"];

            let standPower = statList[Math.floor(Math.random() * statList.length)];
            let standSpeed = statList[Math.floor(Math.random() * statList.length)];
            let standRange = statList[Math.floor(Math.random() * statList.length)];
            let standDurability = statList[Math.floor(Math.random() * statList.length)];
            let standPrecision = statList[Math.floor(Math.random() * statList.length)];
            let standPotential = statList[Math.floor(Math.random() * statList.length)];

            let output = 	"stand user: 「 " + standUser + " 」\n" +
            "stand name: 「 " + standName + " 」\n" + 
            "\n" +
            "power: " + standPower + " '``'-.,_,.-'``'-.,_,.- ゴゴゴゴ -'``'-.,_,.-'``'-.,_,. " + "durability: " + standDurability + "\n" +
            "speed: " + standSpeed + " '``'-.,_,.-'``'-.,_,.- ゴゴゴゴ -'``'-.,_,.-'``'-.,_,. " + "precision: " + standPrecision + "\n" +
            "range: " + standRange + "  '``'-.,_,.-'``'-.,_,.- ゴゴゴゴ -'``'-.,_,.-'``'-.,_,. "  + "potential: " + standPotential;
              
            alert(output);
            */

            let standUser = IDoThings.convertToAids(storedUser); //convert name to aids form
            let standNameArray = lowered.split(" "); //split input string into array
            let standName = "";

            //api call; create for loop to pass each individual item in standName
            //each word will return an array of synonyms
            //if array length is 0, use original word
            //if array length > 0, return a random result and replace original word
            //stitch converted words back into standName variable
            
            //https://dictionaryapi.com/products/api-collegiate-thesaurus api documentation
            for (i = 0; i < standNameArray.Length; i++)
            {
                let getURL = "https://dictionaryapi.com/api/v3/references/thesaurus/json/" + standNameArray[i] + "?key=dcab142a-5b33-489b-bae7-9cee724c10a2";
                
                const getSynonyms = () => 
                {
                    try 
                    {
                        jsonReturn = axios.get(getURL);
                    } 
                    
                    catch (error) 
                    {
                        standName = "error big sad";
                    }
                }

                jsonReturn = JSON.parse(json);

                //need to actually get the real synonyms
                let synonymsArray = ["uh", "umm", "yikes"];
                
                if (synonymsArray.length != 0)
                {
                    standName = standName + IDoThings.pickRandomElement(synonymsArray) + " ";
                }
                else
                {
                    standName = standName + standNameArray[i] + " ";
                }

            }

            
            standName = trim(standName);
            let statList = ["A", "B", "C", "D", "E"];

            let standPower = IDoThings.pickRandomElement(statList);
            let standSpeed = IDoThings.pickRandomElement(statList);
            let standRange = IDoThings.pickRandomElement(statList);
            let standDurability = IDoThings.pickRandomElement(statList);
            let standPrecision = IDoThings.pickRandomElement(statList);
            let standPotential = IDoThings.pickRandomElement(statList);
            
            let output = 	"stand user: 「 " + standUser + " 」\n" +
                            "stand name: 「 " + standName + " 」\n" + 
                            "\n" +
                            "power: [" + standPower + "] '``'-.,_,.-'``'-.,_,.- ゴゴゴゴ -'``'-.,_,.-'``'-.,_,. " + "durability: [" + standDurability + "]\n" +
                            "speed: [" + standSpeed + "] '``'-.,_,.-'``'-.,_,.- ゴゴゴゴ -'``'-.,_,.-'``'-.,_,. " + "precision: [" + standPrecision + "]\n" +
                            "range: [" + standRange + "]  '``'-.,_,.-'``'-.,_,.- ゴゴゴゴ -'``'-.,_,.-'``'-.,_,. "  + "potential: [" + standPotential + "]";
            
            output = IDoThings.spongebobMemeify(output);

            const icon_url = IDoThings.getImageURL('rollboit.jpg');

            return bot.postMessage(channel, standBoitOutput, {icon_url});
        }
    }

    static rollBoit(bot, storedUser, text, channel, submittedAt, subtype, previous_message)
    {
        const acknowledge = 'rollboit';

        let output = "starting up";

        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge + " d"))
        {
            //read in slack message
            //check parameter

            //if integer, proceed;
            //if 0, provide "universe explodes" message;
            //if 1, provide "wtf bruh" message;
            //if non-integer, return "how tf u gonna make me roll a {parameter} sided die bro smh my head" message;

            //perform math function to return dice result based on sides value provided
            //if 1, return natty 1 message
            //if 69, return "nice";
            //if 420, return "smonkboit.jpg";
            //if 666, return "pentagram" message;
            //if diceSides, return "natty diceSides" message

            let diceSides = lowered.substring(10);

            if(isNaN(diceSides))
            {
                output = diceSides + " isn't a number you absolute goon";
            }
            else
            {
                let introduction = "slackboit rolls the " + diceSides + "-sided die...\n";

                if(diceSides == 0 || diceSides == 1)
                {
                    if (diceSides == 0)
                    {
                        output = introduction + "A black hole thuds upon the table. It shreds and consumes all matter in the universe.";
                    }
                    else if(diceSides == 1)
                    {
                        output = introduction + "The Möbius strip clatters upon the table. How unexpected, a natty 1!";
                    }
                }

                else
                {
                    let diceResult = Math.floor(Math.random() * diceSides) + 1;

                    if(diceResult == 69)
                    {
                        output = introduction + diceResult + ". nice.";
                    }
                    else if(diceResult == 420)
                    {
                        output = introduction + "As Burtle bellows forth a thick cloud of smoke, you can barely see a " + diceResult + " upon the dice's top surface.";
                    }
                    else if(diceResult == 666)
                    {
                        output = introduction + "Amidst the sudden acrid smell of sulfur and brimstone, a blazing pentagram forms upon the table's surface and swallows the dice whole.\n" +
                                     "Moments later, a clawed red hand hand emerges from the flames and slams the dice back upon the table.\n" +
                                     "Now slathered in the blood of the innocent and exuding an aura of palpable menace, the dice comes to a rest. " + diceResult + ".";
                    }
                    else if (diceResult == 1)
                    {
                        output = introduction + diceResult + ", a critical failure...";
                    }
                    else if (diceResult == diceSides)
                    {
                        output = introduction + diceResult + ", a critical success!";
                    }
                    else
                    {
                        output = introduction + diceResult + ".";
                    }
                }
            }


            let rollBoit = IDoThings.spongebobMemeify(output);

            const icon_url = IDoThings.getImageURL('rollboit.jpg');

            return bot.postMessage(channel, rollBoit, {icon_url});
        }
    }
}

module.exports = Logan;
