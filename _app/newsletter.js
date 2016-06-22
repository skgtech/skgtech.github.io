/**
 * @fileOverview The newsletter js for MailChimp
 */
'use strict';

(function() {
  var newsletter = {};
  // mailchimp code
  newsletter.mceInit = function() {
    var options = {
      url: 'https://datablaster.us2.list-manage.com/subscribe/post-json?u=249dbe460c3c1857a489dde05&amp;id=b926e92856&c=?',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8'
    };

    $('#mc-embedded-subscribe-form').submit(function(ev){
      $('.response').hide();
      ev.preventDefault();

      // form position
      var email = this.EMAIL.value;
      options.data = $(this).serialize();
      options.success = function(resp) {
        newsletter.mceSuccess(resp, email);
      };

      $(this).find('button').text('loading');

      $.ajax(options);

      return false;
    });
  };

  newsletter.mceSuccess = function(resp) {

    // Success
    if (resp.result === 'success'){

        $('button').text("Done!");
        $('.newsletter-error').hide();

      return;
    }

    // Error
    var index = -1;
    var msg;
    try {
      var parts = resp.msg.split(' - ',2);
      if (parts[1] === undefined){
        msg = resp.msg;
      } else {
        var i = parseInt(parts[0], 10);
        if (i.toString() === parts[0]){
          index = parts[0];
          msg = parts[1];
        } else {
          index = -1;
          msg = resp.msg;
        }
      }
    } catch(e) {
      index = -1;
      msg = resp.msg;
    }
    console.log(resp);
    console.log("here");
    $('button').text("Go");

    $('.newsletter-error').show();
    $('.newsletter-error').html('<p>'+msg+'</p>');
  };

  newsletter.mceInit();
})();
