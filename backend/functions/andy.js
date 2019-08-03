const Store = require('../store');
const IDoThings = require('../utils/idothings');
const ToBeFairService = require('../services/tbf_service');

class Andy {
    //Post a new example function below this line:

    static async tobefair(bot, user, slackMessage) {
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL('slackboit_monocle.png')},
        };

        const acknowledge = 'to be fair';
        let lowered = text.toLowerCase();
        if (lowered.includes(acknowledge)) {
            let tbfCount = await ToBeFairService.createToBeFairEntry(user.id);
            post.message = `${user.profile.display_name}'s to be fair number: ` + tbfCount;
            return post;
        }
    }

    static technically(bot, user, slackMessage) {
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL('slackboit_matrix.png')},
        };
        const acknowledge = 'technically';
        let lowered = text.toLowerCase();
        if (lowered.includes(acknowledge)) {
            post.message = 'technically';
            return post;
        }
    }

    static lennyboit(bot, user, slackMessage) {
        const {text, channel, event_ts, subtype, previous_message} = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        const acknowledge = 'lennyboit';
        let lowered = text.toLowerCase();

        if (lowered.startsWith(acknowledge)) {

            if (lowered.endsWith("og")) {
                post.message = "( ͡° ͜ʖ ͡°)";
                return post;
            } else {
                let lennyfaces = [
                    '( ͡° ͜ʖ ͡°)',
                    '( ͠° ͟ʖ ͡°)',
                    '( ͡~ ͜ʖ ͡°)',
                    '( ͡o ͜ʖ ͡o)',
                    '( ಠ ͜ʖಠ)',
                    '(▀̿Ĺ̯▀̿ ̿)',
                    '( ✧≖ ͜ʖ≖)',
                    '(ง ͠° ͟ل͜ ͡°)ง',
                    '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]',
                    '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)',
                    '(✿❦ ͜ʖ ❦)',
                    '/\/( ͡°͡° ͜ʖ ͡°͡°)\//',
                    '╚═( ͡° ͜ʖ ͡°)═╝',
                    '︵‿︵(´ ͡༎ຶ ͜ʖ ͡༎ຶ `)︵‿︵',
                    '( ͡ ͡° ͡°  ʖ ͡° ͡°)',
                    '( ͡°❥ ͡°)',
                    '̿̿ ̿̿ ̿̿ ̿\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿',
                    '( ͡◉◞ ͜ʖ◟ ͡◉)',
                    '(∩ ͡° ͜ʖ ͡°)⊃━炎炎炎炎炎炎炎炎炎',
                ];

                post.message = IDoThings.pickRandomElement(lennyfaces);
                return post;
            }
        }
    }
}

module.exports = Andy;
