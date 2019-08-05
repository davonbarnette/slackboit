const {ToBeFair} = require('../models/index');

class ToBeFairService {

    static async createToBeFairEntry(userId){
        let created = await ToBeFair.create();
        if (created) await created.setUser(userId);
        return ToBeFair.count({where:{uuid:userId}});
    }

}

module.exports = ToBeFairService;