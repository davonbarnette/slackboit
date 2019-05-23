const axios = require('axios');

class CryptoManager {

    static async refreshCryptoListings(){
        let listingsURL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
        let listingsById = {};
        let cmcKey = process.env.CMC_TOKEN;
        let headers = {'X-CMC_PRO_API_KEY': cmcKey};
        let res = await axios.get(listingsURL, {headers});

        if (res){
            let allListings = res.data.data;
            allListings.forEach(listing => {
                const {symbol} = listing;
                listingsById[symbol] = listing;
            });
            return listingsById;
        }
    }

    static getCryptoObjectBySymbol(listingsById, symbol){
        return listingsById[symbol];
    }
}

module.exports = CryptoManager;

// {
//             "id": 1,
//             "name": "Bitcoin",
//             "symbol": "BTC",
//             "slug": "bitcoin",
//             "circulating_supply": 17717962,
//             "total_supply": 17717962,
//             "max_supply": 21000000,
//             "date_added": "2013-04-28T00:00:00.000Z",
//             "num_market_pairs": 7545,
//             "tags": [
//                 "mineable"
//             ],
//             "platform": null,
//             "cmc_rank": 1,
//             "last_updated": "2019-05-23T18:08:30.000Z",
//             "quote": {
//                 "USD": {
//                     "price": 7790.29883813,
//                     "volume_24h": 25468625052.2912,
//                     "percent_change_1h": -0.596545,
//                     "percent_change_24h": -1.64994,
//                     "percent_change_7d": -1.5293,
//                     "market_cap": 138028218782.6315,
//                     "last_updated": "2019-05-23T18:08:30.000Z"
//                 }
//             }
//         },