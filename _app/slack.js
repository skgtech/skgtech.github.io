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

  if(!options.emailField) {
    throw 'Must set an input element selector';
  }
  if(!options.cta){
    throw 'Must set a Call to Action element selector';
  }

  this.$emailEl = $(options.emailField);
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

  that.$ctaEl.button('loading');

  that.subscribe(email, function(err){

    $('.slack-alert').addClass('hidden');

    if(err) {

        that.$ctaEl.button('reset');

        switch(err) {
            case 'emptyEmail':
                $('.slack-alert.slack-invalid-email').removeClass('hidden');
                break;
            case 'wrongEmail':
                $('.slack-alert.slack-invalid-email').removeClass('hidden');
                break;
            case 'alreadySubscribed':
                $('.slack-alert.slack-already-subscribed').removeClass('hidden');
                break;
        }

    } else {
        $('.slack-alert.slack-success').removeClass('hidden');
        $('.slack-email').addClass('hidden');
        $('.slack-submit').addClass('hidden');
        that.$ctaEl.button('reset');

    }

  });
};

Slack.prototype.subscribe = function (email, cb) {

  if(!email || !email.length){
    cb('emptyEmail');
    return false;
  } else if(!(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email))){
    cb('wrongEmail');
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
          cb('alreadySubscribed');
        }

        if(res.error === 'already_invited'){
          cb('alreadySubscribed');
        }
      } else {
        cb(null);
      }
    })
    .error(function () {
      cb('err');
    });

};
