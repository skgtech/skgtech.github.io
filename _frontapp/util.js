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
    // multi-day event
    out += ' - ' + days[endDate.getDay()] + ' ' + endDate.getDate();
  } else {
    out += ' | ' + startDate.getHours() + ':' + startDate.getMinutes();
    out += ' - ' + endDate.getHours() + ':' + endDate.getMinutes();
  }

  return out;
};
