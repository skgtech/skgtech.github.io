(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * SKGTech
 * Thessaloniki Tech Community
 * https://github.com/skgtech/skgtech.github.io
 *
 * Copyright ©2015 SKGTech Contributors.
 * Licensed under the MIT license.
 */
/**
 * @fileOverview Frontend application bootstrap file
 */

var Front = require('./frontpage');
require('./newsletter');

var front = new Front();
front.init();

},{"./frontpage":2,"./newsletter":3}],2:[function(require,module,exports){
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

  this._fixPanels();
};

/**
 * A temp fix for panels height.
 *
 * @private
 */
Front.prototype._fixPanels = function() {
  var max = 0;
  $('.panel-info').each(function() {
    var currentHeight = $(this).height();
    if (currentHeight > max) {
      max = currentHeight;
    }
  });
  $('.panel-info').height(max);
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
  var elements = '<div class="row">';
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
      elements += '</div><div class="row">';
    }
    elements += this._assignValues(this.$agendaItem.clone(), item);
    displayed++;
  }, this);

  elements += '</div>';
  this.$agendaContainer.append(elements);
};

/**
 * Assign the Calendar item values to the Calendar item element.
 *
 * @param {jQuery} $item A jquery item we will manipulate.
 * @param {Object} item  [description]
 * @return {string} The html representation.
 * @private
 */
