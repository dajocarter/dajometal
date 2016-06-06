var Metalsmith = require('./node_modules/metalsmith'),
  autoprefixer = require('./node_modules/metalsmith-autoprefixer'),
  branch = require('./node_modules/metalsmith-branch')
  browserSync = require('./node_modules/metalsmith-browser-sync'),
  ignore = require('./node_modules/metalsmith-ignore'),
  inPlace = require('./node_modules/metalsmith-in-place'),
  layouts = require('./node_modules/metalsmith-layouts'),
  markdown = require('./node_modules/metalsmith-markdown'),
  permalinks = require('./node_modules/metalsmith-permalinks'),
  sass = require('./node_modules/metalsmith-sass');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(ignore([
    'scss/vendor/*'
  ]))
  .build(function(err) {
    if (err) throw err;
  })