/**
 * @fileOverview scripts about the frontpage.
 */

var calendarth = require('calendarth');

var util = require('./util');

var Front = module.exports = function() {
  this.$agendaContainer = null;
  this.$agendaItem = null;
  this.$error = null;
};

/** @const {number} Maximum events to display, use an even number */
Front.MAX_EVENTS_SHOW = 8;

/**
 * Initialize the frontpage view.
 *
 */
Front.prototype.init = function() {
  this.$agendaContainer = $('#agenda-items');
  this.$agendaItem = $('#agenda-tpl');
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
Front.prototype._handleCalResult = function(err, data) {
  this.$agendaContainer.empty();
  if (err) {
    this.$agendaContainer.append(this.$error.clone().removeClass('hide'));
    return;
  }

  var meetups = [];
  var displayed = 0;
  var lineCounter = 0;
  var htmlOutput = '';
  data.items.forEach(function(item) {
    if (displayed >= Front.MAX_EVENTS_SHOW) {
      return;
    }

    if (meetups.indexOf(item.summary) > -1) {
      return;
    } else {
      meetups.push(item.summary);
    }

    if (displayed && displayed % 2 === 0) {
      // rows
      // htmlOutput += '</div><div class="row">';
    }
    htmlOutput += this._assignValues(this.$agendaItem.clone(), item, lineCounter);
    displayed++;
    lineCounter++;
    if (lineCounter > 2) {
      lineCounter = 0;
    }
  }, this);

  htmlOutput += '';
  this.$agendaContainer.append(htmlOutput);
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
Front.prototype._assignValues = function($item, item, lineCounter) {
  $item.removeClass('hide');

  console.log('WTF:', $item.find('article.calendar-entry'));
  $item.find('article.calendar-entry').addClass('calendar-entry-' + lineCounter);
  $item.find('.title').addClass('title-' + lineCounter);

  $item.find('.title').text(item.summary);

  var data = this._parseDesc(item.description);

  $item.find('.date').text(util.getDate(item.start));
  $item.find('.time').text(util.getTime(item.start));

  var location = null;
  var locationOutput = '';
  if (data.venue) {
    location = data.venue;
  } else {
    location = item.location;
  }

  // chop down length
  if (location.length > 12) {
    location = location.substr(0, 9) + '...';
  }

  if (data.mapUrl) {
    locationOutput = '<a href="' + data.mapUrl + '" target="_blank">';
    locationOutput += location;
    locationOutput += '</a>';
  } else {
    locationOutput = location;
  }


  $item.find('.location-name').html(locationOutput);

  if (data.infoUrl) {
    $item.find('.more-info').attr('href', data.infoUrl);
  } else {
    $item.find('.more-info').addClass('hide');
  }

  if (data.about) {
    $item.find('.details p').html(data.about);
  } else {
    $item.find('.details').addClass('hide');
  }

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
Front.prototype._parseDesc = function(descr) {
  var out = {
    venue: null,
    infoUrl: null,
    mapUrl: null,
    about: null,
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
    default:
      out.rest += line + '<br />';
      break;
    }
  }, this);

  return out;
};
