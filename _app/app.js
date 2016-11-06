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

var React = require('react');
var ReactDOM = require('react-dom');

var Calendar = require('./calendar');
var Slack = require('./slack');
var Jobs = require('./jobs');
require('./theme');
require('./newsletter');

var calendar = new Calendar();
calendar.init();

var slack = new Slack();
slack.init({
  emailField: '.slack-email',
  cta: '.slack-submit',
  form: '.slack-form',
});

if (window.location.href.match(/jobs/)) {
  ReactDOM.render(
    <Jobs />,
    document.getElementById('jobBoard')
  );
}
