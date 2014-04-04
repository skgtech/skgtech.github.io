/**
 * @fileOverview Google Calendar client, fetches and parses calendar items.
 */

var skg = skg || {};

/**
 * The Calendar constructor.
 *
 * @constructor
 */
skg.Calendar = function() {

};

/**
 * Fetch Calendar items.
 *
 * @param {Function(Error, Object)} cb Node style callback.
 */
skg.Calendar.prototype.fetch = function(cb) {
  var calendarUrl = 'https://www.google.com/calendar/feeds/2ul10sd9g30mnk1vpmcnnp5qv4%40group.calendar.google.com/public/basic';
  calendarUrl = 'http://www.google.com/calendar/feeds/2ul10sd9g30mnk1vpmcnnp5qv4@group.calendar.google.com/public/full?alt=json';
  $.ajax({
    url: calendarUrl,
    crossDomain: true,
    dataType: 'json'
  }).done(function(data) {
    console.log('DONE!', data);
    window.zong = data;
    cb(null, data);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('FAILED:', textStatus, errorThrown);
    cb(errorThrown);
  });

};
