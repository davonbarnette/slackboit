const express = require('express');
const SlackBots = require('slackbots');
const http = require('http');

const app = express();

let bot;
const SERVER_PORT = 8080;

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
    const { data } = req;
    const {token, challenge, type} = data;

    if (token && challenge){
        console.log('token', token);
        console.log('challenge', challenge);
        res.status(200).json({challenge})
    }
};

app.post('/slack/action-endpoint', consume);

let server = http.createServer(app);
server.listen(SERVER_PORT, () => console.log('[Server] Listening on port > ', SERVER_PORT));