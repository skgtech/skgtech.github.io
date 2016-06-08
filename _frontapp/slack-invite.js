/**
 * @fileOverview scripts about the Slack Invitation form.
 */

var Slack = module.exports = function () {};

/** @const {string} X API KEY for AWS resource */
Slack.X_API_KEY = 'DdBItuHAoE1HE36jjEdmh4Pbx8QpCgDh6Te60gnz';

/** @const {string} API Endpoint to invite an email */
Slack.SUBSCRIBE_URL = 'https://pv201ybrq8.execute-api.eu-west-1.amazonaws.com/prod/slack';

/**
 * Initialize the frontpage view.
 *
 */
Slack.prototype.init = function (options) {
  /*jshint camelcase:false */
  if(!options.email_container) {
    throw 'Must set an input element selector';
  }
  if(!options.cta){
    throw 'Must set a Call to Action element selector';
  }

  this.$emailEl = $(options.email_container);
  this.$ctaEl = $(options.cta);
  this.$formEl = $(options.form);

  this.attachEvents();
};

Slack.prototype.attachEvents = function () {

  this.$ctaEl.on('click', this.handleFormSubmit.bind(this));
  this.$formEl.on('submit', this.handleFormSubmit.bind(this));
};

Slack.prototype.handleFormSubmit = function (e) {

  var that = this;
  e.preventDefault();
  var email = that.$emailEl.val();
  that.$ctaEl.text('loading');

  that.subscribe(email, function(err){
    $('.slack-alert').addClass('hidden');
    if(err){
      if(err === 'empty-email'){
        $('.slack-form .field').addClass('has-error');
        $('.slack-alert.slack-wrong-email').removeClass('hidden');
      }
      else if(err === 'wrong-email'){
        $('.slack-form .field').addClass('has-error');
        $('.slack-alert.slack-wrong-email').removeClass('hidden');
      }
      else if(err === 'already_in_team'){
        $('.slack-form .field').addClass('has-error');
        $('.slack-alert.slack-already-subscribed').removeClass('hidden');
      }
      that.$ctaEl.text('reset');
    } else {
      $('.slack-alert.slack-welcome').removeClass('hidden');
      that.$ctaEl.text('complete');
    }
  });
};

Slack.prototype.subscribe = function (email, cb) {

  if(!email || !email.length){
    cb('empty-email');
    return false;
  } else if(!(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email))){
    cb('wrong-email');
    return false;
  }

  $.ajax({
    method: 'GET',
    url: Slack.SUBSCRIBE_URL,
    headers:{
      'x-api-key':Slack.X_API_KEY
    },
    data: {
      email: email
    }
  })
    .success(function (res) {
      if(res.error){
        if(res.error === 'already_in_team'){
          cb('already_in_team');
        }

        if(res.error === 'already_invited'){
          cb('already_invited');
        }
      } else {
        cb(null);
      }
    })
    .error(function () {
      cb('err');
    });

};
