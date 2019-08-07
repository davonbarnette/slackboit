const express = require('express');
const SlackConsumer = require('../consumers/slack_consumer');

const slack = express.Router();

slack.post('/action-endpoint', SlackConsumer.onChallenge);
slack.get('/functions', SlackConsumer.onGetFunctions);
slack.post('/post-message', SlackConsumer.onPostMessage);
slack.get('/users', SlackConsumer.onGetUsers);
slack.get('/mock', SlackConsumer.onGetMockTemplate);

module.exports = slack;
