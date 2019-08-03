const express = require('express');
const path = require('path');
const SETTINGS = require('../settings');

class Express {
    constructor(routes){
        this.routes = routes;
        this.init();
    }

    init(){
        this.app = express();
        this.setHeaders();
        this.setAncillary();
        this.app.get('/ping', (req, res) => res.status(200).json({message:'success'}));
        this.registerRoutes();
    }

    registerRoutes(){
        this.routes.forEach(route => this.app.use(route.path, route.router))
    }

    setAncillary(){
        this.app.use('/static', express.static(SETTINGS.RELATIVE_ASSET_DIR));
        this.app.use(express.json({limit: '10mb'}));
        this.app.use(express.urlencoded({limit: '10mb', extended: true}));
    }

    setHeaders(){
        this.app.use((req, res, next) => {
            res.setHeader(`Access-Control-Allow-Origin`, `*`);
            res.setHeader(`Access-Control-Allow-Credentials`, `true`);
            res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
            res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);
            res.setHeader(`Cache-Control`, `no-cache`);
            next();
        });
    }
}

module.exports = Express;