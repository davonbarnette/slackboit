const ORMService = require('../database/orm');
const MODEL_NAMES = require('../database/models/model_names');
const Logger = require('../utils/logger');
const Application = require('../index');

class ToBeFairService {
    static async createToBeFairEntry(userId){
        let values = {};
        let onErr = () => Logger.error('Error in DB user find/creation');

        let created = await ORMService.createInstanceOfModel(MODEL_NAMES.TO_BE_FAIR, values, onErr);
        if (created) created.setUser(userId);
        return await Application.database.models[MODEL_NAMES.TO_BE_FAIR].count();
    }
}

module.exports = ToBeFairService;