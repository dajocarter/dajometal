var Metalsmith = require('./node_modules/metalsmith'),
    markdown = require('./node_modules/metalsmith-markdown');

Metalsmith(__dirname)
  .source('./src')
  .use(markdown())
  .destination('./build')
  .build(function(err) {
    if (err) throw err;
  })