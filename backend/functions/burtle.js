const Store = require('../store');
const IDoThings = require('../utils/idothings');

class Burtle {
    static sobrietyBoit(bot, user, slackMessage){
        const {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL('smonkboit.png')},
        };

        const acknowledge = "smonk or dronk?"
        let lowered = text.toLowerCase()
        if (lowered == acknowledge){

            let weedCoin = Math.floor(Math.random() * 2)            

            if(weedCoin == 0){
                post.message = IDoThings.spongebobMemeify("smonk")
            }else{
                post.message = IDoThings.spongebobMemeify("dronk")
            }

            return post;
        }
    }
}

module.exports = Burtle;