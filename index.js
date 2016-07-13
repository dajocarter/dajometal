var Metalsmith = require('./node_modules/metalsmith'),
  branch = require('./node_modules/metalsmith-branch'),
  collections = require('./node_modules/metalsmith-collections'),
  drafts = require('./node_modules/metalsmith-drafts'),
  excerpts = require('./node_modules/metalsmith-excerpts'),
  emoji = require('./node_modules/markdown-it-emoji'),
  helpers = require('./node_modules/metalsmith-register-helpers'),
  ignore = require('./node_modules/metalsmith-ignore'),
  inPlace = require('./node_modules/metalsmith-in-place'),
  layouts = require('./node_modules/metalsmith-layouts'),
  md = require('./node_modules/metalsmith-markdownit'),
  metadata = require('./node_modules/metalsmith-metadata'),
  pagination = require('./node_modules/metalsmith-pagination'),
  permalinks = require('./node_modules/metalsmith-permalinks'),
  sitemap = require('./node_modules/metalsmith-sitemap');

var markdown = md('default');
markdown.parser.use(emoji);

Metalsmith(__dirname)
  .source('src')
  .destination('build')
  .clean(false)
  .use(ignore([
    'img/**/*',
    'js/**/*',
    'scss/**/*'
  ]))
  .use(drafts())
  .use(metadata({
    site: 'config.json'
  }))
  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date'
    }
  }))
  .use(ignore('*.json'))
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
  .use(helpers({
    directory: "helpers"
  }))
  .use(pagination({
    'collections.posts': {
      perPage: 5,
      layout: 'posts.hbs',
      first: 'blog/index.html',
      path: 'blog/:num/index.html',
      pageMetadata: {
        title: 'Blog Posts',
        description: 'Blog posts by dajocarter'
      }
    }
  }))
  .use(layouts({
    engine: 'handlebars',
    default: 'default.hbs',
    directory: 'templates',
    partials: 'partials',
    rename: true
  }))
  .use(sitemap({
    hostname: 'http://dajometal.netlify.com/'
  }))
  .build(function(err) {
    if (err) console.log(err);
  });
