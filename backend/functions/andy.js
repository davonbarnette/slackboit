const Store = require("../store");
const IDoThings = require("../utils/idothings");
const ToBeFairService = require("../services/tbf_service");
const axios = require("axios");

class Andy {
  //Post a new example function below this line:

  static async tobefair(bot, user, slackMessage) {
    const { text, channel, event_ts, subtype, previous_message } = slackMessage;

    let post = {
      message: null,
      params: { icon_url: IDoThings.getImageURL("slackboit_monocle.png") }
    };

    const acknowledge = "to be fair";
    let lowered = text.toLowerCase();
    if (lowered.includes(acknowledge)) {
      let tbfCount = await ToBeFairService.createToBeFairEntry(user.id);
      post.message =
        `${user.profile.display_name}'s to be fair number: ` + tbfCount;
      return post;
    }
  }

  static technically(bot, user, slackMessage) {
    const { text, channel, event_ts, subtype, previous_message } = slackMessage;

    let post = {
      message: null,
      params: { icon_url: IDoThings.getImageURL("slackboit_matrix.png") }
    };
    const acknowledge = "technically";
    let lowered = text.toLowerCase();
    if (lowered.includes(acknowledge)) {
      post.message = "technically";
      return post;
    }
  }

  static lennyboit(bot, user, slackMessage) {
    const { text, channel, event_ts, subtype, previous_message } = slackMessage;

    let post = {
      message: null,
      params: {}
    };

    const acknowledge = "lennyboit";
    let lowered = text.toLowerCase();

    if (lowered.startsWith(acknowledge)) {
      if (lowered.endsWith("og")) {
        post.message = "( ͡° ͜ʖ ͡°)";
        return post;
      } else {
        let lennyfaces = [
          "( ͡° ͜ʖ ͡°)",
          "( ͠° ͟ʖ ͡°)",
          "( ͡~ ͜ʖ ͡°)",
          "( ͡o ͜ʖ ͡o)",
          "( ಠ ͜ʖಠ)",
          "(▀̿Ĺ̯▀̿ ̿)",
          "( ✧≖ ͜ʖ≖)",
          "(ง ͠° ͟ل͜ ͡°)ง",
          "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",
          "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",
          "(✿❦ ͜ʖ ❦)",
          "//( ͡°͡° ͜ʖ ͡°͡°)//",
          "╚═( ͡° ͜ʖ ͡°)═╝",
          "︵‿︵(´ ͡༎ຶ ͜ʖ ͡༎ຶ `)︵‿︵",
          "( ͡ ͡° ͡°  ʖ ͡° ͡°)",
          "( ͡°❥ ͡°)",
          "̿̿ ̿̿ ̿̿ ̵͇̿̿̿з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿",
          "( ͡◉◞ ͜ʖ◟ ͡◉)",
          "(∩ ͡° ͜ʖ ͡°)⊃━炎炎炎炎炎炎炎炎炎"
        ];

        post.message = IDoThings.pickRandomElement(lennyfaces);
        return post;
      }
    }
  }

  static async asciiBoit(bot, user, slackMessage) {
    let { text, channel, event_ts, subtype, previous_message } = slackMessage;

    let post = {
      message: null,
      params: {
        icon_url: IDoThings.getImageURL("slackboit_original.png")
      }
    };

    const acknowledge = "asciiboit ";

    let lowered = text;

    if (lowered.startsWith(acknowledge)) {
      lowered = IDoThings.deletusAcknowledge(text, acknowledge);
      let encodeBoit = encodeURIComponent(lowered);
      let asciiURL = `http://artii.herokuapp.com/make?text=${encodeBoit}`;
      let asciiReturn = "u suck";

      try {
        let response = await axios.get(asciiURL);
        if (response) {
          asciiReturn = response.data;
        }
      } catch (error) {
        //   post.message = "No u";
        // return post;
      }

      let output = "```" + asciiReturn + "```";
      post.message = output;
      return post;
    }
  }

  static async salesboit(bot, user, slackMessage) {
    let { text, channel, event_ts, subtype, previous_message } = slackMessage;

    let post = {
      message: null,
      params: {
        icon_url: IDoThings.getImageURL("salesboit.jpg")
      }
    };

    const acknowledge = "salesboit";
    let lowered = text.toLowerCase();
    if (lowered.startsWith(acknowledge)) {
      lowered = IDoThings.deletusAcknowledge(text, acknowledge);
      if (lowered.startsWith(" ")) {
        let split = lowered.split(" ");
        let product = split[1];
        let thing = split[2];

        let output =
          "* *Slaps roof of " +
          product +
          "* * this bad boy can fit so much " +
          thing +
          " in it";
        post.message = output;
        return post;
      } else {
        let output = "Not for sale, thot";
        post.message = output;
        return post;
      }
    }
  }
}

module.exports = Andy;
