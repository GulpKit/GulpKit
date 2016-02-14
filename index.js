var gulp = require('gulp');
var util = require('gulp-util');
var _ = require('underscore');

var GulpKit = function(methods) {
    require('require-dir')('./tasks');

    methods(GulpKit.methods);

    for(var name in GulpKit.methods) {
        if(_.contains(gulp.methods, name)) return;

        gulp.task(name, function() {
            if(_.intersection(util.env._, [name, 'watch']).length) {
                return _.where(GulpKit.tasks, { name: name })
                    .forEach(function(task) {
                        return task.run();
                    });
            }

            return _.where(GulpKit.tasks, { name: name })[0].run();
        });
    }
};

GulpKit.tasks = [];
GulpKit.methods = {};
GulpKit.Task = require('./Task')(GulpKit);
GulpKit.Paths = require('./Paths');
GulpKit.gulp = require('gulp');
GulpKit.util = require('gulp-util');

GulpKit.extend = function(name, task) {
    GulpKit.methods[name] = function() {
        task.apply(this, arguments);

        return this.methods;
    };
};

module.exports = GulpKit;