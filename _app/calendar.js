/**
 * @fileOverview scripts about the Calendarpage.
 */

var calendarth = require('calendarth');
var util       = require('./util');

var Calendar = module.exports = function() {

  this.$eventsContainer = null;
  this.$eventItem = null;
  this.$error = null;

};

/** @const {number} Maximum events to display, use an even number */
Calendar.MAX_EVENTS_SHOW = 8;

/**
 * Initialize the Calendarpage view.
 *
 */
Calendar.prototype.init = function() {

  this.$eventsContainer = $('#upcoming-events');
  this.$eventItem = $('#event-item');
  this.$error = $('#agenda-error');

  this.calendarth = calendarth({
    apiKey: 'AIzaSyC75rnKyEkGxmVyG7hlqFicwPBgDmQLN_w',
    calendarId: '2ul10sd9g30mnk1vpmcnnp5qv4@group.calendar.google.com',
    maxResults: 12
  });

  this.calendarth.fetch(this._handleCalResult.bind(this));

};

/**
 * Handle incoming calendarth data.
 *
 * @param {?string|Error} err Possible error message.
 * @param {Object=} data The calendar data object.
 * @private
 */
Calendar.prototype._handleCalResult = function(err, data) {

  this.$eventsContainer.empty();
  if (err) {
    this.$eventsContainer.append(this.$error.clone().removeClass('hide'));
    return;
  }

  var events = [];
  var displayed = 0;
  var htmlOutput = '';

  data.items.forEach(function(item) {

    if (displayed >= Calendar.MAX_EVENTS_SHOW) {
      return;
    }

    if (events.indexOf(item.summary) > -1) {
      return;
    } else {
      events.push(item.summary);
    }

    htmlOutput += this._assignValues(this.$eventItem.clone(), item);
    displayed++;

  }, this);

  htmlOutput += '';
  this.$eventsContainer.append(htmlOutput);

  if ( $('.upcoming_events').length ){
      $('.upcoming_events').imagesLoaded( function() {
          //
          $("#upcoming-events").isotope({
              itemSelector: ".upcoming_events",
              layoutMode: 'masonry',
              masonry: {
                  columnWidth: '.upcoming_events_sizer'
              }
          });

      });
  }

};

/**
 * Assign the Calendar item values to the Calendar item element.
 *
 * @param {jQuery} $item A jquery item we will manipulate.
 * @param {Object} item Google Calendar item.
 * @param {number} lineCounter The current line counter.
 * @return {string} The html representation.
 * @private
 */
Calendar.prototype._assignValues = function($item, item) {

  $item.find('div.upcoming_events').removeClass('hide');

  var $eventTitle = $item.find('.event_title span');
  var $eventDate = $item.find('.upcoming_label.label span');
  var $eventLocation = $item.find('.event_time_loc .location');
  var $eventDescription = $item.find('.event_summery');
  var $eventURL = $item.find('.event_title a');
  var $eventImage = $item.find('.event_cover_photo img');
  var $facebookURL = $item.find('.facebook-url');
  var $twitterURL = $item.find('.twitter-url');

  var eventData = this._parseDesc(item.description);

  // Set event photo
  if (eventData.image) {
      $eventImage.attr('src', eventData.image);
  } else {
      $eventImage.attr('src', '/assets/img/placeholders/event_image_placeholder.jpg');
  }
  // Set event title
  $eventTitle.text(item.summary);

  // Set event date
  var date = util.getDate(item.start) + ' - ' + util.getTime(item.start);
  $eventDate.text(date);

  // Set event location
  var location = null;
  var locationOutput = null;

  if (eventData.venue) {
      location = eventData.venue;
  } else {
      location = item.location;
  }

  if (eventData.mapUrl) {
      locationOutput = '<a href="'+ eventData.mapUrl + '" target="_blank">';
      locationOutput += location;
      locationOutput += '</a>';
  } else {
      locationOutput = location;
  }

  $eventLocation.html(locationOutput);

  // Set event description
  if (eventData.about) {
      $eventDescription.text(eventData.about);
  }

 // Set Info Url
 if (eventData.infoUrl) {

     var eventURL = eventData.infoUrl;
     var eventId = eventURL.lastIndexOf('/');

     $eventURL.attr('href', eventURL);

     // Set sharing links
     $facebookURL.attr('href', 'https://facebook.com/sharer.php?u='+eventURL);
     $twitterURL.attr('href', 'https://twitter.com/intent/tweet?text=' + item.summary +'&url='+ eventURL + '&via=skg_tech&related=skg_tech');

 }

 $item.find('.loading').addClass('hide');

 return $item.html();

};

/**
 * Parse the description and generated info.
 *
 * @param {string} descr The description
 * @return {Object} An object containing the following properties:
 *   venue {?string} The venue where the event happens or null.
 *   info {?string} The informational url or null.
 *   map {?string} The map url or null.
 *   language {?string} The event language.
 * @private
 */
Calendar.prototype._parseDesc = function(descr) {

  var out = {
    venue: null,
    infoUrl: null,
    mapUrl: null,
    about: null,
    image: null,
    language: null,
    rest: ''
  };

  if (!descr) {
    return out;
  }

  var lines = descr.split('\n');

  lines.forEach(function(line) {
    if (!line.length) {
      return;
    }

    var splitPos = line.indexOf(':');
    if (splitPos === -1) {
      return;
    }

    var key = line.substr(0, splitPos).toLowerCase().trim();
    var value = line.substr(splitPos + 1).trim();

    switch(key) {
    case 'venue':
      out.venue = value;
      break;
    case 'info':
      out.infoUrl = value;
      break;
    case 'map':
      out.mapUrl = value;
      break;
    case 'about':
      out.about = value;
      break;
    case 'language':
      out.language = value;
      break;
    case 'image':
     out.image = value;
     break;
    default:
      out.rest += line + '<br />';
      break;
    }
  }, this);

  return out;

};
