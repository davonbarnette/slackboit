const Sequelize = require('sequelize');
const ModelRegistry = require('./models/model_registry');
const Logger = require('../utils/logger');
const SETTINGS = require('../settings');

class Database {
    constructor(onConnection){
        this.init(onConnection);
    }

    async init(onConnection) {
        const { SEQUELIZE_DIALECT, LOGS, HOST, PORT, NAME, USERNAME, PASSWORD } = SETTINGS.DB;

        if (!NAME) return Logger.error('No DB_NAME provided in environment.');
        if (!USERNAME) return Logger.error('No DB_USERNAME provided in environment.');
        if (!PASSWORD) return Logger.error('No DB_PASSWORD provided in environment.');

        const config = {
            dialect: SEQUELIZE_DIALECT,
            logging: LOGS ? Logger.debug : false,
            host: HOST,
            port: PORT,
            define: {
                underscored: true,
                freezeTableName: true,
            }
        };

        this.instance = new Sequelize(NAME, USERNAME, PASSWORD, config);
        this.buildModels();

        return this.authenticate(onConnection);
    }

    buildModels(){
        let modelData = ModelRegistry;
        let models = {};

        Object.keys(modelData).forEach(key => {
            let data = modelData[key];
            const { db_name, schema, options, associations } = data;
            models[key] = this.instance.define(db_name, schema, options || null);

            if ('associations' in modelData[key]) models[key].associate = (models) => {
                this.associateModel(models, models[key], associations);
            };
        });

        Object.keys(models).forEach( key => {
            if ('associate' in models[key]) models[key].associate(models);
            if ('instanceMethods' in modelData[key]) {
                for (let methodKey in modelData[key]['instanceMethods']){
                    models[key].prototype[methodKey] = modelData[key]['instanceMethods'][methodKey]
                }
            }
        });

        models.sequelize = this.instance;
        models.Sequelize = Sequelize;

        this.models = models;
    }

    associateModel(models, modelDefinition, associations){
        Object.keys(associations).forEach(key => {
            let associationType = associations[key];
            associationType.forEach((association) => {
                const { model, options } = association;
                modelDefinition[key](models[model], options);
            });
        })
    }

    async authenticate(onConnection){
        try{
            let auth = this.models.sequelize.authenticate();
            if (auth) await this.onConnection(onConnection);
        }catch(e){
            this.onConnectionRefusal(e,onConnection)
        }
    }

    async onConnection(onConnection){
        Logger.success('[Sequelize] Connected to database. Syncing models...');
        try{
            let synced = await this.models.sequelize.sync();
            if (synced) {
                Logger.success('[Sequelize] Initialized & models synced');
                onConnection();
            }
        }catch(e){
            Logger.error('[Sequelize] Could not sync sequelize',e);
        }
    }

    onConnectionRefusal(err, onConnection){
        Logger.error('[Sequelize] Not connected to database. Trying again...', err.original);
        setTimeout(()=>this.authenticate(onConnection), 1000);
    }
}

module.exports = Database;
