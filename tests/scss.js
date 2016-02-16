var GulpKit = require('../index');
var gulp = require('gulp');
var assert = require('assert');
var fs = require('fs');
var del = require('del');

describe('SCSS Task', function() {
    this.timeout(10000);

    var fileShouldExist = function(file) {
        return assert.equal(fs.existsSync(file), true);
    }

    afterEach(function(done) {
        del.sync('./build');

        done();
    });

    it('should compile a sass file to css', function(done) {
        /**
         * Compile scss files to the tests/build/css directory
         **/
        GulpKit(function(kit) {
            kit.scss({
                source: './tests/resources/scss/app.scss',
                output: './tests/build/css/'
            });
        });

        GulpKit.gulp.start('scss', function() {
            /**
             * Gulp doesn't look at the result of the task, so until we have
             * a callback/promise library on `GulpKit.Task` this is what we're
             * left with.
             **/
            setTimeout(function() {
                fileShouldExist('./tests/build/css/app.css');

                done();
            }, 200);
        });
    });
});