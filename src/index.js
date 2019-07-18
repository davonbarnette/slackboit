const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'dev') dotenv.config({path:__dirname + '/env/dev.env'});

const http = require('http');

const Slackboit = require('./slackboit');
const Express = require('./express/express');
const Register = require('./register');
const Database = require('./database/sequelize');
const SETTINGS = require('./settings');
const Routes = require('./express/routes');

class ApplicationClass {
    constructor(){
        this.initAsync();
    }

    initAsync(){
        this.database = new Database(this.init.bind(this));
    }

    init(){
        const {SERVER_PORT} = SETTINGS;

        this.express = new Express(Routes);
        this.server = http.createServer(this.express.app);
        this.server.listen(SERVER_PORT, () => console.log('[Server] Listening on port > ', SERVER_PORT));
        this.slackboit = new Slackboit(Register);
    }
}

const Application = new ApplicationClass();
module.exports = Application;

