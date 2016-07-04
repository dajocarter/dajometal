/**
 * Capitalize the first word in a sentence.
 *
 * ```handlebars
 * {{capitalize "foo bar baz"}}
 * //=> "Foo bar baz"
 * ```
 * @param  {String} `str`
 * @return {String}
 * @api public
 */

module.exports.capitalize = function(str) {
  if (str && typeof str === 'string') {
    return str.charAt(0).toUpperCase()
      + str.slice(1);
  }
};