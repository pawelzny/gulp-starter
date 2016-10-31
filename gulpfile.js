'use strict';
const
    browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    change = require('gulp-change'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),

    // Directories for static files
    dirSrc = './src/',
    dirStatic = dirSrc + 'static/',
    dirDist = './public/wp-content/themes/custom/static/', // replace `custom` with currently used theme

    // Static files resources
    jsVendorsToCompile = ['js/vendor/*.js'],
    jsToCompile = ['js/*.js'],
    cssVendorsToCompile = ['scss/vendor/*.css'],
    scssToCompile = ['scss/styles.scss'];

function dirConcat (value) { return dirStatic + value; }

/****************************** COMPILING TASKS ******************************/

gulp.task('default', ['compile:js', 'compile:scss', 'timestamp'], function () {
    console.log('build process completed');
});

gulp.task('compile:js', function () {
    let
        vendors = jsVendorsToCompile.map(dirConcat),
        toCompile = jsToCompile.map(dirConcat),
        destination = dirDist + 'js/';

    gulp.src(vendors)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('vendor.js'), { newLine: ';' })
        .pipe(uglify()).on('error', console.error)
        .pipe(gulp.dest(destination))
        .pipe(notify({
            onLast: true,
            message: "Vendor JavaScripts Compiled!"
        }))
        .on("error", console.error);

    gulp.src(toCompile)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'), { newLine: ';' })
        .pipe(uglify()).on('error', console.error)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination))
        .pipe(browserSync.stream())
        .pipe(notify({
            onLast: true,
            message: "Native JavaScripts Compiled!"
        }))
        .on("error", console.error);
});

gulp.task('compile:scss', function () {
    let
        vendors = cssVendorsToCompile.map(dirConcat),
        toCompile = scssToCompile.map(dirConcat),
        destination = dirDist + 'css/';

    gulp.src(vendors)
        .pipe(concat('vendor.css'))
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(gulp.dest(destination))
        .pipe(notify({
            onLast: true,
            message: "Vendor CSS Concatenated!"
        }))
        .on("error", console.error);

    gulp.src(toCompile)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', console.error))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(uglifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination))
        .pipe(browserSync.stream())
        .pipe(notify({
            onLast: true,
            message: "Native SCSS Compiled!"
        }))
        .on("error", console.error);
});

gulp.task('timestamp', function () {
    var replacement = 'const BUILT_TIMESTAMP = ' + Date.now() + ';',
        regex = /(.*)BUILT_TIMESTAMP(.*)/;

    gulp.src(dirSrc + 'envs.php')
        .pipe(change(function (content) {
            return content.replace(regex, replacement);
        }))
        .pipe(gulp.dest(dirSrc));
});

/******************************** WATCH TASKS ********************************/
gulp.task('watch:js', ['compile:js'], function () {
    notify("Watching JavaScript for changes").write('');
    gulp.watch(dirSrc + '**/*.js', ['compile:js']);
});

gulp.task('watch:scss', ['compile:scss'], function () {
    notify("Watching SCSS for changes").write('');
    gulp.watch(dirSrc + 'scss/**/*.scss', ['compile:scss']);
});

gulp.task('watch', ['watch:js', 'watch:scss']);
gulp.task('watch:sync', ['watch:js', 'watch:scss'], function () {
    let
        defaultProxyTarget = "localhost:3000",
        proxyTarget = process.argv[4] || defaultProxyTarget;

    notify("Watching SCSS for changes").write('');

    browserSync.init({
        files: [dirDist + '**/*'],
        notify: false,
        proxy: { target: proxyTarget }
    });

    browserSync.reload();

    if (proxyTarget === defaultProxyTarget) {
        console.warn('Try to run watch with your --host parameter:');
        console.warn('gulp watch:sync --host 192.168.0.154:8000');
    }
});
