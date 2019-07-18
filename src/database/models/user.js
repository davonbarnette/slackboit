const Sequelize = require('sequelize');
const MODEL_NAMES = require('./model_names');

const { STRING } = Sequelize;

const User = {
    db_name: 'user',
    schema: {
        uuid: {type: STRING, primaryKey: true},
    },
    options: {
        indexes: [{unique: true, fields: ['uuid']}],
        paranoid: true,
    },
    associations: {
        hasMany:[
            {model:MODEL_NAMES.TO_BE_FAIR, options: {targetKey: 'user_uuid'}}
        ]
    },
};

module.exports = User;