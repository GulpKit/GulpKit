// =============================================
// SCSS Compiler - `gulp scss`
// compiles scss to css, autoprefixer, combines media queries and minifies on production
// =============================================

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

var scssTask = function(options) {
    var paths = gulpPaths(options.source, options.output);

    return new GulpKit.Task('scss', function() {
        // TODO - Deep extend defaults + options

        return gulp.src(paths.source.path)
            .pipe(clipEmptyFiles())
            .pipe(util.env.development || options.sourcemaps === true ? sourcemaps.init() : util.noop())
            .pipe(sass()) // TODO - .on('error'...
            .pipe(options.autoprefixer === true ? autoPrefixer(options.autoPrefixer) : util.noop())
            .pipe(util.env.development || options.sourcemaps === true ? sourcemaps.write() : util.noop())
            .pipe(util.env.production || options.combineMediaQueries === true ? combineMq() : util.noop())
            .pipe(util.env.production || options.minify === true ? cssNano() : util.noop())
            .pipe(concat(paths.output.name))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(options.browserSync === true ? browserSync.reload({ stream: true }) : util.noop());
    })
    .watch(paths.source.baseDir + '/**/*.+(sass|scss)')
    .ignore(paths.output.path);
};

GulpKit.extend('scss', function(options) {
    scssTask.apply(this, [options]);
});

var gulpPaths = function(source, output) {
    return new GulpKit.Paths()
        .source(source, 'scss') // TODO - Make this configurable
        .output(output || 'css', 'style.css');
};

module.exports = scssTask;