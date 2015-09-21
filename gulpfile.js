var gulp = require('gulp');

// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();
var del = require('del');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var reload = browserSync.reload;
var bs;

// Jekyll tasks
gulp.task('jekyll', $.shell.task('jekyll build'));
gulp.task('jekyll-rebuild', ['jekyll'], function () {
  reload();
});
gulp.task('clean', del.bind(null, ['_site']));

// JS browserify task
gulp.task('scripts', function () {
  var b = browserify({
    entries: './_frontapp/app.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.uglify())
      .on('error', $.util.log)
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/js/'));
});

// Styling task
gulp.task('styles', function () {
  return gulp.src('./_sass/boot.scss')
    .pipe($.sass())
    .pipe($.autoprefixer('last 1 version', { cascade: true }))
    .pipe($.rename('main.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'))
    // Injects the CSS changes to your browser since Jekyll doesn't rebuild the CSS
    .pipe(reload({stream: true}));
});

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task('serve', ['styles', 'jekyll'], function () {
  bs = browserSync({
    notify: true,
    // tunnel: '',
    server: {
      baseDir: '_site'
    }
  });
});

// Watch everything
gulp.task('watch', function () {
  gulp.watch([
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './about/**/*.html',
    './*.md',
    './*.html',
    './*.xml',
    './*.txt'
  ],
  [
    'jekyll-rebuild'
  ]);
  gulp.watch(['./_frontapp/**/*.js'], ['scripts', 'jekyll-rebuild']);
  // gulp.watch(['./css/**/*.css'], ['jekyll-rebuild']);
  gulp.watch(['./_sass/**/*.scss'], ['styles']);
});

gulp.task('default', ['serve', 'watch']);
