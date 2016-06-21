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

var Calendar = require('./calendar');
var Slack = require('./slack');
require('./theme');
//require('./newsletter');

var calendar = new Calendar();
calendar.init();

var slack = new Slack();
slack.init({
  emailField: '.slack-email',
  cta: '.slack-submit',
  form: '.slack-form'
});
