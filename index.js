var gulp = require('gulp');
var util = require('gulp-util');
var _ = require('underscore');

var GulpKit = function(methods) {
    require('require-dir')('./tasks');

    methods(GulpKit.methods);

    for(var name in GulpKit.methods) {
        if(!_.where(GulpKit.tasks, { name: name }).length) continue;

        if(util.env._.length && util.env._[0] != name) continue;

        var tasks = _.where(GulpKit.tasks, { name: name });
        gulp.task(name, function() {
            tasks.forEach(function(task) {
                task.run();
            });
        });
    }
};

GulpKit.tasks = [];
GulpKit.methods = {};
GulpKit.Task = require('./Task')(GulpKit);
GulpKit.Paths = require('./Paths');
GulpKit.Options = require('./Options');
GulpKit.gulp = require('gulp');
GulpKit.util = require('gulp-util');

GulpKit.extend = function(name, task) {
    GulpKit.methods[name] = function() {
        task.apply(this, arguments);

        return this.methods;
    };
};

module.exports = GulpKit;