
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config({path:__dirname + '/env/dev.env'});
}

const http = require('http');

const Express = require('./express/express');
const SETTINGS = require('./settings');
const Routes = require('./express/routes');

class ApplicationClass {
    constructor(){
        this.init();
    }

    async init(){
        const {SERVER_PORT} = SETTINGS;

        this.express = new Express(Routes);
        this.server = http.createServer(this.express.app);
        this.server.listen(SERVER_PORT, () => console.log('[Server] Listening on port > ', SERVER_PORT));

    }
}

module.exports = new ApplicationClass();



