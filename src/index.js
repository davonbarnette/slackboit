const express = require('express');
const SlackBot = require('slackbots');
const http = require('http');
const path = require('path');

const SERVER_PORT = 8080;
const app = express();

const Register = require('./messenger');
const Store = require('./store');

let bot = new SlackBot({
    token:process.env.SLACK_TOKEN,
    name: 'Slackboit'
});

bot.on('open', async () => {
    let users = await bot.getUsers();
    let usersById = {};

    if (users){
        users = users.members;
        users.forEach(user => {
            usersById[user.id] = user;
        })
    }

    Store.usersById = usersById;
});

const onMessage = async (data) => {
    console.log(data);
    if (!Store.usersById) return null;

    let {type, username, text, channel, user, subtype, previous_message} = data; // prop "user" is actually an id...
    if (type === 'message') {
        if (username === 'Slackboit') return null; // Prevent Slackboit recursion
        let storedUser = Store.usersById[user];

        if (subtype === 'message_deleted' && previous_message){
            const {text, user} = previous_message;
            let storedUser = Store.usersById[user];
            let acknowledge = 'slackboit ';
            if (text.startsWith(acknowledge)) {
                let response = `[CRIME ALERT] ${storedUser['profile']['display_name']} tried to delete a message that he made me say [CRIME ALERT]`;
                return bot.postMessage(channel, response, {});
            }
        }


        let submittedAt = new Date().getTime();
        if (Store.disabledUntil > submittedAt) return null; // Prevent Slackboit from messaging if he's killed

        for (let i = 0; i < Register.length; i++) {
            const func = Register[i];
            func(bot, storedUser, text, channel, submittedAt);
            if (func === 'stop') return;
        }
    }
};

bot.on('message', onMessage);

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