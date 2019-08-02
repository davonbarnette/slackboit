const Store = require('../store');
const IDoThings = require('../utils/idothings');

class Logan {
    //Post a new example function below this line:

    static rollBoit(bot, user, slackMessage)
    {
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url: IDoThings.getImageURL('rollboit.png')},
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


            post.message = output;
            return post;
        }
    }
}

module.exports = Logan;
