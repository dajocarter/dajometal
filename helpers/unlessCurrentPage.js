/**
 * Block helper that always renders the inverse block **unless `a` is
 * is equal to `b`**.
 *
 * @name .unlessEq
 * @param {String} `a`
 * @param {String} `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Inverse block by default, or block if falsey.
 * @block
 * @api public
 */

module.exports = function(context, options) {
  var path = context.split('/');
  if ((path.length > 2 && path[1] === options.hash.compare) || (path.length == 2 && options.hash.compare == 1)) {
    return options.inverse(this);
  }
  return options.fn(this);
};