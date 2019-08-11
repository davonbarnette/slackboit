const Logger = require('../utils/logger');
const {Letter} = require('../models/index');

class LetterService {

    static async createALetterToWord(userId, letter, word){
        if (!letter || !word) return null;
        let values = {letter:letter.toLowerCase(), word: word.toLowerCase()};

        let foundOrCreated = await Letter.findOrCreate({where:values});
        let [curWordLetter, created] = foundOrCreated;
        if (created) {
            await curWordLetter.setUser(userId);
            return curWordLetter;
        }
        else return null;
    }
    static async getAllWordsForLetter(letter){
        let query = {where:{letter}};

        let words = await Letter.findAll(query);
        if (words) return words.map(entry => entry.get().word);
        else return null;
    }
    static async deleteAWordForLetter(letter, word){
        let query = {where: {letter:letter.toLowerCase(), word:word.toLowerCase()}};

        let eats = await Letter.findOne(query);
        if (eats) return await eats.destroy();
        else return null;
    }
}

module.exports = LetterService;