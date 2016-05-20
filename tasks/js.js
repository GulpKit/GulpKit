/**
 * JS Compiler - `gulp js`
 * Combines JS files, runs jshint and minifies on production
 **/

var GulpKit = require('../index');
var gulp = require('gulp');
var util = require('gulp-util');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpFn = require('gulp-fn');
var browserSync = require('browser-sync');

var jsTask = function(options) {
    var defaults = {
        source: 'js/main.js',
        output: 'build/script.js',
        sourcemaps: !util.env.production,
        browserSync: {
            stream: true
        }
    };
    options = GulpKit.Options.extend(options, defaults, 'js');

    return new GulpKit.Task('js', options, function(callback) {

        var stream = gulp.src(options.source.path)
            .pipe((!util.env.production || options.sourcemaps === true) && options.sourcemaps != false ? sourcemaps.init() : util.noop())
            .pipe(concat(options.output.name))
            .pipe((!util.env.production || options.jshint === true) && options.jshint != false ? jshint() : util.noop())
            .pipe((!util.env.production || options.jshint === true) && options.jshint != false ? jshint.reporter('default') : util.noop())
            .pipe(uglify())
            .pipe((!util.env.production || options.sourcemaps === true) && options.sourcemaps != false ? sourcemaps.write() : util.noop())
            .pipe(gulp.dest(options.output.baseDir))
            .pipe((!util.env.production && options.browserSync === true)  && options.browserSync != false ? browserSync.reload(options.browserSync) : util.noop())
            .pipe(gulpFn(done));

        function done() {
            if(typeof callback == 'function') {
                callback();
            }
        }

        return stream;

    })
    .watch(options.source.baseDir + '/**/*.js')
    .ignore(options.output.path);
};

GulpKit.extend('js', function(options) {
    jsTask.apply(this, [options]);
});

GulpKit.extend('jsDir', function(options) {
    if(options.source.substr(-1) != '/') {
        options.source += '/';
    }
    options.source += '**/*.js';

    jsTask.apply(this, [options]);
});

module.exports = jsTask;
