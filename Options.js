var Paths = require('./Paths');
var _ = require('underscore');

var Options = {};

Options.extend = function(options, defaults, defaultExtension) {
    var options = _.extend(defaults, options);

    var paths = new Paths()
        .source(options.source, defaults.source)
        .output(options.output || defaults.output, defaultExtension);

    var options = _.extend(options, paths);

    return options;
};

module.exports = Options;