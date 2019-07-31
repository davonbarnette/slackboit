const SlackBot = require('slackbots');
const Store = require('./store');
const Logger = require('./utils/logger');
const UserService = require('./services/user_service');
const USERS_BY_ID = require('./utils/users');
const SlackboitUnchained = require('./utils/slackboit_unchained');

class Slackboit {
    constructor(register){
        this.register = register;
        this.startEmUp();
    }

    startEmUp(){
        this.bot = new SlackBot({token: process.env.SLACK_TOKEN, name: 'Slackboit'});
        this.bot.on('open', this.onOpen.bind(this));
        this.bot.on('message', this.onMessage.bind(this));
    }

    async onOpen(){
        return UserService.updateUserRegistry(this.bot);
    }

    async onMessage(data){
        Logger.info('Incoming Message from Slack > ', data);
        if (!Store.usersById) return null;

        // prop "user" is actually an id, so we access Store.usersById to get the storedUser object
        let {type, username, text, channel, user:userId, subtype, previous_message, event_ts: submittedAt, bot_id} = data;
        if (type === 'message') {
            if (Store.disabledUntil > new Date().getTime()) return null;
            let storedUser = Store.usersById[userId];

            if (text.startsWith('chainboit ')) {
                let split = text.substr(10).split('::');
                let commands = split.slice(0, split.length - 1);
                let firstText = split[split.length - 1];
                Store.slackboitUnchained.initialize(commands);
                if (Store.slackboitUnchained.isRechained()) return null;
                Store.slackboitUnchained.rechain(5);

                await this.slackboitUnchainedOnlineForever(storedUser, firstText, channel, submittedAt, subtype, previous_message)
            }

            if (bot_id === USERS_BY_ID.SLACKBOIT) {
                storedUser = Store.usersById[bot_id];
                await this.slackboitUnchainedOnlineForever(storedUser, text, channel, submittedAt, subtype, previous_message)
                return null; // Prevent Slackboit recursion
            }

            if (text === 'calling slackboit helpdesk') this.sendHelpDesk(channel);
            else await this.iterateRegister(storedUser, text, channel, submittedAt, subtype, previous_message)
        }
    }

    async slackboitUnchainedOnlineForever(storedUser, text, channel, submittedAt, subtype, previous_message){
        let command = Store.slackboitUnchained.getCurrentCommand(text);
        Store.slackboitUnchained.increment();
        await this.iterateRegister(storedUser, command, channel, submittedAt, subtype, previous_message);
    }

    async iterateRegister(storedUser, text, channel, submittedAt, subtype, previous_message){
        for (let i = 0; i < this.register.length; i++) {
            const item = this.register[i];
            let res;
            if (item.hasOwnProperty('function'))
                res = await item.function(this.bot, storedUser, text, channel, submittedAt, subtype, previous_message);
            else res = await item(this.bot, storedUser, text, channel, submittedAt, subtype, previous_message);

            if (res === 'stop') return;
        }
    }

    sendHelpDesk(channel){
        let start = '';
        for (let i = 0; i < this.register.length; i++) {
            const item = this.register[i];
            if (item.hasOwnProperty('command')) {
                const {description, command} = item;
                start += `*${command}*\n_${description}_\n`;
            }
            start += '\n\n'
        }
        return this.bot.postMessage(channel, start, {});
    }
}

module.exports = Slackboit;