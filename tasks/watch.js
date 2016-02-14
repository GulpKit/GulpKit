var gulp = require('gulp');
var GulpKit = require('../index');
var batch = require('gulp-batch');
var _ = require('underscore');

gulp.task('watch', function() {
	var tasks = GulpKit.tasks;
	var mergedTasks = {};

	for(var name in tasks) {
		var task = tasks[name];

		if(task.name in mergedTasks) {
			return mergedTasks[task.name].watchers = _.union(mergedTasks[task.name].watchers, task.watchers);
		}

		mergedTasks[task.name] = {
			name: task.name,
            watchers: Array.isArray(task.watchers) ? task.watchers : [task.watchers]
		};
	};

	_.sortBy(mergedTasks, 'name').forEach(function(task) {
        if(task.watchers.length > 0) {
            gulp.watch(task.watchers, batch({ limit: undefined, timeout: 1000 }, function(events) {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
})