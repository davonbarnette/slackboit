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
            'U8PJGRTGE': 'desu-chan', //Logan
            'U8F1U7VRS': 'dank-kun', //Dan
            'U8DJE663U': 'andrew michael sebrene-chan', //Andy
            'U8NK2RBT9': 'andrew "boitle" burtle', //Burtle
            'U9ADFB6H1': 'yoitus "hot_cheeto_big_yeeto"', //Davon
            'U8ELJLTHV': 'james "hams" jamz-kun', //James
            'UL4TKUJG3': 'meghoit', //Meghan
            'UDKRCNYUU': 'chinn-chan', //Jessica
            'UL6FD65TM': 'coitnoisty "the noistiest"', //Cortney
        };
        return nameMap[username] || username;
    }
}

module.exports = IDoThings;