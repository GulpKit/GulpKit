var GulpKit = require('../index');
var gulp = require('gulp');
var assert = require('assert');
var fs = require('fs');
var del = require('del');

describe('SCSS Task', function() {
    this.slow(2000);

    var fileShouldExist = function(file) {
        return assert.equal(fs.existsSync(file), true);
    }

    var runGulp = function(assertions) {
        for(var i in GulpKit.tasks) {
            var complete = false;
            GulpKit.tasks[i].stream(function() {
                if(!complete) {
                    complete = true;
                    assertions();
                }
            });
        }
    };

    var reset = function(done) {
        del.sync('./tests/build');

        done();
    };

    beforeEach(reset);
    after(reset);

    it('should compile a sass file to css', function(done) {
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

    it('should compile multiple sass files to two different locations', function(done) {
        GulpKit(function(kit) {
            kit.scss({
                source: './tests/resources/scss/app.scss',
                output: './tests/build/css/style.css'
            });

            kit.scss({
                source: './tests/resources/scss/admin.scss',
                output: './tests/build/admin/css'
            });
        });

        runGulp(function() {
            fileShouldExist('./tests/build/css/style.css');
            fileShouldExist('./tests/build/admin/css/admin.css');

            done();
        });
    });
});