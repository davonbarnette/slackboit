const Store = require('../store');
const IDoThings = require('../utils/idothings');
const axios = require("axios");
const SETTINGS = require('../settings');

class Logan {
    
    static rollBoit(bot, user, slackMessage)
    {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url: IDoThings.getImageURL('rollboit.jpg')},
        };
        
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

                    if(diceSides == 69)
                    {
                        output = introduction + diceResult + ". nice.";
                    }
                    else if(diceSides == 420)
                    {
                        output = introduction + "As Burtle bellows forth a thick cloud of smoke, you can barely see a " + diceResult + " upon the dice's top surface.";
                    }
                    else if(diceSides == 666)
                    {
                        output = introduction + "Amidst the sudden acrid smell of sulfur and brimstone, a blazing pentagram forms upon the table's surface and swallows the dice whole.\n" +
                                     "Moments later, a clawed red hand hand emerges from the flames and slams the dice back upon the table.\n" +
                                     "Now slathered in the blood of the innocent and exuding an aura of palpable menace, the dice comes to a rest. " + diceResult + ".";
                    }
                    else
                    {
                        output = introduction + diceResult;
                    }

                    if (diceResult == 1)
                    {
                        output = introduction + diceResult + " a critical failure...";
                    }
                    else if (diceResult == diceSides)
                    {
                        output = introduction + diceResult + " a critical success!";
                    }

                }
            }

            post.message = output;
            return post;
        }
    }
    
    
    static async standBoit(bot, user, slackMessage)
    {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = 
        {
            message: null,
            params: {icon_url: IDoThings.getImageURL('standboit.jpg')},
        };
        
        const acknowledge = 'standboit ';
        
        let lowered = text.toLowerCase();
        
        if (lowered.startsWith(acknowledge)) 
        {

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

            let standUser = IDoThings.convertToAids(user.id); //convert name to aids form
            lowered = IDoThings.deletusAcknowledge(text, acknowledge);
            let standNameArray = lowered.split(" "); //split input string into array
            let standName = ""; //no longer contains text

            //api call; create for loop to pass each individual item in standName
            //each word will return an array of synonyms
            //if array length is 0, use original word
            //if array length > 0, return a random result and replace original word
            //stitch converted words back into standName variable
            
            //https://dictionaryapi.com/products/api-collegiate-thesaurus api documentation
            for (let i = 0; i < standNameArray.length; i++)
            {
                let getURL = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${standNameArray[i]}?key=${SETTINGS.THESAURUS_API_TOKEN}`;
                
                let jsonReturn;
                /*
                try 
                    {
                        let response = await axios.get(getURL);

                        if (response) 
                        {
                            jsonReturn = response.data;
                        } 
                    }
                catch (error) 
                    {
                        post.message = "standboit   A N G E R Y";
                        return post;
                    }
                */

                let response = await axios.get(getURL);

                if (response) 
                {
                    jsonReturn = response.data;
                } 
                
                let synonymsArray = [];
                
                if(jsonReturn)
                {
                    jsonReturn.forEach((object, index)=>
                    {
                        
                        object.meta.syns.forEach((synsArray)=>
                        {
                            synsArray.forEach((synonym)=>
                            {
                                synonymsArray.push(synonym);

                            })

                        })

                    })
                }

                //need to actually get the real synonyms    
                if (synonymsArray.length !== 0)
                {
                    standName = standName + IDoThings.pickRandomElement(synonymsArray) + " ";
                }
                else
                {
                    standName = standName + "{" + standNameArray[i] + "} ";
                }

            }

            
            standName = standName.trim();
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
                            "power: [" + standPower + "] -.,_,.-'` ゴゴゴゴ ,.-'`'-. " + "durability: [" + standDurability + "]\n" +
                            "speed: [" + standSpeed + "] -.,_,.-'` ゴゴゴゴ ,.-'`'-. " + "precision: [" + standPrecision + "]\n" +
                            "range: [" + standRange + "]  -.,_,.-'` ゴゴゴゴ ,.-'`'-. "  + "potential: [" + standPotential + "]";
            
            post.message = output;

            return post;
        }
    }

    
}

module.exports = Logan;
