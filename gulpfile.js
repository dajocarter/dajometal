var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  Metalsmith = require('./node_modules/metalsmith'),
  branch = require('./node_modules/metalsmith-branch'),
  collections = require('./node_modules/metalsmith-collections'),
  drafts = require('./node_modules/metalsmith-drafts'),
  excerpts = require('./node_modules/metalsmith-excerpts'),
  ignore = require('./node_modules/metalsmith-ignore'),
  inPlace = require('./node_modules/metalsmith-in-place'),
  layouts = require('./node_modules/metalsmith-layouts'),
  markdown = require('./node_modules/metalsmith-markdown'),
  permalinks = require('./node_modules/metalsmith-permalinks');

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

gulp.task('img', function() {
  return gulp.src(['src/img/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF}'], {
      base: '.'
    })
    .pipe($.newer('src/img/'))
    .pipe($.imagemin())
    .pipe(gulp.dest('build/img/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(['src/js/vendor/*.js', 'src/js/*.js'])
    .pipe($.concat('master.js', {
      newLine: ';'
    }))
    .pipe($.uglify(false))
    //.pipe($.rename('master.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src('src/scss/master.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

gulp.task('metalsmith', function() {
  Metalsmith(__dirname)
  .source('src')
  .destination('build')
  .use(ignore([
    'img/',
    'js/',
    'scss/'
  ]))
  .use(drafts())
  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
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
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*', 'templates/**/*.hbs', 'partials/**/*.hbs'],['metalsmith']).on('change', browserSync.reload);
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