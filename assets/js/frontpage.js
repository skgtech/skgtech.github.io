/**
 * @fileOverview scripts about the frontpage.
 */

var skg = skg || {};

var cal = new skg.Calendar();


var gapiload = function() {
  console.log('GOOGLE API LOADED');
  gapi.client.setApiKey('AIzaSyC75rnKyEkGxmVyG7hlqFicwPBgDmQLN_w');

  gapi.client.load('calendar', 'v3', function() {
    console.log('DONE!:', gapi.client.calendar);
    gapi.client.calendar.calendarList.list(function() {
      console.log('WTF BBQ:', arguments);
    });
  });

// www.googleapis.com/calendar/v3/calendars/{the public calendar ID}/events?key={my developer key from Google API Console}.
  // cal.fetch(function(err, data) {
    // console.log('FRONTPAGE done:', err);
  // });

};
