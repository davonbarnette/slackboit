const Settings = require('../settings');

class IDoThings {

    //this functions expects a string
    static spongebobMemeify(text, acknowledge) {
        let split = text.split('');
        if (acknowledge && acknowledge.length && text.startsWith(acknowledge)) split.splice(0,acknowledge.length);
        return split.map((char, index) => {
            if (index % 2 === 0) return char.toLowerCase();
            else return char.toUpperCase();
        }).join('');
    }

    static getImageURL(assetName){
        const {HOST, STATIC_ASSET_PATH} = Settings;
        return `${HOST}/${STATIC_ASSET_PATH}/${assetName}`;
    }

    static pickRandomElement(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static convertToAids(username) {
        const nameMap = {
            'logab': 'desu-chan',
            'dan': 'dank-kun',
            'andy miller': 'andrew michael sebrene-chan',
            'burtle': 'andrew "boitle" burtle',
            'yeetus': 'yoitus',
            'jamz': 'james "hams" jamz-kun',
        };
        return nameMap[username] || username;
    }
}

module.exports = IDoThings;