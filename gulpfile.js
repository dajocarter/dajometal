var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  Metalsmith = require('./node_modules/metalsmith'),
  branch = require('./node_modules/metalsmith-branch'),
  collections = require('./node_modules/metalsmith-collections'),
  drafts = require('./node_modules/metalsmith-drafts'),
  emoji = require('./node_modules/markdown-it-emoji'),
  excerpts = require('./node_modules/metalsmith-excerpts'),
  helpers = require('./node_modules/metalsmith-register-helpers'),
  ignore = require('./node_modules/metalsmith-ignore'),
  inPlace = require('./node_modules/metalsmith-in-place'),
  layouts = require('./node_modules/metalsmith-layouts'),
  md = require('./node_modules/metalsmith-markdownit'),
  metadata = require('./node_modules/metalsmith-metadata'),
  pagination = require('./node_modules/metalsmith-pagination'),
  permalinks = require('./node_modules/metalsmith-permalinks'),
  pump = require('./node_modules/pump'),
  sitemap = require('./node_modules/metalsmith-sitemap');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var markdown = md('default');
markdown.parser.use(emoji);

gulp.task('img', function() {
  return gulp.src('src/img/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF}')
    .pipe($.newer('build/img/'))
    .pipe($.imagemin())
    .pipe(gulp.dest('build/img/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(cb) {
  pump([
    gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/headroom.js/dist/headroom.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'node_modules/jquery.scrollto/jquery.scrollTo.js',
      'src/js/master.js'
    ]),
    $.concat('master.js', {
      newLine: ';'
    }),
    $.uglify(),
    $.rename('master.min.js'),
    gulp.dest('build/js'),
    browserSync.stream()
  ], cb );
});

gulp.task('sass', function(cb) {
  pump([
    gulp.src([
      'node_modules/magnific-popup/dist/magnific-popup.css',
      'src/scss/master.scss'
    ]),
    $.sourcemaps.init(),
    $.sass({
      outputStyle: 'compressed'
    }),
    $.autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }),
    $.concat('master.min.css'),
    $.sourcemaps.write('.'),
    gulp.dest('build/css'),
    browserSync.stream()
  ], cb );
});

gulp.task('metalsmith', function() {
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
      hostname: 'https://dajometal.pubstorm.site'
    }))
    .build(function(err) {
      if (err) console.log(err);
    });
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*', 'templates/**/*.hbs', 'partials/**/*.hbs'], ['metalsmith']).on('change', browserSync.reload);
  gulp.watch(['src/img/*'], ['img']);
  gulp.watch(['src/js/**/*.js'], ['js']);
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: 'build',
    watchTask: true
  });
});

gulp.task('build', ['metalsmith', 'img', 'js', 'sass']);

gulp.task('serve', ['build', 'browserSync', 'watch']);
