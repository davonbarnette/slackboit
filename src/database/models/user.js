const Sequelize = require('sequelize');
const MODEL_NAMES = require('./model_names');

const { STRING, UUIDV1 } = Sequelize;

const User = {
    db_name: 'user',
    schema: {
        uuid: {type: STRING, primaryKey: true, defaultValue: UUIDV1},
    },
    options: {
        indexes: [{unique: true, fields: ['uuid']}],
        paranoid: true,
    },
    associations: {
        hasMany:[
            {model:MODEL_NAMES.TO_BE_FAIR, options: {targetKey: 'user_id'}}
        ]
    },
};

module.exports = User;