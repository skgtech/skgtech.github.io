var gulp        = require('gulp');
var browserify  = require('browserify');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var cp          = require('child_process');
var loadPlugins = require('gulp-load-plugins')();
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['browserify','jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['browserify','sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Browserify js scripts
 */
gulp.task('browserify', function () {
  var b = browserify({
    entries: './_app/app.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(loadPlugins.sourcemaps.init({loadMaps: true}))
      .pipe(loadPlugins.uglify())
      .on('error', loadPlugins.util.log)
    .pipe(loadPlugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/js/'));

});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/style.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify,
            sourceComments: true
        }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/**/*', ['sass']);
    gulp.watch([
        '*.html',
        '_layouts/*.html',
        '_posts/*',
        '_includes/*.html',
        'startups/*.html',
        'about/*.html',
        'projects/*.html',
        '_data/*.yaml',
        'js/*.js',
        '_app/*.js'
    ], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browserify', 'browser-sync', 'watch']);
