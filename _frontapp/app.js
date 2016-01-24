/*
 * SKGTech
 * Thessaloniki Tech Community
 * https://github.com/skgtech/skgtech.github.io
 *
 * Copyright ©2015 SKGTech Contributors.
 * Licensed under the MIT license.
 */
/**
 * @fileOverview Frontend application bootstrap file
 */

var Front = require('./frontpage');
var SlackApp = require('./slack-invite');
require('./newsletter');

var front = new Front();
front.init();

var slackApp = new SlackApp();
slackApp.init({
  email_container: '.slack-subscribe-email',
  cta: '.slack-subscribe-button',
  form: '.slack-form'
});
