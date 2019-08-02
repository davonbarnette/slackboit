const Store = require('../store');
const IDoThings = require('../utils/idothings');
const CryptoManager = require('../utils/crypto');
const Settings = require('../settings');
const zalgo = require('to-zalgo');
const UserService = require('../services/user_service');

class Yeetus {

    static spongebobMeme(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {icon_url: IDoThings.getImageURL('slackboit_original.png')},
            // stop:true,
        };

        const acknowledge = 'slackboit ';
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge)) {
            post.message = IDoThings.spongebobMemeify(lowered, acknowledge);
            return post;
        }
    }

    static crimeAlert(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;
        let post = {
            message: null,
            params: {},
        };

        if (subtype === 'message_deleted' && previous_message) {
            let submittedAt = new Date().getTime();
            if (Store.disabledUntil > submittedAt) return null; // Prevent Slackboit from messaging if he's killed

            // We can't use storedUser here because the user doesn't come in the data object, but rather the
            // previous_message object
            const {text, user} = previous_message;
            post.message = `🚓🚓\n${Store.usersById[user].profile.display_name}'s message was spookily deleted\n "${text}"\n🚓🚓`;
            return post;
        }
    }

    static imSorryJon(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL('slackboit_fuck.jpg')},
        };

        const acknowledge = 'imsorryslackboit ';
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge)) {
            post.message = zalgo(IDoThings.spongebobMemeify(lowered, acknowledge), 'mini');
            return post;
        }
    }

    static omaeWaMouShindeiru(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {icon_url: IDoThings.getImageURL('slackboit_final_laser.jpeg')},
        };

        const kill = 'slackboit お前はもう死んでいる';
        let lowered = text.toLowerCase();

        if (lowered === kill){
            post.message = 'なに';
            Store.disabledUntil = new Date().getTime() + 60 * 1000;
            return post;
        }
    }

    static async refreshCrypto(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL(Settings.COIN_MARKET_CAP.ICON_NAME)},
        };

        const acknowledge = 'slackboit gimme tendies';
        if (acknowledge === text && new Date().getTime() > Store.resetCryptoTime){
            let res = await CryptoManager.refreshCryptoListings();
            if (res) {
                post.message = 'tendies given';
                Store.resetCryptoTime = new Date().getTime() + 6000;
                return post;
            }
        }
    }

    static async lmgtfyBitch(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        const acknowledge = 'lmgtfy ';
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge)) {
            let meme = IDoThings.deletusAcknowledge(lowered, acknowledge);
            let encodedMemeQuery = encodeURIComponent(meme);
            let lmgtfy = `https://lmgtfy.com/?q=${encodedMemeQuery}`;
            post.message = lmgtfy;
            return post;
        }
    }

    static getCrypto(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {icon_url:IDoThings.getImageURL(Settings.COIN_MARKET_CAP.ICON_NAME)},
        };

        const acknowledge = 'slackboit what is ';

        if (text.startsWith(acknowledge)){
            let symbol = text.substring(acknowledge.length).toUpperCase();
            let cryptoObject = CryptoManager.getCryptoObjectBySymbol(symbol);
            const {cmc_rank, quote, last_updated} = cryptoObject;
            const {USD} = quote;
            const {price, volume_24h, percent_change_1h, percent_change_24h, percent_change_7d, market_cap} = USD;

            let separator = ' \n';

            post.message = '' +
                `*Rank:* #${cmc_rank}${separator}` +
                `*Price:* $${IDoThings.numberWithCommas(price)}${separator}` +
                `*Volume 24h:* ${IDoThings.numberWithCommas(volume_24h)}${separator}` +
                `*% Change 1h:* ${percent_change_1h}%${separator}` +
                `*% Change 24h:* ${percent_change_24h}%${separator}` +
                `*% Change 7d:* ${percent_change_7d}%${separator}` +
                `*Market Cap:* $${IDoThings.numberWithCommas(market_cap)}${separator}` +
                `*Last Updated:* ${last_updated}`;

            return post;
        }
    }

    static async rechainTheBoit(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        const acknowledge = 'rechain the boit';
        if (text.startsWith(acknowledge)){
            let time = parseInt(text.substr(acknowledge.length));
            if (isNaN(time)) time = 60;
            Store.slackboitUnchained.rechain(time);
            post.message = `y'all dudes need jesus for ${time} seconds`;
            return post;
        }
    }

    static async updeetusThatYeetus(bot, user, slackMessage){
        const { text, channel, event_ts, subtype, previous_message } = slackMessage;

        let post = {
            message: null,
            params: {},
        };

        const acknowledge = 'slackboit updeetus the yeetus';
        if (text.startsWith(acknowledge)){
            const users = await UserService.updateUserRegistry(bot);
            if (users) post.message = 'the yeetus has been updeetused';
            else post.message =  'could not updeetus the yeetus :(';
            return post;
        }
    }
}

module.exports = Yeetus;