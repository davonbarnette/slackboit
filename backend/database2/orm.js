const Logger = require('../utils/logger');
const Database = require('./sequelize');
class ORMService {

    static async createInstanceOfModel(modelString, values, onErr, associations){
        Logger.db(`createInstanceOfModel${modelString}: `, values);
        return await Database.models[modelString].create(values, associations)
            .then((created) => created)
            .catch((e) =>
                onErr(`Could not create new ${modelString}`, 500, {text:`createInstanceOfModel: ${modelString}.create > `,err:e}));
    }

    static async findAllInstancesOfModel(modelString, query, onErr){
        Logger.db(`findAllInstancesOf${modelString}: `, query);
        return await Database.models[modelString].findAll(query)
            .then((found) => found)
            .catch((e) =>
                onErr(`Error finding instances of ${modelString}`, 500, {text:`findAllInstancesOfModel: ${modelString}.findAll > `,err:e}));
    }

    static async updateInstanceOfModel(instance, update, onErr){
        return await instance.update(update)
            .then((updated) => {
                let type = instance.uid || 'Instance has no uid';
                if (!updated || updated.length === 0){
                    onErr(`Instance ${type} does not exist`, 400, {text: `updateInstance: ${type} does not exist > `, err: null});
                    return null;
                }
                else if (updated.length > 1) {
                    onErr(
                    `Multiple instances found of same model: ${type}`, 500, {
                        text: 'updateInstance: Multiple instances found of same model > ',
                        err: null
                    });
                    return null;
                }
                else return updated;
            })
            .catch((e) => {
                let type = instance.uid || 'Instance has no uid';
                onErr(`Could not update ${type}`, 500, {
                    text: `updateInstanceOfModel: ${type}.update > `,
                    err: e
                })
            })
    }

    static async destroyInstanceOfModel(instance, onErr){
        return await instance.destroy()
            .then((number_destroyed) => {
                if (number_destroyed < 0) return null;
                return number_destroyed;
            })
            .catch((e) => {
                let type = instance.uid || 'Instance has no uid';
                onErr(`Could not destroy ${type}`, 500, {
                    text: `destroyInstanceOfModel: ${type}.destroy > `,
                    err: e
                })
            })
    }

    static async destroyAllInstancesOfModel(modelString, query, onErr){
        Logger.db(`destroyAllInstancesOf${modelString}: `, query);
        return await Database.models[modelString].destroy(query)
            .then((destroyed) => destroyed)
            .catch((e) =>
                onErr(`Error finding instances of ${modelString}`, 500, {text:`findAllInstancesOfModel: ${modelString}.findAll > `,err:e}));
    }
}

module.exports = ORMService;