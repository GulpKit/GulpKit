var GulpKit = require('../index');
var gulp = require('gulp');
var assert = require('assert');
var fs = require('fs');
var del = require('del');
require('mocha');

describe('SCSS Task', function() {
    it('should compile a sass file to css', function(done) {
        var fileShouldExist = function(file) {
            return assert.equal(fs.existsSync(file), true);
        }

        var runGulp = function(assertions) {
            gulp.start('scss', function() {
                assertions();

                del.sync('./build');
            });
        };

        // Compile scss files to the tests/build/css directory
        GulpKit(function(kit) {
            kit.scss({
                source: './resources/scss/app.scss',
                output: './build/css'
            });
        });

        runGulp(function() {
            fileShouldExist('./build/css/app.css');

            done();
        });
    });
});