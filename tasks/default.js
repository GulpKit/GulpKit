var GulpKit = require('../index');
var gulp = require('gulp');

gulp.task('default', function() {
    GulpKit.tasks.forEach(function(task) {
        task.run();
    });
})