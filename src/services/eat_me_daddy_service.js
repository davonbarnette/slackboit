const ORMService = require('../database/orm');
const MODEL_NAMES = require('../database/models/model_names');
const Logger = require('../utils/logger');

class EatMeDaddy {
    static async createASpotToEatDaddy(userId, name, type, location){
        if (!name) return {success:false, message:'Requires a name.'};
        let values = {name:name.toLowerCase(), type: type.toLowerCase(), location: location.toLowerCase()};
        let onErr = (err, code, obj) => Logger.error(err, obj.err);

        let created = await ORMService.createInstanceOfModel(MODEL_NAMES.EAT_ME_DADDY, values, onErr);
        if (created) {
            await created.setUser(userId);
            return created;
        }
        else return null;
    }
    static async getAllSpotsToEatDaddy(location){
        let query = {};
        if (location) query.where = {location:location.toLowerCase()};
        let onErr = (err, code, obj) => Logger.error(err, obj.err);

        let spots = await ORMService.findAllInstancesOfModel(MODEL_NAMES.EAT_ME_DADDY, query, onErr);
        if (spots) {
            return spots.map(spot => spot.get().name);
        }
        else return null;
    }
    static async deleteASpotToEatDaddy(name, location){
        let query = {where: {name:name.toLowerCase(), location:location.toLowerCase()}};
        let onErr = (err, code, obj) => Logger.error(err, obj.err);

        let eats = await ORMService.findAllInstancesOfModel(MODEL_NAMES.EAT_ME_DADDY, query, onErr);
        if (eats && eats[0]) {
            await ORMService.destroyInstanceOfModel(eats[0], onErr);
            return {success:true, message:`Deleted place ${name} at ${location}`};
        }
        else return null;
    }
}

module.exports = EatMeDaddy;