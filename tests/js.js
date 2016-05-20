var GulpKit = require('../index');
var gulp = require('gulp');
var assert = require('assert');
var fs = require('fs');
var del = require('del');
var bluebird = require('bluebird');

describe('JS Task', function() {
    this.slow(5000);
    this.timeout(0);

    var fileShouldExist = function(file) {
        return new Promise(function(resolve) {
            fs.access(file, function(err) {
                resolve(assert.equal(err, null));
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
        GulpKit.tasks = [];
        del('./tests/build/js').then(function() {
            done();
        });
    });

    after(function(done) {
        del('./tests/build').then(function() {
            done();
        });
    });

    it('should compile a js file to minified build', function(done) {
        GulpKit(function(kit) {
            kit.js({
                source: './tests/resources/js/main.js',
                output: './tests/build/js/script.js'
            });
        });

        runGulp(function() {
            fileShouldExist('./tests/build/js/script.js')
                .then(function() {
                    done();
                });
        });
    });

    it('should combine multiple js files into one minifed build', function(done) {
        GulpKit(function(kit) {
            kit.jsDir({
                source: './tests/resources/js/vendor',
                output: './tests/build/js/vendor.js',
                jshint: false
            });
        });

        runGulp(function() {
            fileShouldExist('./tests/build/js/vendor.js')
                .then(function() {
                    done();
                });
        });
    });
});
