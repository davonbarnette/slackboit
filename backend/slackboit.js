const SlackBot = require('slackbots');
const Store = require('./store');
const Logger = require('./utils/logger');
const UserService = require('./services/user_service');
const USERS_BY_ID = require('./utils/users');
const SlackboitUnchained = require('./utils/slackboit_unchained');
const IDoThings = require('./utils/idothings');

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

    async onMessage(event){
        Logger.info('Incoming Message Event from Slack > ', event);
        if (!Store.usersById) return null;

        // prop "user" is actually an id, so we access Store.usersById to get the storedUser object
        let {type, text, channel, user:userId, bot_id} = event;
        if (type === 'message') {
            if (Store.disabledUntil > new Date().getTime()) return null;
            let storedUser = Store.usersById[userId];

            if (bot_id === USERS_BY_ID.SLACKBOIT) return null; // Prevent Slackboit recursion

            if (text === 'calling slackboit helpdesk') this.sendHelpDesk(channel);
            else await this.iterateRegister(storedUser, event, this.handlePost.bind(this));
        }
    }

    async slackboitUnchainedOnlineForever(storedUser, text, channel, submittedAt, subtype, previous_message){
        let command = Store.slackboitUnchained.getCurrentCommand(text);
        Store.slackboitUnchained.increment();
        await this.iterateRegister(storedUser, command, channel, submittedAt, subtype, previous_message);
    }

    handlePost(post, data){
        let {message, params, stop, spongebobify, channel} = post;
        if (spongebobify !== false) message = IDoThings.spongebobMemeify(message);
        this.bot.postMessage(channel || data.channel, message, params);
        if (stop) return 'stop';
    }

    async iterateRegister(user, data, handlePost){
        for (let i = 0; i < this.register.length; i++) {
            const item = this.register[i];
            let exec = item;
            if (item.hasOwnProperty('function')) exec = item.function;
            let post = await exec(this.bot, user, data);
            if (post) {
                let handled = handlePost(post, data);
                if (handled === 'stop') return;
            }
            else if (post === null) return null;
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