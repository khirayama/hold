/* eslint "no-console": 0, "import/no-extraneous-dependencies": 0 */

const gulp = require('gulp');
const minifyHTML = require('gulp-minify-html');
const sass = require('gulp-sass');
const please = require('gulp-pleeease');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const plumber = require('gulp-plumber');

const SRC_ROOT = 'client/src';
const DIST_ROOT = 'public';

const options = {
  styles: {
    sass: {
      errLogToConsole: true,
      indentedSyntax: true,
    },
    please: {
      minifier: false,
      autoprefixer: {
        browsers: [
          'last 4 version',
          'ie 8',
          'iOS 4',
          'Android 2.3',
        ],
      },
    },
  },
  scripts: {
    browserify: {
      entries: [`${SRC_ROOT}/index.js`],
      transform: ['babelify'],
      extensions: ['.jsx', '.js'],
    },
    watchify: {
      entries: [`${SRC_ROOT}/index.js`],
      transform: ['babelify'],
      debug: true,
      extensions: ['.jsx', '.js'],
      cache: {},
      packageCache: {},
      plugin: [watchify],
    },
  },
};

function buildMarkups(isWatch) {
  function build() {
    console.log('build: markups');
    return gulp.src([`${SRC_ROOT}/static/**/*.html`])
      .pipe(plumber())
      .pipe(minifyHTML({empty: true}))
      .pipe(gulp.dest(DIST_ROOT));
  }

  if (isWatch) {
    return () => {
      build();
      gulp.watch([`${SRC_ROOT}/**/*.html`], build);
    };
  }
  return () => {
    build();
  };
}

function buildStyles(isWatch) {
  function build() {
    console.log('build: styles');
    return gulp.src(`${SRC_ROOT}/styles/**/index.sass`)
      .pipe(plumber())
      .pipe(sass(options.styles.sass))
      .pipe(please(options.styles.please))
      .pipe(gulp.dest(DIST_ROOT));
  }

  if (isWatch) {
    return () => {
      build();
      gulp.watch(`${SRC_ROOT}/styles/**/*.sass`, build);
    };
  }
  return () => {
    build();
  };
}

function buildScripts(isWatch) {
  const options_ = (isWatch) ? options.scripts.watchify : options.scripts.browserify;
  const bundler = browserify(options_);

  function build() {
    return () => {
      console.log('build: scripts');
      bundler.bundle().on('error', error => {
        console.error(error.message);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(DIST_ROOT));
    };
  }

  bundler.on('update', build());
  return build();
}

function buildImages() {
  return gulp.src([`${SRC_ROOT}/static/**/*.{png,jpg,gif}`])
    .pipe(plumber())
    .pipe(gulp.dest(DIST_ROOT));
}

function buildFiles() {
  return gulp.src([`${SRC_ROOT}/static/**/*.{csv,json,ico,txt,woff2}`])
    .pipe(gulp.dest(DIST_ROOT));
}

// tasks
gulp.task('build:markups', buildMarkups(false));
gulp.task('watch:markups', buildMarkups(true));
gulp.task('build:styles', buildStyles(false));
gulp.task('watch:styles', buildStyles(true));
gulp.task('build:scripts', buildScripts(false));
gulp.task('watch:scripts', buildScripts(true));
gulp.task('build:images', buildImages);
gulp.task('build:files', buildFiles);
gulp.task('build', ['build:markups', 'build:styles', 'build:scripts', 'build:images', 'build:files']);
gulp.task('watch', ['watch:markups', 'watch:styles', 'watch:scripts', 'build:images', 'build:files']);
gulp.task('develop', ['watch']);
