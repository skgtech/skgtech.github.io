/**
 * @fileOverview scripts about the frontpage.
 */

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


// var gapiload = function() {
//   console.log('GOOGLE API LOADED');
//   gapi.client.setApiKey('AIzaSyC75rnKyEkGxmVyG7hlqFicwPBgDmQLN_w');

//   gapi.client.load('calendar', 'v3', function() {
//     console.log('DONE!:', gapi.client.calendar);
//     gapi.client.calendar.calendarList.list(function() {
//       console.log('WTF BBQ:', arguments);
//     });
//   });

// www.googleapis.com/calendar/v3/calendars/{the public calendar ID}/events?key={my developer key from Google API Console}.

// };
