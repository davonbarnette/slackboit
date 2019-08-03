
if (process.env.NODE_ENV === 'dev') {
    const dotenv = require('dotenv');
    dotenv.config({path:__dirname + '/env/dev.env'});
}

const http = require('http');

const Express = require('./express/express');
const Register = require('./register');
// Need to keep this here to instantiate the Database class before the rest of the application starts
const Database = require('./database2/sequelize');
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



