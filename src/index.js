const express = require('express');
const SlackBot = require('slackbots');
const http = require('http');

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

    let {type, username, text, channel, user} = data; // prop "user" is actually an id...
    if (type === 'message') {
        if (username === 'Slackboit') return null; // Prevent Slackboit recursion
        let storedUser = Store.usersById[user];

        let submittedAt = new Date().getTime();
        if (Store.disabledUntil > submittedAt) return null; // Prevent Slackboit from messaging if he's killed

        Register.forEach(func => func(bot, storedUser, text, channel, submittedAt))
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

let server = http.createServer(app);
server.listen(SERVER_PORT, () => console.log('[Server] Listening on port > ', SERVER_PORT));