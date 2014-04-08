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


/**
 * Initialize the frontpage view.
 *
 */
Front.prototype.init = function() {
  this.$agendaContainer = $('#agenda-items');
  this.$agendaItem = $('#agenda-tpl');
  this.$error = $('#agenda-error');

  var cal = calendarth({
    apiKey: 'AIzaSyC75rnKyEkGxmVyG7hlqFicwPBgDmQLN_w',
    calendarId: '2ul10sd9g30mnk1vpmcnnp5qv4@group.calendar.google.com',
    maxResults: 6
  });

  cal.fetch(this._handleCalResult.bind(this));
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

  var elements = '<div class="row">';
  data.items.forEach(function(item, index) {
    if (index && index % 2 === 0) {
      // rows
      elements += '</div><div class="row">';
    }
    elements += this._assignValues(this.$agendaItem.clone(), item);
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
  $item.find('.agenda-tpl-when').text(util.formatDate(item.start.dateTime, item.end.dateTime));
  $item.find('.agenda-tpl-address').text(item.location);
  $item.find('.agenda-tpl-description').html(util.nl2br(item.description));

  return $item.html();
};
