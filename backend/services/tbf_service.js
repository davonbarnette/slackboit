const ORMService = require('../database2/orm');
const MODEL_NAMES = require('../database2/models/model_names');
const Logger = require('../utils/logger');
const Database = require('../database2/sequelize');

class ToBeFairService {
    static async createToBeFairEntry(userId){
        let values = {};
        let onErr = (err, code, obj) => Logger.error(err, obj.err);

        let created = await ORMService.createInstanceOfModel(MODEL_NAMES.TO_BE_FAIR, values, onErr);
        if (created) await created.setUser(userId);
        return await Database.models[MODEL_NAMES.TO_BE_FAIR].count({where: {user_uuid:userId}});
    }
}

module.exports = ToBeFairService;