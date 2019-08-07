const exampleSlackUser = require('../example_objects/slack_user');

class UserFactory {
    constructor(userId){
        Object.assign(this, exampleSlackUser);
        this.id = userId;
    }
}

module.exports = UserFactory;