const Logger = require('../utils/logger');
const {Boitmandment} = require('../models/index');

class BoitmandmentService {

    static async createABoitmandment(userId, numeral, title, description, parent_clause){
        if (!numeral || !title || !description) return null;
        let where = {numeral:numeral.toLowerCase()};
        let defaults = {title, description};
        let foundOrCreated = await Boitmandment.findOrCreate({where, defaults});
        const [boitmandment, created] = foundOrCreated;
        if (created) {
            await boitmandment.setUser(userId);
            if (parent_clause) await boitmandment.setBoitmandment(parent_clause.toLowerCase());
            return boitmandment;
        }
        else return null;
    }
    static async getAllBoitmandments(){
        let boitmandments = await Boitmandment.findAll();
        if (boitmandments) return boitmandments.map(boitmandment => boitmandment.get());
        else return null;
    }
    static async deleteBoitmandment(numeral){
        let query = {where: {numeral:numeral.toLowerCase()}};
        let boitmandment = await Boitmandment.findOne(query);
        if (boitmandment) return await boitmandment.destroy();

        else return null;
    }
}

module.exports = BoitmandmentService;