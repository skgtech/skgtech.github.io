/**
 * @fileOverview scripts about the frontpage.
 */

var calendarth = require('calendarth');

var front = module.exports = {};

front.init = function() {
  var cal = calendarth({
    apiKey: 'AIzaSyC75rnKyEkGxmVyG7hlqFicwPBgDmQLN_w',
    calendarId: '2ul10sd9g30mnk1vpmcnnp5qv4@group.calendar.google.com',
    maxResults: 6
  });

  cal.fetch(function(err, data) {
    if (err) {
      return;
    }
    console.log(data);
  });
};

front.init();
