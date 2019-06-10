const Store = require('../store');
const IDoThings = require('../utils/idothings');
const CryptoManager = require('../utils/crypto');
const Settings = require('../settings');
const zalgo = require('to-zalgo');

class Yeetus {

    static spongebobMeme(bot, storedUser, text, channel){
        const acknowledge = 'slackboit ';
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge)) {
            let meme = IDoThings.spongebobMemeify(lowered, acknowledge);
            return bot.postMessage(channel, meme);
        }
    }

    static crimeAlert(bot, storedUser, text, channel, submittedAt, subtype, previous_message){
        if (subtype === 'message_deleted' && previous_message) {
            let submittedAt = new Date().getTime();
            if (Store.disabledUntil > submittedAt) return 'stop'; // Prevent Slackboit from messaging if he's killed

            // We can't use storedUser here because the user doesn't come in the data object, but rather the
            // previous_message object
            const {text, user} = previous_message;
            let message = `[🚓🚓]\n${Store.usersById[user].profile.display_name}'s message was spookily deleted\n "${text}"\n[🚓🚓]`;
            bot.postMessage(channel, message);
            return 'stop';
        }
    }

    static imSorryJon(bot, storedUser, text, channel){
        const acknowledge = 'imsorryslackboit ';
        let lowered = text.toLowerCase();
        if (lowered.startsWith(acknowledge)) {
            let meme = IDoThings.spongebobMemeify(lowered, acknowledge);
            return bot.postMessage(channel, zalgo(meme, 'mini'), {});
        }
    }

    static omaeWaMouShindeiru(bot, storedUser, text, channel){
        const kill = 'slackboit お前はもう死んでいる';
        let lowered = text.toLowerCase();

        if (lowered === kill){
            bot.postMessage(channel, 'なに', {});
            Store.disabledUntil = new Date().getTime() + 60 * 1000;
            return 'stop';
        }
    }

    static async refreshCrypto(bot, storedUser, text, channel){
        const acknowledge = 'slackboit gimme tendies';
        if (acknowledge === text && new Date().getTime() > Store.resetCryptoTime){
            let res = await CryptoManager.refreshCryptoListings();
            if (res) {
                const icon_url = IDoThings.getImageURL(Settings.COIN_MARKET_CAP.ICON_NAME);
                const message = IDoThings.spongebobMemeify('tendies given');
                bot.postMessage(channel, message, {icon_url});
                Store.resetCryptoTime = new Date().getTime() + 6000;
                return 'stop';
            }
        }
    }

    static getCrypto(bot, storedUser, text, channel){
        const acknowledge = 'slackboit what is ';

        if (text.startsWith(acknowledge)){
            let symbol = text.substring(acknowledge.length).toUpperCase();
            let cryptoObject = CryptoManager.getCryptoObjectBySymbol(symbol);
            const {cmc_rank, quote, last_updated} = cryptoObject;
            const {USD} = quote;
            const {price, volume_24h, percent_change_1h, percent_change_24h, percent_change_7d, market_cap} = USD;

            let separator = ' \n';

            let pretty = '' +
                `*Rank:* #${cmc_rank}${separator}` +
                `*Price:* $${IDoThings.numberWithCommas(price)}${separator}` +
                `*Volume 24h:* ${IDoThings.numberWithCommas(volume_24h)}${separator}` +
                `*% Change 1h:* ${percent_change_1h}%${separator}` +
                `*% Change 24h:* ${percent_change_24h}%${separator}` +
                `*% Change 7d:* ${percent_change_7d}%${separator}` +
                `*Market Cap:* $${IDoThings.numberWithCommas(market_cap)}${separator}` +
                `*Last Updated:* ${last_updated}`;

            const icon_url = IDoThings.getImageURL(Settings.COIN_MARKET_CAP.ICON_NAME);
            bot.postMessage(channel, IDoThings.spongebobMemeify(pretty), {icon_url});
            return 'stop';
        }
    }
}

module.exports = Yeetus;