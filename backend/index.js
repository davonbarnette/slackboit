
if (process.env.NODE_ENV !== 'production') require('dotenv').config({path:__dirname + '/env/dev.env'});

const http = require('http');

const Express = require('./express/express');
const SETTINGS = require('./settings');
const Logger = require('./utils/logger');

const {SERVER_PORT} = SETTINGS;

let server = http.createServer(Express);
server.listen(SERVER_PORT, () => Logger.info('[Server] Listening on port > ', SERVER_PORT));



