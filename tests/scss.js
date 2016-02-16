var GulpKit = require('../index');
var gulp = require('gulp');
var assert = require('assert');
var fs = require('fs');
var del = require('del');

describe('SCSS Task', function() {
    var fileShouldExist = function(file) {
        return assert.equal(fs.existsSync(file), true);
    }

    var runGulp = function(assertions) {
        for(var i in GulpKit.tasks) {
            GulpKit.tasks[i].stream(function() {
                assertions();
            });
        }
    };

    var reset = function(done) {
        del.sync('./build');

        done();
    };

    afterEach(reset);
    after(reset);

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

        runGulp(function() {
            fileShouldExist('./tests/build/css/app.css');

            done();
        });
    });
});