var Metalsmith = require('./node_modules/metalsmith'),
  autoprefixer = require('./node_modules/metalsmith-autoprefixer'),
  branch = require('./node_modules/metalsmith-branch')
  browserSync = require('./node_modules/metalsmith-browser-sync'),
  collections = require('./node_modules/metalsmith-collections'),
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
  .use(collections({
    'posts': 'blog/*.md'
  }))
  .use(branch('**/*.md')
    .use(markdown())
    .use(permalinks({
      relative: false,
      linksets: [{
        match: {
          collection: 'posts'
        },
        pattern: 'blog/:title'
      }]
    }))
    .use(layouts({
      engine: 'handlebars',
      default: 'default.hbs',
      directory: 'templates',
      partials: 'partials',
      rename: true
    }))
  )
  .use(branch('scss/*.scss')
    .use(sass({
      outputDir: 'css/',
      outputStyle: 'expanded',
      sourceMap: true,
      sourceMapContents: true
    }))
    .use(autoprefixer())
  )
  .use(browserSync({
    server: 'build',
    files: ['src/**/*', 'templates/**/*.hbs', 'partials/**/*.hbs']
  }))
  .build(function(err) {
    if (err) throw err;
  })