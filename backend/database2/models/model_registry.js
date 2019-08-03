const MODEL_NAMES = require('./model_names');
const User = require('./user');
const ToBeFair = require('./to_be_fair');
const EatMeDaddy = require('./eat_me_daddy');

const {USER, TO_BE_FAIR, EAT_ME_DADDY} = MODEL_NAMES;

const ModelRegistry = {
    [USER]: User,
    [TO_BE_FAIR]: ToBeFair,
    [EAT_ME_DADDY]: EatMeDaddy,
};

module.exports = ModelRegistry;




