const SETTINGS = require('../settings')
const axios = require('axios')
const IDoThings = require('../utils/idothings')

class ThesaurusService {
  // synonym of specific definition & defaults to first one,consistent
  static async getSynonym(word, definition_id = 0) {
    let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${SETTINGS.THESAURUS_API_TOKEN}`

    let resp = await axios.get(url)
    if(!resp) return word

    let arrayOfSynonymArray = resp.data.meta.syns //dunno why it return arrays inside of an array, maybe if the word has multiple meanings it returns array for each?
    let synonym = IDoThings.pickRandomElement(arrayOfSynonymArray[definition_id])

    return synonym
  }

  // synonym of any possible definition, wild
  static async getRandoSynonym(word) {
    let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${SETTINGS.THESAURUS_API_TOKEN}`

    let resp = await axios.get(url)
    if(!resp) return word

    let arrayOfSynonymArray = resp.data.meta.syns //dunno why it return arrays inside of an array, maybe if the word has multiple meanings it returns array for each?
    let randoArrayOfArray = IDoThings.pickRandomElement(arrayOfSynonymArray)
    let randoSynonym = IDoThings.pickRandomElement(randoArrayOfArray)

    return randoSynonym
  }
}

module.exports = ThesaurusService;
