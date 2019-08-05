const Logger = require('../utils/logger');
const Store = require('../store');
const USERS_BY_ID = require('../utils/users');
const {User} = require('../models/index');

class UserService {

    static async updateUserRegistry(bot){
        Logger.info('[User Service] Updating user registry');
        let users = await bot.getUsers();
        let usersById = {};
        for (let i = 0; i < users.members.length; i++) {
            const user = users.members[i];
            const {id:uuid, profile} = user;
            usersById[uuid] = user;

            const {first_name, last_name, display_name} = profile;
            let defaults = {uuid, first_name, last_name, display_name};
            let foundOrCreated = await User.findOrCreate({where:{uuid}, defaults});
            if (foundOrCreated){
                let [user] = foundOrCreated;
                if (user) await user.update(defaults);
            }
        }
        usersById[USERS_BY_ID.SLACKBOIT] = {id:USERS_BY_ID.SLACKBOIT};
        Store.usersById = usersById;
        return Store.usersById;
    }
}

module.exports = UserService;