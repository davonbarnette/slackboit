const express = require('express');
const SETTINGS = require('../settings');
const Routes = require('./routes');
const headers = require('./headers');

let app = express();

app.use((req, res, next) => {
    Object.keys(headers).forEach(key => res.setHeader(key, headers[key]));
    next();
});

app.use('/static', express.static(SETTINGS.RELATIVE_ASSET_DIR));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.get('/ping', (req, res) => res.status(200).json({message:'success'}));

Routes.forEach(route => app.use(route.path, route.router));

module.exports = app;