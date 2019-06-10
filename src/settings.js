const Settings =  {
    COIN_MARKET_CAP: {
        LISTINGS_URL:'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        API_TOKEN:process.env.CMC_TOKEN,
        ICON_NAME:'slackboit_final_crypto.png',
    },
    HOST:process.env.HOST,
    STATIC_ASSET_PATH: 'static/imgs',
};

module.exports = Settings;

