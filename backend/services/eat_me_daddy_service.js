const Logger = require('../utils/logger');
const {EatMeDaddy} = require('../models/index');

class EatMeDaddyService {

    static async createASpotToEatDaddy(userId, name, type, location){
        if (!name) return {success:false, message:'Requires a name.'};
        let values = {name:name.toLowerCase(), type: type.toLowerCase(), location: location.toLowerCase()};

        let created = await EatMeDaddy.create(values);
        if (created) {
            await created.setUser(userId);
            return created;
        }
        else return null;
    }
    static async getAllSpotsToEatDaddy(location, type){
        let query = {where:{}};
        if (location) query.where.location = location.toLowerCase();
        if (type) query.where.type = type.toLowerCase();

        let spots = await EatMeDaddy.findAll(query);
        if (spots) return spots.map(spot => spot.get().name);
        else return null;
    }
    static async deleteASpotToEatDaddy(name, location){
        let query = {where: {name:name.toLowerCase(), location:location.toLowerCase()}};

        let eats = await EatMeDaddy.findOne(query);
        if (eats) return await eats.destroy();

        else return null;
    }
}

module.exports = EatMeDaddyService;