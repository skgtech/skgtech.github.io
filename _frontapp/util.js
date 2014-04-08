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
 * @param {string} start Start datetime.
 * @param {string} end End datetime.
 * @return {string} Human readable string.
 */
util.formatDate = function(start, end) {
  var startDate = new Date(start);
  var endDate = new Date(end);

  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sub'];
  var months =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];

  // establish date
  var out = days[startDate.getDay()];
  out += ', ' + months[startDate.getMonth()];
  out += ' ' + startDate.getDate();

  if (startDate.getDate() !== endDate.getDate()) {
    // multi-day event
    out += ' - ' + endDate.getDate();
  } else {
    out += ' | ' + startDate.getHours() + ':' + startDate.getMinutes();
    out += ' - ' + endDate.getHours() + ':' + endDate.getMinutes();
  }

  return out;
};
