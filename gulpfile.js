'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    timestamp = Date.now(),

    dirSrc = './src/', // your source directory
    dirDist = './public/dist/', // your distribution directory with compiled files
    dirTemplate = './', // your public directory
    pathLayoutMaster = dirTemplate + 'index.html', // path to your master layout file where assets are linked

    jsToCompile = ['**/*.js'], // array of JS files which have to be compiled
    scssToCompile = ['scss/*.scss']; // array of SCSS files which have to be compiled


/******************************* BUILD ALL *******************************/
gulp.task('default', ['build-js', 'build-css', 'build-timestamp']);


/****************************** COMPILE ******************************/
gulp.task('compile-js', function () {

    var toCompile = jsToCompile.map(function (value) {
        return dirSrc + value;
    });

    console.log('JavaScripts to compile: ', toCompile);

    gulp.src(toCompile)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('main.js'), {newLine: ';'})
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirDist + 'js/'))
        .pipe(browserSync.stream());
});


gulp.task('compile-scss', function () {

    var toCompile = scssToCompile.map(function (value) {
        return dirSrc + value;
    });

    console.log('SCSS to compile: ', toCompile);

    gulp.src(toCompile)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirDist + 'css/'))
        .pipe(browserSync.stream());
});


/***************************** BUILD *****************************/
gulp.task('build-js', ['compile-js', 'build-timestamp'], function () {

    console.log('JavaScript has been built successfully');
});

gulp.task('build-css', ['compile-scss', 'build-timestamp'], function () {

    console.log('CSS has been built successfully');
});


/****************************** WATCH ******************************/
gulp.task('watch-js', function () {

    gulp.watch(dirSrc + '**/*.js', ['compile-js']);
});

gulp.task('watch-scss', function () {

    gulp.watch(dirSrc + 'scss/*.scss', ['compile-scss']);
});

gulp.task('watch', ['watch-js', 'watch-scss'], function () {

    browserSync.init({
        files: [
            dirTemplate + '*',
            dirSrc + '*'
        ],
        server: {
            baseDir: './'
        },
        notify: false
    });

    browserSync.reload();
});


/************************* VERSION TIMESTAMP *************************/
gulp.task('build-timestamp', function () {

    gulp.src(pathLayoutMaster)
    .pipe(htmlReplace({
        css: {
            src: timestamp,
            tpl: '<link rel="stylesheet" href="public/dist/css/index.css?v=%s" class="style">' // your minified css file link
        },
        js: {
            src: timestamp,
            tpl: '<script src="public/dist/js/main.js?v=%s"></script>' // your minified JS file link
        }
    }, {
        keepUnassigned: true,
        keepBlockTags: true
    }))
    .pipe(gulp.dest(dirTemplate));
});
