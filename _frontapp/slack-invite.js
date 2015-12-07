/**
 * @fileOverview scripts about the Slack Invitation form.
 */

var Slack = module.exports = function () {};

/** @const {string} AUTH TOKEN */
Slack.TOKEN = 'xoxp-3330967421-3332061266-7344001762-99c6a8';

/** @const {string} API Endpoint to invite an email */
Slack.SUBSCRIBE_URL = 'https://skgtech.slack.com/api/users.admin.invite';

/**
 * Initialize the frontpage view.
 *
 */
Slack.prototype.init = function (options) {

  if(!options.email_container){
    throw 'Must set an input element selector';
  }
  if(!options.cta){
    throw 'Must set a Call to Action element selector';
  }

  this.$emailEl = $(options.email_container);
  this.$ctaEl = $(options.cta);

  this.attachEvents();
};

Slack.prototype.attachEvents = function () {
  var that = this;
  this.$ctaEl.on('click', function(e){
    e.preventDefault();
    var email = that.$emailEl.val();
    that.$ctaEl.button('loading');
    that.subscribe(email, function(err){

      if(err){
        if(err === 'empty-email'){
          $('.slack-form .field').addClass('has-error');
        }
        else if(err === 'wrong-email'){
          $('.slack-form .field').addClass('has-error');
        }

        that.$ctaEl.button('reset');
      } else {
        that.$ctaEl.button('complete');
      }

    });
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
    method: 'POST',
    url: Slack.SUBSCRIBE_URL,
    data: {
      email: email,
      token: Slack.TOKEN,
      set_active: true
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
    .error(function (err) {
      cb('err');
    });

};
