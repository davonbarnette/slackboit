const express = require('express');
const SlackConsumer = require('../consumers/slack_consumer');

const slack = express.Router();

slack.post('/action-endpoint', SlackConsumer.onChallenge);

module.exports = slack;
