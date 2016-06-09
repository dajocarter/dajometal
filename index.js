var Metalsmith = require('./node_modules/metalsmith'),
  branch = require('./node_modules/metalsmith-branch')
  collections = require('./node_modules/metalsmith-collections'),
  ignore = require('./node_modules/metalsmith-ignore'),
  inPlace = require('./node_modules/metalsmith-in-place'),
  layouts = require('./node_modules/metalsmith-layouts'),
  markdown = require('./node_modules/metalsmith-markdown'),
  permalinks = require('./node_modules/metalsmith-permalinks'),

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
  }))
  .build(function(err) {
    if (err) throw err;
  })