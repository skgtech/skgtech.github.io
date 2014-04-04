/**
 * @fileOverview scripts about the frontpage.
 */

var skg = skg || {};

var cal = new skg.Calendar();

cal.fetch(function(err, data) {
  console.log('FRONTPAGE done:', err);
});
