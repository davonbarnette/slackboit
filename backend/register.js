const Yeetus = require("./functions/yeetus");
const Dan = require("./functions/dan");
const Andy = require("./functions/andy");
const Burtle = require("./functions/burtle");
const James = require("./functions/james");
const Logan = require("./functions/logan");
const Meghoit = require("./functions/meghoon");
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
    acknowledge: "slackboit ",
    name: "Crime Alert",
    command: "Deleting a message",
    description:
      "Slackboit helps fight crime. If you or a loved one had their message deleted, he will tell you.",
    function: Yeetus.crimeAlert
  },
  // {
  //   acknowledge: "roidit ",
  //   name: "reddit for the boit",
  //   command: "roidit [SUBREDDIT] [MAX NUM EMOJIS] [MAX NUM WORDS]",
  //   description: "Get a rando post from a subreddit and then copypasta that b",
  //   function: Yeetus.roidit
  // },
  {
    acknowledge: "clapboit ",
    name: "clap clap",
    command: "clapboit [PHRASE]",
    description: "clap the boits cheecks",
    function: Yeetus.clapCheeks
  },
  {
    acknowledge: "boitmandments ",
    name: "boitMANDMENTS",
    command:
      "boitmandments [COMMAND:add,delete,list] [CLAUSE NUMERAL] [CLAUSE TITLE] [CLAUSE DESCRIPTION] [PARENT CLAUSE]",
    description: "boitmandments at its fullest autism",
    function: Yeetus.boitmandments
  },
  {
    acknowledge: "slackboit updeetus the yeetus",
    name: "Updeetus the Yeetus",
    command: "slackboit updeetus the yeetus",
    description: "Slackboit updates all the boints in the chat",
    function: Yeetus.updeetusThatYeetus
  },
  {
    acknowledge: "slackboit gimme tendies",
    name: "Refresh Crypto Listings (Top 100)",
    command: "slackboit gimme tendies",
    description:
      "Rate limited on our Tendies API, so use this to refresh the top 100 tendie list",
    function: Yeetus.refreshCrypto
  },
  {
    acknowledge: "slackboit what is ",
    name: "Get Crypto",
    command: "slackboit what is [CRYPTO SYMBOL]",
    description: "Money at full autismo",
    function: Yeetus.getCrypto
  },
  {
    acknowledge: "slackboit お前はもう死んでいる",
    name: "Kill the bnoit",
    command: "slackboit お前はもう死んでいる",
    description: "Kill the boit for 60 seconds",
    function: Yeetus.omaeWaMouShindeiru
  },
  {
    acknowledge: "slackboit ",
    name: "The Original Meme",
    command: "slackboit [PHRASE]",
    description: "Spongeboit",
    function: Yeetus.spongebobMeme
  },
  {
    acknowledge: "imsorryslackboit ",
    name: "I'm Sorry Jon",
    command: "imsorryslackboit [PHRASE]",
    description: "Slackboit from the void",
    function: Yeetus.imSorryJon
  },
  {
    acknowledge: "lmgtfy ",
    name: "Googley Woogley",
    command: "lmgtfy [PHRASE]",
    description: "Slackboit shows you how to google",
    function: Yeetus.lmgtfyBitch
  },

  // *** Dan *** //
  {
    acknowledge: "ahoy slackboit",
    name: "Piroit",
    command: "ahoy slackboit",
    description: "Random... pirata phrases?",
    function: Dan.ahoit
  },
  {
    acknowledge: "slackboit,",
    name: "Eight Ball Boit",
    command: "slackboit, [QUESTION]?",
    description: "Slackboit gives his opinion and tells the future.",
    function: Dan.eightBallBoit
  },
  {
    acknowledge: "good boit",
    name: "Good Boit",
    command: "good boit",
    description: "Thanks daddy",
    function: Dan.goodBoit
  },
  {
    acknowledge: ["good morning", "morno", "hello"],
    name: "Greetings",
    command: ["good morning", "morno", "hello"],
    description: "Welcome",
    function: Dan.greetingBoit
  },
  {
    acknowledge: ["kawaiiboit", "kawaiiboit act 1", "kawaiiboit act 2", "kawaiiboit act 3"],
    name: "hewwo :3",
    command: [
      "kawaiiboit [PHRASE]",
      "kawaiiboit act 1 [PHRASE]",
      "kawaiiboit act 2 [PHRASE]",
      "kawaiiboit act 3 [PHRASE]"
    ],
    description: "Forgive me master...",
    function: Dan.uWu__Boit
  },
  //WRONG AREA DANIEL KUN
  {
    acknowledge: "リマインダー : Happy 420",
    name: "Slackboit parties with us",
    command: "リマインダー : Happy 420",
    description: "Slackboit parties with us",
    function: Dan.partyBoit
  },
  //WRONG AREA DANIEL KUN
  {
    acknowledge: "gifboit",
    name: "Slackboit, a gif please",
    command: "gifboit [WORD OR PHRASE]",
    description:
      "Slackboit hands you the perfect gif based on your search terms. If you specify nothing, good luck",
    function: Dan.giffyBoiteru
  },
  //WRONG AREA DANIEL KUN
  {
    acknowledge: "teslaboit ['turn on', 'turn off', 'temperature', 'location']",
    name: "teslaboit",
    command: "teslaboit, whats my car's temperature? or something like that",
    description:
      "commands for dans tesla",
    function: Dan.elonBoit
  },
  // *** Andy *** //
  {
    acknowledge: ["to be fair"],
    name: "To Be Fair Counter",
    command: ["to be fair"],
    description: "Slackboit counts the amount of To Be Fairs ever said",
    function: Andy.tobefair
  },
  {
    acknowledge: ["technically"],
    name: "Technically Matrix Boit",
    command: ["technically"],
    description:
      "Slackboit repeats whenever someone says technically with matrix icon",
    function: Andy.technically
  },

  {
    acknowledge: ["lennyboit"],
    name: "lenny face",
    command: "lennyboit",
    description: "Slackboit lennyfaces us",
    function: Andy.lennyboit
  },

  {
    acknowledge: "asciiboit",
    name: "Ascii Text Boit",
    command: "asciiboit",
    description:
      "Slackboit will turn your ugly sinful text into beautiful christian ASCII",
    function: Andy.asciiBoit
  },

  {
    acknowledge: "salesboit",
    name: "Car Salesman Boit",
    command: "asciiboit",
    description: "SALESBOIT SLAPS ROOF OF CAR",
    function: Andy.salesboit
  },

  // *** Burtle *** //
  {
    acknowledge: "smonk or dronk?",
    name: "boited up",
    command: "smonk or dronk?",
    description: "Slackboit will tell you how to get fucked up",
    function: Burtle.sobrietyBoit
  },

  // *** James *** //
  {
    acknowledge: "feed me boit",
    name: "Food Choices",
    command:
      "feed me boit OR feed me boit [location] - Database functions // add|[name]|[type of place]|[location] OR del|[name]|[location]",
    description:
      "Slackboit will present to you a choice for food randomly from his list of choices. Please follow the comman above exactly, or else...",
    function: James.fatBoit
  },
  {
    acknowledge: "mapboit ",
    name: "Where the boit is this?",
    command: "mapboit [food choice]",
    description: "Ask boit where something is and he will let you know.",
    function: James.whereFoodBoit
  },
  {
    acknowledge: "urbanboit ",
    name: "UrbanBoit",
    command: "urbanboit [word]",
    description:
      "Looking for the real definition of a word? Urbanboit can assist with that.",
    function: James.urbanBoit
  },
  {
    acknowledge: "smdh",
    name: "smdhBoit",
    command:
      "To add a word to a letter 'smdcreate [letter] [word]' and to delete a word from a letter 'smddelete [letter] [word]'",
    description: "Defines 'smdh'",
    function: James.smdhBoit
  },

  {
    acknowledge: "judgeboit",
    name: "JudgeBoit",
    command: "judgeboit [option 1] or [option 2]",
    description: "He makes the ultimate decision",
    function: James.judgeBoit
  },

  // *** Logan *** //
  {
    acknowledge: "rollboit d",
    name: "dice slinger 3000",
    command: "rollboit d[number]",
    description: "Choose your dice and roll it.",
    function: Logan.rollBoit
  },

  {
    acknowledge: "standboit ",
    name: "stand generator",
    command: "standboit [input string]",
    description: "generate stand name & stats using input string",
    function: Logan.standBoit
  },

  // *** Meghoon *** //
  {
    acknowledge: "feed me",
    name: "Feed Meghoon",
    command: "feed me",
    description: "Can only be triggered by the meghoit herself",
    function: Meghoit.ketoizeMe
  },
  {
    acknowledge: "bobbyboit",
    name: "bobbyboit",
    command: "bobbyboit",
    description: "bobbyboit",
    function: Meghoit.bobbyboit
  }
];

module.exports = Register;
