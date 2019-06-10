const express = require('express');
const SlackBot = require('slackbots');
const http = require('http');
const path = require('path');

const SERVER_PORT = 8080;
const app = express();

const Register = require('./register');
const Store = require('./store');

/*
 * This file should almost never be changed if you're just trying to add a function. If you feel like you need to
 * change something in here, ask Davon first.
 */

Store.bot = new SlackBot({
    token:process.env.SLACK_TOKEN,
    name: 'Slackboit'
});

Store.bot.on('open', async () => {
    //On connection to the bot, slackboit gets the current user objects
    let users = await Store.bot.getUsers();
    let usersById = {};
    if (users && users.members) users.members.forEach(user => usersById[user.id] = user);

    Store.usersById = usersById;
});

const onMessage = async (data) => {
    console.log(data);
    if (!Store.usersById) return null;

    // prop "user" is actually an id, so we access Store.usersById to get the storedUser object
    let {type, username, text, channel, user, subtype, previous_message, event_ts: submittedAt} = data;
    if (type === 'message') {
        if (username === 'Slackboit') return null; // Prevent Slackboit recursion
        let storedUser = Store.usersById[user];

        if (text === 'calling slackboit helpdesk') {
            let start = '';
            for (let i = 0; i < Register.length; i++) {
                const item = Register[i];
                if (item.hasOwnProperty('command')){
                    const {description, command} = item;
                    start += `*${command}*\n_${description}_\n`;
                }
                start += '\n\n'
            }
            return Store.bot.postMessage(channel, start);
        }

        if (Store.disabledUntil > new Date().getTime()) return;

        for (let i = 0; i < Register.length; i++) {
            const item = Register[i];
            let res;

            if (item.hasOwnProperty('function'))
                res = await item.function(Store.bot, storedUser, text, channel, submittedAt, subtype, previous_message);
            else res = await item(Store.bot, storedUser, text, channel, submittedAt, subtype, previous_message);

            if (res === 'stop') return;
        }
    }
};

Store.bot.on('message', onMessage);

app.use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Credentials`, `true`);
    res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
    res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);
    res.setHeader(`Cache-Control`, `no-cache`);
    next();
});

app.use('/static', express.static(path.resolve(__dirname, 'assets')));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));


const consume = (req, res, next) => {
    const { body } = req;
    const {token, challenge, type} = body;

    if (token && challenge){
        res.status(200).json({challenge})
    }
};

app.post('/slack/action-endpoint', consume);

app.get('/ping', (req, res, next) => res.status(200).json({message:'success'}));

let server = http.createServer(app);
server.listen(SERVER_PORT, () => console.log('[Server] Listening on port > ', SERVER_PORT));