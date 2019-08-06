
if (process.env.NODE_ENV === 'development') {
    const dotenv = require('dotenv');
    dotenv.config({path:__dirname + '/env/dev.env'});
}

const http = require('http');

const Express = require('./express/express');
const Register = require('./register');
const SETTINGS = require('./settings');
const Routes = require('./express/routes');

class ApplicationClass {
    constructor(){
        this.init();
    }

    init(){
        const {SERVER_PORT} = SETTINGS;

        this.express = new Express(Routes);
        this.server = http.createServer(this.express.app);
        this.server.listen(SERVER_PORT, () => console.log('[Server] Listening on port > ', SERVER_PORT));
        const Slackboit = require('./slackboit');
        this.slackboit = new Slackboit(Register);
    }
}

module.exports.instance = new ApplicationClass();


