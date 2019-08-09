const snoowrap = require('snoowrap');
const axios = require('axios');
const Logger = require('../utils/logger');
const SETTINGS = require('../settings');

class RedditClass {

    constructor(clientId, clientSecret, accessTokenUrl, userAgent){
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.accessTokenUrl = accessTokenUrl;
        this.userAgent = userAgent;

        this.initialize();
    }

    async initialize(){
        let accessToken = await this.getAccessToken();
        if (accessToken) {
            const {userAgent} = this;
            this.api = new snoowrap({accessToken, userAgent});
        }
    }

    async getAccessToken(){
        let config = {
            auth: {username: this.clientId, password:this.clientSecret},
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "User-Agent":this.userAgent,
            },
        };
        try{
            let res = await axios.post(this.accessTokenUrl, 'grant_type=client_credentials', config);
            if (res) return res.data.access_token;
        }catch (e) {
            Logger.error('[Reddit] Could not get access token', e)
        }

    }
}

const {CLIENT_SECRET, CLIENT_ID, ACCESS_TOKEN_URL, USER_AGENT} = SETTINGS.REDDIT;
const Reddit = new RedditClass(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN_URL, USER_AGENT);

module.exports = Reddit;