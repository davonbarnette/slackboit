const exampleMessage = require('../example_objects/message');

class SlackMessageFactory {
    constructor(userId, text) {
        Object.assign(this, exampleMessage);
        this.user = userId;
        this.text = text;
        this.event_ts = new Date().getTime();
        this.ts = new Date().getTime();
    }
}

module.exports = SlackMessageFactory;