const SETTINGS = require('../settings')
const axios = require('axios')
const IDoThings = require('../utils/idothings')

class ThesaurusService {
  // synonym of specific definition & defaults to first one,consistent
  static async getSynonym(word, definitionId = 0) {
    let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${SETTINGS.THESAURUS_API_TOKEN}`

    try {
      let resp = await axios.get(url)
      let arrayOfDefinitions = resp.data
      let synonyms = arrayOfDefinitions[definitionId].meta.syns
      let synonym = IDoThings.pickRandomElement(synonyms[definitionId])
      return synonym
    } catch (error) {
      return word
    }
  }

  // synonym of any possible definition, wild
  static async getRandoSynonym(word) {
    let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${SETTINGS.THESAURUS_API_TOKEN}`

    try {
      let resp = await axios.get(url)
      let arrayOfDefinitions = resp.data
      let randoSynonyms = IDoThings.pickRandomElement(arrayOfDefinitions).meta.syns
      let randoSynonym = IDoThings.pickRandomElement(randoSynonyms)

      return randoSynonym
    } catch (error) {
      return word
    }
  }
}

module.exports = ThesaurusService;
