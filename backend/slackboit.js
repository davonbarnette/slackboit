const SlackBot = require('slackbots');
const Store = require('./store');
const Logger = require('./utils/logger');
const UserService = require('./services/user_service');
const USERS_BY_ID = require('./utils/users');
const IDoThings = require('./utils/idothings');
const SETTINGS = require('./settings');
const Register = require ('./register');

class Slackboit {
    constructor(register){
        this.register = register;
        this.startEmUp();
    }

    startEmUp(){
        const {SLACK_TOKEN:token} = SETTINGS;
        if (token){
            this.bot = new SlackBot({token, name: 'Slackboit'});
            this.bot.on('open', this.onOpen.bind(this));
            this.bot.on('message', this.onMessage.bind(this));
            this.bot.on('close', () => console.log('closed connection'));
            this.bot.on('error', (err) => Logger.info('[Slackboit] Slackboit connection error', err));
        }
    }

    async onOpen(){
        Logger.info('[Slackboit] Slackboit connection opened');
        Store.slackboitedGoodbye = false;
        this.bot.postMessage('C8D37PPQ9', 'hello', {});
        return UserService.updateUserRegistry(this.bot);
    }

    async onMessage(event){
        Logger.info('[Slackboit] Incoming Message Event from Slack > ', event);
        if (!Store.usersById) return null;

        // prop "user" is actually an id, so we access Store.usersById to get the storedUser object
        let {type, text, channel, user:userId, bot_id} = event;
        if (type === 'goodbye') {
            Store.slackboitedGoodbye = true;
            let message = `cya later everyone, reboot me at ${SETTINGS.HOST}/slack/reboot`;
            this.bot.postMessage('C8D37PPQ9', message, {});
        }

        if (type === 'message') {
            if (Store.disabledUntil > new Date().getTime()) return null;
            let storedUser = Store.usersById[userId];

            if (bot_id === USERS_BY_ID.SLACKBOIT) return null; // Prevent Slackboit recursion

            if (text === 'calling slackboit helpdesk') this.sendHelpDesk(channel);
            else await this.iterateRegister(storedUser, event, this.handlePost.bind(this));
        }
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

module.exports = new Slackboit(Register);