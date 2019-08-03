const Yeetus = require('./functions/yeetus');
const Dan = require('./functions/dan');
const Andy = require('./functions/andy');
const Burtle = require('./functions/burtle');
const James = require('./functions/james');
const Logan = require('./functions/logan');
const Meghoit = require('./functions/meghoon');
/*
 * This file is where you'll register all of your functions. At the very least, there are 3 things you need to have in
 * your object: description, command, and function. The rest are optional, but that may change in the future. You can also
 * just pass the function itself, but that will mean it won't show up under Slackboit's helper function (the one that shows
 * all of the available Slackboit functions).
 *
 * Lastly, remember how this works. It runs through each one sequentially. So, it'll pass the text through crimeAlert,
 * then through refreshCrypto and so on.
 *
 */

const Register = [

    // *** Davon *** //
    {
        acknowledge: 'slackboit ',
        name: 'Crime Alert',
        command: 'Deleting a message',
        description: 'Slackboit helps fight crime. If you or a loved one had their message deleted, he will tell you.',
        function: Yeetus.crimeAlert,
    },
    {
        acknowledge: 'chainboit',
        name: 'SlackboitUnchained',
        command: 'chainboit [COMMAND]::[COMMAND]::[N COMMANDS]::[PHRASE] (chainboit imsorryslackboit::kawaiiboit::say this YEET)',
        description: 'Chain [N] number of slackboit commands in a row to create the ultimate aids. There is no limit to his power...',
        function: Yeetus.rechainTheBoit,
    },
    {
        acknowledge: 'rechain the boit',
        name: 'SlackboitRechained',
        command: 'rechain the boit [TIME IN SECONDS]',
        description: 'SlackboitUnchained becomes chained once more... smdh. Passing in no time defaults to 60 seconds.',
        function: Yeetus.rechainTheBoit,
    },
    {
        acknowledge: 'slackboit updeetus the yeetus',
        name: 'Updeetus the Yeetus',
        command: 'slackboit updeetus the yeetus',
        description: 'Slackboit updates all the boints in the chat',
        function: Yeetus.updeetusThatYeetus,
    },
    {
        acknowledge: 'slackboit gimme tendies',
        name: "Refresh Crypto Listings (Top 100)",
        command: 'slackboit gimme tendies',
        description: "Rate limited on our Tendies API, so use this to refresh the top 100 tendie list",
        function: Yeetus.refreshCrypto,
    },
    {
        acknowledge: 'slackboit what is ',
        name: "Get Crypto",
        command: 'slackboit what is [CRYPTO SYMBOL]',
        description: 'Money at full autismo',
        function: Yeetus.getCrypto,
    },
    {
        acknowledge: 'slackboit お前はもう死んでいる',
        name: "Kill the bnoit",
        command: 'slackboit お前はもう死んでいる',
        description: "Kill the boit for 60 seconds",
        function: Yeetus.omaeWaMouShindeiru,
    },
    {
        acknowledge: 'slackboit ',
        name: 'The Original Meme',
        command: 'slackboit [PHRASE]',
        description: 'Spongeboit',
        function: Yeetus.spongebobMeme,
    },
    {
        acknowledge: 'imsorryslackboit ',
        name: "I'm Sorry Jon",
        command: 'imsorryslackboit [PHRASE]',
        description: 'Slackboit from the void',
        function: Yeetus.imSorryJon,
    },
    {
        acknowledge: 'lmgtfy ',
        name: "Googley Woogley",
        command: 'lmgtfy [PHRASE]',
        description: 'Slackboit shows you how to google',
        function: Yeetus.lmgtfyBitch,
    },


    // *** Dan *** //
    {
        acknowledge: 'ahoy slackboit',
        name: "Piroit",
        command: 'ahoy slackboit',
        description: "Random... pirata phrases?",
        function: Dan.ahoit,
    },
    {
        acknowledge: 'slackboit,',
        name: "Eight Ball Boit",
        command: 'slackboit, [QUESTION]?',
        description: "Slackboit gives his opinion and tells the future.",
        function: Dan.eightBallBoit,
    },
    {
        acknowledge: 'good boit',
        name: "Good Boit",
        command: 'good boit',
        description: "Thanks daddy",
        function: Dan.goodBoit,
    },
    {
        acknowledge: ["good morning", "morno", "hello"],
        name: "Greetings",
        command: ["good morning", "morno", "hello"],
        description: "Welcome",
        function: Dan.greetingBoit,
    },
    {
        acknowledge: ['kawaiiboit', 'kawaiiboit act 2', 'kawaiiboit act 3'],
        name: "hewwo :3",
        command: ['kawaiiboit [PHRASE]', 'kawaiiboit act 2 [PHRASE]', 'kawaiiboit act 3 [PHRASE]'],
        description: "Forgive me master...",
        function: Dan.uWu__Boit,
    },
    //WRONG AREA DANIEL KUN
    {
        acknowledge: 'リマインダー : Happy 420',
        name: "Slackboit parties with us",
        command: 'リマインダー : Happy 420',
        description: "Slackboit parties with us",
        function: Dan.partyBoit,
    },
    // *** Andy *** //
    {
        acknowledge: ["to be fair"],
        name: "To Be Fair Counter",
        command: ["to be fair"],
        description: "Slackboit counts the amount of To Be Fairs ever said",
        function: Andy.tobefair,
    },
    {
        acknowledge: ["technically"],
        name: "Technically Matrix Boit",
        command: ["technically"],
        description: "Slackboit repeats whenever someone says technically with matrix icon",
        function: Andy.technically,
    },

    {
        acknowledge: ['lennyboit'],
        name: "lenny face",
        command: 'lennyboit',
        description: "Slackboit lennyfaces us",
        function: Andy.lennyboit,
    },


    // *** Burtle *** //
    // Burtle.exampleFunction,

    // *** James *** //
    {
        acknowledge: 'feed me boit',
        name: "Food Choices",
        command: 'feed me boit OR feed me boit [location] - Database functions // add|[name]|[type of place]|[location] OR del|[name]|[location]',
        description: "Slackboit will present to you a choice for food randomly from his list of choices. Please follow the comman above exactly, or else...",
        function: James.fatBoit,
    },
    {
        acknowledge: 'mapboit ',
        name: "Where the boit is this?",
        command: 'mapboit [food choice]',
        description: "Ask boit where something is and he will let you know.",
        function: James.whereFoodBoit,
    },

    // *** Logan *** //
    { 
        acknowledge: 'rollboit d',
        name: "dice slinger 3000",
        command: 'rollboit d[number]',
        description: "Choose your dice and roll it.",
        function: Logan.rollBoit,
    },

    // *** Meghoon *** //
    {
        acknowledge: 'feed me',
        name: 'Feed Meghoon',
        command: 'feed me',
        description: 'Can only be triggered by the meghoit herself',
        function: Meghoit.ketoizeMe,
    },
];

module.exports = Register;
