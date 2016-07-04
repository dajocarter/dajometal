/**
 * Title case the given string.
 *
 * ```handlebars
 * {{titleize "this is title case"}}
 * //=> 'This Is Title Case'
 * ```
 * @param  {String} `str`
 * @return {String}
 * @api public
 */

module.exports.titleize = function(str) {
  if (str && typeof str === 'string') {
    var title = str.replace(/[ \-_]+/g, ' ');
    var words = title.match(/\w+/g);
    var len = words.length;
    var res = [];
    var i = 0;
    while (len--) {
      var word = words[i++];
      res.push(exports.capitalize(word));
    }
    return res.join(' ');
  }
};