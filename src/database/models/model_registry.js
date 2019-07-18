const MODEL_NAMES = require('./model_names');
const User = require('./user');
const ToBeFair = require('./to_be_fair');

const {USER, TO_BE_FAIR} = MODEL_NAMES;

const ModelRegistry = {
    [USER]: User,
    [TO_BE_FAIR]: ToBeFair,
};

module.exports = ModelRegistry;




