const Sequelize = require('sequelize');
const MODEL_NAMES = require('./model_names');

const {UUID, UUIDV1 } = Sequelize;

const ToBeFair = {
    db_name: 'to_be_fair',
    schema: {
        uuid: {type: UUID, primaryKey: true, defaultValue: UUIDV1},
    },
    options: {
        indexes: [{unique: true, fields: ['uuid']}],
        paranoid: true,
    },
    associations: {
        belongsTo: [
            {model: MODEL_NAMES.USER, foreignKey: 'user_id'}
        ]
    },
};

module.exports = ToBeFair;