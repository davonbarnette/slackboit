const Sequelize = require('sequelize');
const MODEL_NAMES = require('./model_names');

const {UUID, UUIDV1, STRING } = Sequelize;

const EatMeDaddy = {
    db_name: 'eat_me_daddy',
    schema: {
        uuid: {type: UUID, primaryKey: true, defaultValue: UUIDV1},
        type: {type: STRING, defaultValue: 'restaurant' },
        location: {type: STRING, defaultValue: 'atlanta' },
        name: {type: STRING, isNull:false },
    },
    options: {
        indexes: [{unique: true, fields: ['uuid']}],
        paranoid: true,
    },
    associations: {
        belongsTo: [
            {model: MODEL_NAMES.USER, foreignKey: 'user_uuid'}
        ]
    },
};

module.exports = EatMeDaddy;