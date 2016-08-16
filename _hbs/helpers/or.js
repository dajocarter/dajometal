/**
 * Block helper that renders a block if **any of** the given values
 * is truthy. If an inverse block is specified it will be rendered
 * when falsy.
 *
 * ```handlebars
 * {{#or a b c}}
 *   If any value is true this will be rendered.
 * {{/or}}
 * ```
 *
 * @name .or
 * @param {...any} `arguments`,
 * @param `options` Handlebars options object
 * @return {String} Block, or inverse block if specified and falsey.
 * @block
 * @api public
 */

module.exports = function(/* any, any, ..., options */) {
  var argLength = arguments.length - 1;
  var options = arguments[argLength];
  var success = false;
  var i = 0;
  while (i < argLength) {
    if (arguments[i]) {
      success = true;
      break;
    }
    i++;
  }
  if (success) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};