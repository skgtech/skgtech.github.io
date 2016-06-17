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

global.$ = require('jquery');

var Calendar = require('./calendar');
//var SlackApp = require('./slack-invite');
//require('./newsletter');

var calendar = new Calendar();
calendar.init();

// var slackApp = new SlackApp();
// slackApp.init({
//   email_container: '.slack-subscribe-email',
//   cta: '.slack-subscribe-button',
//   form: '.slack-form'
// });
