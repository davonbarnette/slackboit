const axios = require('axios');
const Settings = require('../settings');
const Store = require('../store');

class CryptoManager {

    static async refreshCryptoListings(){
        const {LISTINGS_URL, API_TOKEN} = Settings.COIN_MARKET_CAP;
        let headers = {'X-CMC_PRO_API_KEY': API_TOKEN};
        let res = await axios.get(LISTINGS_URL, {headers});

        if (res){
            let allListings = res.data.data;
            allListings.forEach(listing => Store.listingsById[listing.symbol] = listing);
            return true;
        }
        else return false;
    }

    static getCryptoObjectBySymbol(symbol){
        return Store.listingsById[symbol];
    }
}

module.exports = CryptoManager;