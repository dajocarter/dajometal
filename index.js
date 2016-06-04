var Metalsmith = require('./node_modules/metalsmith'),
    markdown = require('./node_modules/metalsmith-markdown');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(markdown())
  .build(function(err) {
    if (err) throw err;
  })