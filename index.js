var Metalsmith = require('./node_modules/metalsmith'),
  branch = require('./node_modules/metalsmith-branch')
  collections = require('./node_modules/metalsmith-collections'),
  drafts = require('./node_modules/metalsmith-drafts'),
  excerpts = require('./node_modules/metalsmith-excerpts'),
  emoji = require('./node_modules/markdown-it-emoji'),
  ignore = require('./node_modules/metalsmith-ignore'),
  inPlace = require('./node_modules/metalsmith-in-place'),
  layouts = require('./node_modules/metalsmith-layouts'),
  md = require('./node_modules/metalsmith-markdownit'),
  permalinks = require('./node_modules/metalsmith-permalinks');

var markdown = md('default');
markdown.parser.use(emoji);

Metalsmith(__dirname)
  .source('src')
  .destination('build')
  .use(ignore([
    'img/**/*',
    'js/**/*',
    'scss/**/*'
  ]))
  .use(drafts())
  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown)
  .use(excerpts())
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
  .build(function(err) {
    if (err) console.log(err);
  });