const Store = require('../store');
const IDoThings = require('../utils/idothings');
const USERS_BY_ID = require('../utils/users');
const boobyBPhrases = require('../utils/stuff');

class Meghoon {
    //Post a new example function below this line:

    static ketoizeMe(bot, user, slackMessage){
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        const acknowledge = 'feed me';
        if (text.startsWith(acknowledge) && user.id === USERS_BY_ID.MEGHOIT) {
            let choices = [
                "Meat",
                "Pizza",
                "Keto Shaketh",
                "Put in your own fucking entries meghoit"
            ];
            post.message = IDoThings.pickRandomElement(choices);
            return post;
        }
    }

    static bobbyboit(bot, user, slackMessage){
        let {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        const acknowledge = 'bobbyboit';
        if (text.startsWith(acknowledge)) {
            post.message = IDoThings.pickRandomElement(boobyBPhrases);
            return post;
        }
    }
}

module.exports = Meghoon;