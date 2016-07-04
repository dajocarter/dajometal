var helperMoment = require('helper-moment');

module.exports.moment = function(str, pattern) {
  return helperMoment(str, pattern);
}