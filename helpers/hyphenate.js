/**
 * Replace spaces in a string with hyphens.
 *
 * ```handlebars
 * {{hyphenate "foo bar baz qux"}}
 * //=> "foo-bar-baz-qux"
 * ```
 * @param  {String} `str`
 * @return {String}
 * @api public
 */

module.exports.hyphenate = function(str) {
  if (str && typeof str === 'string') {
    return str.split(' ').join('-');
  }
};