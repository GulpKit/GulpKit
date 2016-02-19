/**
 * SCSS Compiler - `gulp scss`
 * Compiles scss to css, autoprefixer, combines media queries and minifies on production
 **/

var GulpKit = require('../index');
var gulp = require('gulp');
var util = require('gulp-util');
var clipEmptyFiles = require('gulp-clip-empty-files');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var combineMq = require('gulp-combine-mq');
var cssNano = require('gulp-cssnano');
var concat = require('gulp-concat');
var gulpFn = require('gulp-fn');
var browserSync = require('browser-sync');

var scssTask = function(options) {
    var defaults = {
        source: 'scss/app.scss',
        output: 'css/style.css',
        sourcemaps: !util.env.production,
        autoprefixer: true,
        combineMediaQueries: true,
        browserSync: {
            stream: true
        }
    };
    options = GulpKit.Options.extend(options, defaults, 'css');

    return new GulpKit.Task('scss', options, function(callback) {

        var stream = gulp.src(options.source.path)
            .pipe(clipEmptyFiles())
            .pipe(!util.env.production || options.sourcemaps === true ? sourcemaps.init() : util.noop())
            .pipe(sass()) // TODO - .on('error'...
            .pipe(options.autoprefixer === true ? autoPrefixer(options.autoPrefixer) : util.noop())
            .pipe(!util.env.production || options.sourcemaps === true ? sourcemaps.write() : util.noop())
            .pipe(util.env.production || options.combineMediaQueries === true ? combineMq() : util.noop())
            .pipe(util.env.production || options.minify === true ? cssNano() : util.noop())
            .pipe(concat(options.output.name))
            .pipe(gulp.dest(options.output.baseDir))
            .pipe(gulpFn(done));

        function done() {
            if(typeof callback == 'function') {
                callback();
            }
        }

        return stream;

    })
    .watch(options.source.baseDir + '/**/*.+(sass|scss)')
    .ignore(options.output.path);
};

GulpKit.extend('scss', function(options) {
    scssTask.apply(this, [options]);
});

module.exports = scssTask;