var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  Metalsmith = require('./node_modules/metalsmith'),
  collections = require('./node_modules/metalsmith-collections'),
  drafts = require('./node_modules/metalsmith-drafts'),
  emoji = require('./node_modules/markdown-it-emoji'),
  excerpts = require('./node_modules/metalsmith-excerpts'),
  fontawesome = require('./node_modules/markdown-it-fontawesome'),
  footnote = require('./node_modules/markdown-it-footnote'),
  helpers = require('./node_modules/metalsmith-register-helpers'),
  hljs = require('./node_modules/highlight.js'),
  ignore = require('./node_modules/metalsmith-ignore'),
  layouts = require('./node_modules/metalsmith-layouts'),
  markdown = require('./node_modules/metalsmith-markdownit'),
  metadata = require('./node_modules/metalsmith-metadata'),
  pagination = require('./node_modules/metalsmith-pagination'),
  permalinks = require('./node_modules/metalsmith-permalinks'),
  sitemap = require('./node_modules/metalsmith-sitemap'),
  subscripts = require('./node_modules/markdown-it-sub'),
  superscripts = require('./node_modules/markdown-it-sup');

gulp.task('metalsmith', function() {
  Metalsmith(__dirname)
    .source('src')
    .destination('build')
    .clean(false)
    .use(drafts())
    .use(metadata({
      site: 'config.json'
    }))
    .use(collections({
      posts: {
        pattern: 'posts/*.md',
        sortBy: 'published',
        reverse: true
      }
    }))
    .use(ignore('config.json'))
    .use(markdown('default',{
      html: true,
      linkify: true,
      typographer: true,
      highlight: (code, lang) => {
        code = code.trim()

        // language is recognized by highlight.js
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
               hljs.highlight(lang, code, true).value +
               '</code></pre>';
          } catch (__) {}
        }

        return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(code) + '</code></pre>';
      },
    }).use(emoji).use(fontawesome).use(footnote).use(subscripts).use(superscripts))
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
    .use(helpers({
      directory: "_hbs/helpers"
    }))
    .use(layouts({
      engine: 'handlebars',
      default: 'default.hbs',
      directory: '_hbs/templates',
      partials: '_hbs/partials',
      rename: true
    }))
    .use(sitemap({
      hostname: 'https://www.dajocarter.com'
    }))
    .build(function(err) {
      if (err) console.log(err);
    });
});

gulp.task('img',['metalsmith'], function() {
  return gulp.src('_assets/img/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF}')
    .pipe(gulp.dest('build/img/'))
    .pipe(browserSync.stream());
});

gulp.task('js', ['metalsmith'], function() {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/headroom.js/dist/headroom.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'node_modules/jquery.scrollto/jquery.scrollTo.js',
      '_assets/js/master.js'
    ])
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('sass', ['metalsmith'], function() {
  return gulp.src(['node_modules/magnific-popup/dist/magnific-popup.css', 'node_modules/highlight.js/styles/agate.css', '_assets/scss/master.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe($.concat('master.css'))
    .pipe($.autoprefixer({
      browsers: [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ]
    }))
    .pipe($.uncss({
      html: [
        'https://www.dajocarter.com/404.html',
        'https://www.dajocarter.com/blog/index.html',
        'https://www.dajocarter.com/index.html',
        'https://www.dajocarter.com/blog/hosting-my-static-site/index.html',
        'https://www.dajocarter.com/blog/using-monit-and-slack-to-monitor-your-server/index.html',
        'https://www.dajocarter.com/blog/my-metalsmith-worflow/index.html',
        'https://www.dajocarter.com/blog/1/index.html'
      ]
    }))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*.md', 'src/**/*.json', '_hbs/**/*.hbs'], ['metalsmith']).on('change', browserSync.reload);
  gulp.watch(['_assets/img/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF}'], ['img']);
  gulp.watch(['_assets/js/**/*.js'], ['js']);
  gulp.watch(['_assets/scss/**/*.scss'], ['sass']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: 'build',
    watchTask: true
  });
});

gulp.task('build', ['img', 'js', 'sass']);

gulp.task('serve', ['build', 'browserSync', 'watch']);
