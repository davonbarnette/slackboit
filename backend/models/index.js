'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const SETTINGS = require('../settings');
const Logger = require('../utils/logger');

const db = {};

let sequelize;

const {SEQUELIZE_DIALECT, LOGS, HOST, PORT, NAME, USERNAME, PASSWORD} = SETTINGS.DB;

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

sequelize = new Sequelize(NAME, USERNAME, PASSWORD, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
