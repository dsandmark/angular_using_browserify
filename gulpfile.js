'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    express = require('express'),
    gulp = require('gulp'),
    karma = require('gulp-karma'),
    livereload = require('connect-livereload'),
    minifyCSS = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    refresh = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    templateCache = require('gulp-angular-templatecache'),
    sass = require('gulp-sass');

var config = {
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images'
  },
  indexHtml: {
    src: 'src/index.html',
    dest: 'dist'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  styles: {
    src: [
      'src/styles/reset.scss',
      'src/styles/main.scss'
    ],
    dest: 'dist/css',
    name: 'main'
  },
  views: {
    src: [
      'src/js/features/**/*.html'
    ],
    dest: 'src/js'
  },
  dist: {
    root: 'dist'
  },
  browserify: {
    entries: 'src/js/main.js',
    bundleName: 'bundle.js'
  },
  server: {
    livereloadport: 35729,
    serverport: 5000
  },
  test: {
    karma: 'test/karma.conf.js'
  },
  autoprefixer: {
    browsers: ['last 2 versions'],
    cascade: false
  },
  minifyCss: {
    comments: true,
    spare: true
  }
};

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: config.server.livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist' });
});
// End of server setup

gulp.task('test', ['server'], function() {
  return runSequence('unit');
});

gulp.task('unit', ['scripts'], function() {
  // Nonsensical source to fall back to files listed in karma.conf.js,
  // see https://github.com/lazd/gulp-karma/issues/9
  return gulp.src('./thisdoesntexist')
    .pipe(karma({
      configFile: config.test.karma,
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });

});

gulp.task('lint', function () {
  // Path to generated templates file to be ignored.
  var ignoreTemplatesFile = '!' + config.views.dest + '/templates.js';

  return gulp.src([config.scripts.src, ignoreTemplatesFile])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});

gulp.task('clean', function() {
  del.sync(config.dist.root);
});

gulp.task('styles', function() {
  return gulp.src(config.styles.src)
    .pipe(concat(config.styles.name))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(minifyCSS(config.minifyCss))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('js', function() {
  return gulp.src(config.scripts.src)
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('scripts', function() {
  var browserifyOpts = {
    insertGlobals: true
  };

  return gulp.src(config.browserify.entries)
    .pipe(browserify(browserifyOpts))
    .pipe(concat(config.browserify.bundleName))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('server', function() {
  // Start webserver
  server.listen(config.server.serverport);

  // Start live reload
  refresh.listen(config.server.livereloadport);

  gulp.watch(config.dist.root + '/**').on('change', refresh.changed);
});

gulp.task('views', function() {
  var templateOptions = {
    module: 'app.templates',
    standalone: true
  };

  gulp.src(config.indexHtml.src)
    .pipe(gulp.dest(config.indexHtml.dest));

  return gulp.src(config.views.src)
    .pipe(templateCache(templateOptions))
    .pipe(gulp.dest(config.views.dest));
});

// create a task that ensures the `js` task is complete before reloading browsers.
gulp.task('scripts-watch', ['scripts']);

gulp.task('watch', ['server'], function() {
  gulp.watch(config.scripts.src, ['lint', 'scripts-watch']);
  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.views.src, ['views']);
});

gulp.task('dev', ['clean'], function() {
  runSequence(['views', 'lint', 'styles', 'images', 'scripts'], 'watch');
});
