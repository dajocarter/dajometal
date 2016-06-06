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
  .use(branch('**/*.md')
    .use(markdown())
    .use(permalinks())
    .use(layouts({
      engine: 'handlebars',
      default: 'default.hbs',
      directory: 'templates',
      partials: 'partials',
      rename: true
    }))
  )
  .build(function(err) {
    if (err) throw err;
  })