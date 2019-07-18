const SlackBot = require('slackbots');
const Store = require('./store');
const Logger = require('./utils/logger');
const ORMService = require('./database/orm');
const MODEL_NAMES = require('./database/models/model_names');

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

    static async updateUserRegistry(members){
        for (let i = 0; i < members.length; i++) {
            const user = members[i];
            let query = {where: {uuid: user.id}};
            let onErr = (err, code, obj) => Logger.error(obj.err);
            let dbUser = await ORMService.findAllInstancesOfModel(MODEL_NAMES.USER, query, onErr);
            if (!dbUser[0]) {
                let values = {uuid: user.id.toString()};
                await ORMService.createInstanceOfModel(MODEL_NAMES.USER, values, onErr)
            }
        }
    }

    async onOpen(){
        let users = await this.bot.getUsers();
        let usersById = {};
        if (users && users.members) {
            Slackboit.updateUserRegistry(users.members);
            for (let i = 0; i < users.members.length; i++) {
                const user = users.members[i];
                usersById[user.id] = user
            }
        }
        Store.usersById = usersById;
    }

    async onMessage(data){
        Logger.info('Incoming Message from Slack > ', data);
        if (!Store.usersById) return null;

        // prop "user" is actually an id, so we access Store.usersById to get the storedUser object
        let {type, username, text, channel, user, subtype, previous_message, event_ts: submittedAt} = data;
        if (type === 'message') {
            if (username === 'Slackboit') return null; // Prevent Slackboit recursion
            let storedUser = Store.usersById[user];

            if (text === 'calling slackboit helpdesk') this.sendHelpDesk(channel);

            if (Store.disabledUntil > new Date().getTime()) return;

            for (let i = 0; i < this.register.length; i++) {
                const item = this.register[i];
                let res;
                if (item.hasOwnProperty('function'))
                    res = await item.function(this.bot, storedUser, text, channel, submittedAt, subtype, previous_message);
                else res = await item(this.bot, storedUser, text, channel, submittedAt, subtype, previous_message);

                if (res === 'stop') return;
            }
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
        return this.bot.postMessage(channel, start);
    }
}

module.exports = Slackboit;