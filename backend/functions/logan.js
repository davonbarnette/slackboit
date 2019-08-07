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

        function standAttributeGenerator ()
        {
            let randomNumber = Math.floor(Math.random() * 100) + 1;
            let attributeGrade = "";
            switch (true)
            {
                case (randomNumber < 3): //3%
                    attributeGrade = "S";
                    break;
                case (randomNumber < 15): //12%
                    attributeGrade = "A";
                    break;
                case (randomNumber < 35): //20%
                    attributeGrade = "B";
                    break;
                case (randomNumber < 65): //30%
                    attributeGrade = "C";
                    break;
                case (randomNumber < 85): //20%
                    attributeGrade = "D";
                    break;
                case (randomNumber < 98): //12%
                    attributeGrade = "E";
                    break;
                case (randomNumber <= 100): //3%
                    attributeGrade = "F";
                    break;
            }

            return attributeGrade;

        }
        
        if (lowered.startsWith(acknowledge)) 
        {

            let standUser = IDoThings.convertToAids(user.id);
            lowered = IDoThings.deletusAcknowledge(text, acknowledge);
            let standNameArray = lowered.split(" ");
            let standName = ""; 
            
            //https://dictionaryapi.com/products/api-collegiate-thesaurus api documentation
            for (let i = 0; i < standNameArray.length; i++)
            {
                if(!standNameArray[i].startsWith("!"))
                {
                    let getURL = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${standNameArray[i]}?key=${SETTINGS.THESAURUS_API_TOKEN}`;
                    
                    let jsonReturn;
                    
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
                    }

                    let synonymsArray = [];
                    let synonymFound = false;
                    
                    if(jsonReturn)
                    {
                        //maybe the synonymFound assignment needs to happen here- assuming that it can't get this far
                        //prevent the rest from happening afterwards to prevent error
                        jsonReturn.forEach((object, index)=>
                        {
                            //condition met under ideal scenario, but isn't preventing error
                            if(object.hasOwnProperty("meta"))
                            {
                                synonymFound = true;
                            }
                            
                            object.meta.syns.forEach((synsArray)=>
                            {
                                synsArray.forEach((synonym)=>
                                {
                                    synonymsArray.push(synonym);
                                })
                            })
                        })
                    }
                    
                    //not triggering as expected when word fails to retrieve synonym
                    if(synonymFound == false)
                    {
                        standName = standName + "{" + standNameArray[i] + "} ";
                    }
   
                    if (synonymsArray.length !== 0)
                    {
                        standName = standName + IDoThings.pickRandomElement(synonymsArray) + " ";
                    } 
                }
                else
                {
                    standName = standName + standNameArray[i].substring(1) + " ";
                }   
            }

            
            standName = standName.trim();

            let standObject = 
            {
                master: standUser,
                name: standName,
                power: standAttributeGenerator(),
                durability: standAttributeGenerator(),
                speed: standAttributeGenerator(),
                precision: standAttributeGenerator(),
                range: standAttributeGenerator(),
                potential: standAttributeGenerator()
            }
            
            let output = 	"stand user: 「 " + standObject.master + " 」\n" +
                            "stand name: 「 " + standObject.name + " 」\n" + 
                            "\n" +
                            "power: [" + standObject.power + "] '``'-.,_,.ゴゴゴゴ '``'-.,_,. durability: [" + standObject.durability + "]\n" +
                            "speed: [" + standObject.speed + "] '``'-.,_,.ゴゴゴゴ '``'-.,_,. precision: [" + standObject.precision + "]\n" +
                            "range: [" + standObject.range + "]  '``'-.,_,.ゴゴゴゴ '``'-.,_,. potential: [" + standObject.potential + "]";
            
            post.message = output;

            return post;
        }
    }
}

module.exports = Logan;
