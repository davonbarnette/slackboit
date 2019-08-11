const dotenv = require('dotenv');
const path = require('path');
if (process.env.NODE_ENV !== 'production') dotenv.config({path:path.resolve('./env/dev.env')});

const SETTINGS = require('../settings');
const {HOST, SEQUELIZE_DIALECT, PASSWORD, NAME, USERNAME} = SETTINGS.DB;

let config = {
    username:USERNAME,
    password:PASSWORD,
    database:NAME,
    host:HOST,
    dialect:SEQUELIZE_DIALECT,
    seederStorage: 'sequelize',
};

module.exports = {
  development: config,
  // test: config,
  production: config,
};