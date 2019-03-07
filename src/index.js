const express = require('express');
const SlackBot = require('slackbots');
const http = require('http');

const SERVER_PORT = 8080;
const app = express();

console.log('log boy', process.env.SLACK_TOKEN);

let bot = new SlackBot({
    token:process.env.SLACK_TOKEN,
    name: 'Slackboit'
});

const onMessage = async (data) => {
    console.log(data);
    const {type, user, text, channel} = data;

    if (type === 'message') {

        //Respond to string 'slackboit' with spongebob meme
        let toLowered = text.toLowerCase();
        const ackString = 'slackboit';

        if (toLowered.indexOf(ackString) !== -1) {
            let newString = text.split('');
            newString = newString.map((char, index) => {
                if (index % 2 === 0) return char.toLowerCase();
                else return char.toUpperCase();
            });

            newString = newString.join('');

            bot.postMessage(channel, newString, {icon_emoji:':chart_with_upwards_trend:'});
        }

        //Write new things to do here, maybe??
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