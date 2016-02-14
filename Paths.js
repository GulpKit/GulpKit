var p = require('path');
var parsePath = require('parse-filepath');
var util = require('gulp-util');

var Paths = function() {};

Paths.prototype.source = function(source, prefix) {
    var self = this;

    source = this.prefix(source, prefix);

    if(Array.isArray(source)) {
        // If any sources are folders, fetch all the files
        source.map(function(path) {
            if(self.parse(path).isDir) {
                path += '/**/*';
            }

            return path;
        });

        this.source = {
            path: source,
            baseDir: prefix
        };
    } else {
        this.source = this.parse(source);

        // If the source is a folder, fetch all the files
        if(this.source.isDir) {
            this.source += '/**/*';
        }
    }

    return this;
};

Paths.prototype.output = function(output, defaultName) {
    this.output = this.parse(output);

    // If the user didn't provide a file name, use the tasks default name
    if(!this.output.name && defaultName) {
        // If the path is not an array, we can use that and change the extension
        if(!Array.isArray(this.source.path) && this.source.name.indexOf('*') == -1) {
            defaultName = util.replaceExtension(this.source.name, this.parse(defaultName).extension);
        }

        this.output = this.parse(p.join(output, defaultName));
    }

    return this;
};

Paths.prototype.prefix = function(path, prefix) {
    if(!prefix) {
        return path;
    }

    var addPrefix = function(path) {
        // If the user has provided a path that starts with a period, it starts at the root (without a prefix)
        if(path.indexOf('./') == 0) {
            return path;
        }

        // If the path starts with "!" we need to negate it
        if(path.indexOf('!') == 0) {
            path = '!' + p.join(prefix, path.substring(1));
        } else {
            path = p.join(prefix, path);
        }

        // Return the path with any duplications (e.g. "//") removed
        return path.replace(/\/\//g, '/')
            .replace(/\/\//g, '/')
            .replace(p.join(prefix, prefix), prefix);
    };

    if(Array.isArray(path)) {
        return path.map(addPrefix);
    }

    return addPrefix(path);
};

Paths.prototype.parse = function(path) {
    var segments = parsePath(path);

    return {
        path: path,
        name: segments.extname ? segments.basename : '',
        extension: segments.extname,
        isDirectory: !(!!segments.extname),
        baseDir: segments.extname ? segments.dirname: p.join(segments.dirname, segments.basename)
    };
};

module.exports = Paths;