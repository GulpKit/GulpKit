var GulpKit = require('./../index');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var _ = require('underscore');
var util = require('gulp-util');

GulpKit.extend('browserSync', function(options) {
    var defaults = {
        proxy: 'local.gulpkit',
        reloadOnRestart: true,
        notify: true,
        files: [],
        watchOptions: {
            usePolling: true
        }
    };
    options = _.extend(defaults, options);

    for(var name in GulpKit.tasks) {
        options.files.push(GulpKit.tasks[name].options.output.path);
    }

    if(util.env._.indexOf('watch') > -1) {
        browserSync.init(options);
    }

    new GulpKit.Task('browserSync', function() {});
});