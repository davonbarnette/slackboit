const ORMService = require('../database/orm');
const MODEL_NAMES = require('../database/models/model_names');
const Logger = require('../utils/logger');
const Store = require('../store');

class UserService {
    static async updateUserRegistry(bot){
        let users = await bot.getUsers();
        let usersById = {};
        for (let i = 0; i < users.members.length; i++) {
            const user = users.members[i];
            const {id:uuid, profile} = user;
            usersById[uuid] = user;

            let query = {where: {uuid}};
            let onErr = (err, code, obj) => Logger.error(obj.err);
            let dbUsers = await ORMService.findAllInstancesOfModel(MODEL_NAMES.USER, query, onErr);
            const {first_name, last_name, display_name} = profile;
            let values = {uuid, first_name, last_name, display_name};
            if (dbUsers){
                let [user] = dbUsers;
                if (!user) await ORMService.createInstanceOfModel(MODEL_NAMES.USER, values, onErr);
                else await ORMService.updateInstanceOfModel(user, values, onErr);
            }
        }
        Store.usersById = usersById;
        return Store.usersById;
    }
}

module.exports = UserService;