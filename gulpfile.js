'use strict';
const
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),

    dirStatic = './templates/static/',
    dirSrc = dirStatic + 'src/',
    dirDist = dirStatic,

    jsVendorsToCompile = ['js/vendor/*.js'],
    jsToCompile = [
        'js/lib.js',
        'js/scripts.js'
    ],
    cssVendorsToCompile = [
        'scss/vendor/bootstrap.min.css',
        'scss/vendor/animate.css',
        'scss/vendor/style.css',
        'scss/vendor/font-awesome.min.css'
    ],
    scssToCompile = ['scss/styles.scss'];

function dirConcat (value) {
    return dirSrc + value;
}

/******************************* BUILD ALL *******************************/
gulp.task('default', ['compile:js', 'compile:scss'], function () {
    console.log('build process completed');
});

gulp.task('compile:js', function () {
    let
        vendors = jsVendorsToCompile.map(dirConcat),
        toCompile = jsToCompile.map(dirConcat),
        destination = dirDist + 'js/';

    gulp.src(vendors)
        .pipe(concat('vendor.js'), {newLine: ';'})
        .pipe(uglify()).on('error', console.log)
        .pipe(gulp.dest(destination));

    gulp.src(toCompile)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('main.js'), {newLine: ';'})
        .pipe(uglify()).on('error', console.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination))
        .pipe(browserSync.stream());
});

gulp.task('compile:scss', function () {
    let
        vendors = cssVendorsToCompile.map(dirConcat),
        toCompile = scssToCompile.map(dirConcat),
        destination = dirDist + 'css/';

    gulp.src(vendors)
        .pipe(concat('vendor.css'))
        .pipe(uglifycss({"uglyComments": true}))
        .pipe(gulp.dest(destination));

    gulp.src(toCompile)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(uglifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination))
        .pipe(browserSync.stream());
});

/****************************** WATCH ******************************/
gulp.task('watch:js', ['compile:js'], function () {
    gulp.watch(dirSrc + '**/*.js', ['compile:js'], function () {
        //
    });
});

gulp.task('watch:scss', ['compile:scss'], function () {
    gulp.watch(dirSrc + 'scss/**/*.scss', ['compile:scss'], function () {
        //
    });
});

gulp.task('watch', ['watch:js', 'watch:scss']);
gulp.task('watch:sync', ['watch:js', 'watch:scss'], function () {
    let
        defaultProxyTarget = "localhost:3000",
        proxyTarget = process.argv[4] || defaultProxyTarget;

    browserSync.init({
        files: [dirDist + '*'],
        notify: false,
        proxy: {target: proxyTarget}
    });

    browserSync.reload();

    if (proxyTarget === defaultProxyTarget) {
        console.warn('Try to run watch with your --host parameter:');
        console.warn('gulp watch:sync --host 192.168.0.154:8000');
    }
});
