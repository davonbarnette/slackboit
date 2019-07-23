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
            'U9ADFB6H1': 'yoitus "hotto cheeto bigg yeeto"', //Davon
            'U8ELJLTHV': 'james "hams" jamz-kun', //James
            'UL4TKUJG3': 'meghoit', //Meghan
            'UDKRCNYUU': 'chinn-chan', //Jessica
            'UL6FD65TM': 'coitnoisty "the noistiest"', //Cortney
        };
        return nameMap[username] || username;
    }
    
    static introductions(oppo){
        let logan = 'In this corner, weighing in at a buck thirty\nThe kicker of shins\nThe saver of coin\nThe wiki of memes\nYour fierce, grammatically correct...\n*LOGAB!*';
        
        let sequenceD = 'In this corner, weighing in at 420 and 69 pounds\nThe _To Be Fair_ Count Record Holder\nThe passenger of his Tesla\nThe fletcher of logs\nThe man to never text back, your one and only...\n*DANK-KUN!*';
        
        let sequenceA = 'In this corner, weighing in at one hundred and eighty one pounds\nIdeas??\nThe Evil Slackboit\nThe god of the YeetZone, your true king...\n*MILLER!*\n';
        
        let sequenceBoitie = 'In this corner weighing in at a mere one hundred and ninety nine pounds\nThe record holder for number of declined invites\nThe hater of concrete jungles\nThe always smorkin...\n*BOINTLER!*';
        
        let sequenceDavboit = 'In this corner weighing in at one hundred and fifty four pounds\nThe King of Code\nThe Back to Back Largest Nut Champion\nYour intermitate fasting expert...\n*DAVBOIT!*';
        
        let sequenceJ = 'In this corener weighing in at an even one hundred pounds\nMr. Speak before you think\nIdea Extraordinaire\nArgues just to Argue\nBefore you roast me...\n*JAMZ!*';
    }
}

module.exports = IDoThings;