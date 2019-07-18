const Settings =  {
    COIN_MARKET_CAP: {
        LISTINGS_URL:'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        API_TOKEN:process.env.CMC_TOKEN,
        ICON_NAME:'slackboit_final_crypto.png',
    },
    DB: {
        LOGS:process.env.DB_LOGS === 'true',
        HOST:process.env.DB_HOST,
        PORT: parseInt(process.env.DB_PORT || ''),
        SEQUELIZE_DIALECT:process.env.DB_SEQUELIZE_DIALECT,
        NAME:process.env.DB_NAME,
        USERNAME:process.env.DB_USERNAME,
        PASSWORD:process.env.DB_PASSWORD,
        CUSTOM_DEBUG:process.env.DB_CUSTOM_DEBUG === 'true',
    },
    DEBUG:process.env.DEBUG,
    HOST:process.env.HOST,
    STATIC_ASSET_PATH: 'static/imgs',
    SERVER_PORT:process.env.SERVER_PORT,
};

module.exports = Settings;

