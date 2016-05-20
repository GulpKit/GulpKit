var GulpKit = require('../index');
var gulp = require('gulp');
var assert = require('assert');
var fs = require('fs');
var del = require('del');
var bluebird = require('bluebird');

describe('SCSS Task', function() {
    this.slow(3000);
    this.timeout(0);

    var fileShouldExist = function(file) {
        return new Promise(function(resolve) {
            fs.access(file, fs.R_OK, function(err) {
                assert.equal(err, null);
                resolve();
            });
        });
    };

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

    beforeEach(function(done) {
        del('./tests/build/css').then(function() {
            done();
        });
    });

    after(function(done) {
        del('./tests/build').then(function() {
            done();
        });
    });

    it('should compile a sass file to css', function(done) {
        GulpKit(function(kit) {
            kit.scss({
                source: './tests/resources/scss/app.scss',
                output: './tests/build/css/app.css'
            });
        });

        runGulp(function() {      
            fileShouldExist('./tests/build/css/app.css')
                .then(function() {
                    done();
                });
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
                output: './tests/build/css/admin.css'
            });
        });

        runGulp(function() {
            fileShouldExist('./tests/build/css/style.css')
                .then(function() {
                    return fileShouldExist('./tests/build/css/admin.css');
                })
                .then(function() {
                    done();
                });
        });
    });
});