Front.prototype._assignValues = function($item, item) {
  $item.removeClass('hide');
  $item.find('.panel-title').text(item.summary);
  var data = this._parseDesc(item.description);

  $item.find('.agenda-tpl-when span').text(util.formatDate(item.start, item.end));

  var location = '';
  if (data.mapUrl) {
    location = '<a href="' + data.mapUrl + '" target="_blank">';
    location += item.location;
    location += '</a>';
  } else {
    location = item.location;
  }
  $item.find('.agenda-tpl-address span').html(location);

  if (data.venue) {
    $item.find('.agenda-tpl-venue span').text(data.venue);
  } else {
    $item.find('.agenda-tpl-venue').addClass('hide');
  }

  if (data.infoUrl) {
    var infoUrl = '';
    if (data.infoUrl.length > 25) {
      infoUrl = data.infoUrl.substr(0, 25) + '...';
    } else {
      infoUrl = data.infoUrl;
    }
    $item.find('.agenda-tpl-info a').attr('href', data.infoUrl).text(infoUrl);
  } else {
    $item.find('.agenda-tpl-info').addClass('hide');
  }

  if (data.about) {
    $item.find('.agenda-tpl-about span').html(data.about);
  } else {
    $item.find('.agenda-tpl-about').addClass('hide');
  }

  if (data.language) {
    $item.find('.agenda-tpl-language span').html(data.language);
  } else {
    $item.find('.agenda-tpl-language').addClass('hide');
  }

  var eventUrl = this.calendarth.getEventUrl(item);
  $item.find('.addcal').attr('href', eventUrl);
  $item.find('.viewcal').attr('href', item.htmlLink);

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

},{"./util":4,"calendarth":6}],3:[function(require,module,exports){
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

      $.ajax(options);

      return false;
    });
  };

  newsletter.mceSuccess = function(resp) {
    if (resp.result === 'success'){
      // Show thank
      $('#mc-embedded-subscribe-form').hide();
      $('.thankyou').removeClass('hide');
      return;
    }

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
    $('.js-error').show();
    $('.js-error').html(msg);
  };

  newsletter.mceInit();
})();

},{}],4:[function(require,module,exports){
/**
 * @fileOverview Utilities.
 */
var util = module.exports = {};

/**
 * nl2br
 *
 * @param {string} str The string
 * @return {string}  A stirng with newlines turned to <br />
 */
util.nl2br = function(str) {
  if (typeof str !== 'string') {
    return '';
  }

  return str.split('\n').join('<br />');
};

/**
 * Format a calendar start / end date to a single string
 *
 * @param {Object} start Start Object.
 * @param {Object} end End Object.
 * @return {string} Human readable string.
 */
util.formatDate = function(start, end) {
  // check if we have a dateTime defined
  var startDate;
  var endDate;
  var isMultiDay = false;
  if (start.dateTime) {
    startDate = new Date(start.dateTime);
    endDate = new Date(end.dateTime);
  } else {
    isMultiDay = true;
    startDate = new Date(start.date);
    endDate = new Date(end.date);
    // the substraction needs to happen because in Full Day events the end
    // time will jump +3h because of timezone (+2) and DST (+1)
    endDate = endDate - 11000000;
    endDate = new Date(endDate);
  }

  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sub'];
  var months =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];

  // establish date
  var out = days[startDate.getDay()];
  out += ', ' + months[startDate.getMonth()];
  out += ' ' + startDate.getDate();

  if (isMultiDay) {
    // multi-day event, check if it's just a single all-day
    if (startDate.getDate() === endDate.getDate() && startDate.getMonth() ===
      endDate.getMonth()) {
      // single all day event
      out += ', All day event';
    } else {
      // multi day
      out += ' - ' + days[endDate.getDay()] + ' ' + endDate.getDate();
    }
  } else {
    out += ' | ' + startDate.getHours() + ':' +
      util.twoDigit(startDate.getMinutes());
    out += ' - ' + endDate.getHours() + ':' +
      util.twoDigit(endDate.getMinutes());
  }

  return out;
};

/**
 * Forces return of two digits by prepending 0 if length is 1.
 *
 * @param {number} num The number
 * @return {string} Two digit representation as string.
 */
util.twoDigit = function(num) {
  var str = num + '';
  if (str.length === 1) {
    return '0' + str;
  } else {
    return str;
  }
};

},{}],5:[function(require,module,exports){
/*
 * Calendarth
 * Fetch a Public Google Calendar with AJAX
 * https://github.com/thanpolas/calendarth
 *
 * Copyright (c) 2014 Thanasis Polychronakis
 * Licensed under the MIT license.
 */
/**
 * @fileOverview Google Calendar client, fetches and parses calendar items.
 */

var Item = require('./item');

/**
 * The base class.
 *
 * @param {Object} options A dict with options to configure the Calendarth:
 *    @param {string} calendarId REQUIRED the calendar Id, looks like:
 *        djasldj23ljd23dj23ldj2%40group.calendar.google.com
 *    @param {string} apiKey A google API v3 key.
 * @constructor
 */
var Calendarth = module.exports = function(options) {
  this.options = options || {};
  this.apiKey = this.options.apiKey || null;
  this.calendarId = this.options.calendarId || null;
  this.maxResults = this.options.maxResults || 20;
};

/**
 * Fetch Calendar items.
 *
 * @param {Function(Error, Array.<Calendarth.Item>)} cb Node style callback.
 * @see https://github.com/thanpolas/calendarth/wiki/Google_Calendar_Object_v3
 */
Calendarth.prototype.fetch = function(cb) {
  var calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/';
  calendarUrl += this.calendarId + '/events?key=';
  calendarUrl += this.apiKey;

  var dt = new Date();
  calendarUrl += '&orderBy=startTime';
  calendarUrl += '&singleEvents=true';
  calendarUrl += '&timeMin=' + dt.toISOString();
  calendarUrl += '&maxResults=' + this.maxResults;
  $.ajax({
    type: 'GET',
    url: calendarUrl,
    crossDomain: true,
    dataType: 'json'
  }).done(function(data) {
    var item = new Item(data);
    cb(null, item);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    cb(errorThrown);
  });
};

/**
 * Return a url that will perform the "Add Event to Google Calendar" action.
 *
 * @param {Object} eventItem The event data object.
 * @return {string} The event link to use in the anchor element.
 */
Calendarth.prototype.getEventUrl = function(eventItem) {
  var linkParts = eventItem.htmlLink.split('=');
  var out = 'http://www.google.com/calendar/event?action=TEMPLATE&tmeid=';
  out += linkParts[1];
  out += '&tmsrc=';
  out += encodeURIComponent(eventItem.organizer.email);
  return out;
};

},{"./item":7}],6:[function(require,module,exports){
/**
 * @fileOverview Library Bootstrap.
 */

var Calendarth = require('./calendarth');

/**
 * The exported API, return a new instance of Calendarth.
 *
 * @param {Object} options Options.
 * @return {Calendarth} A new instance of Calendarth.
 */
module.exports = function(options) {
  return new Calendarth(options);
};

},{"./calendarth":5}],7:[function(require,module,exports){
/**
 * @fileOverview A wrapper that provides helpers on the calendar object.
 */

/**
 * A wrapper for the Google Calendar v3 Object.
 *
 * @param {Object} calendarObj The Google Calendar v3 Object.
 * @constructor
 */
var Item = module.exports = function(calendarObj) {
  // stub return with same object for now...
  return calendarObj;
  // this.calendarObj = calendarObj;
};

/**
 * Get a property or the whole calendar object.
 * @param {string=} optProp optionally define a property.
 * @return {Object|*} The Object or whatever type the property value is.
 */
Item.prototype.get = function(optProp) {
  if (optProp) {
    return this.calendarObj[optProp];
  } else {
    return this.calendarObj;
  }
};

},{}]},{},[1]);
