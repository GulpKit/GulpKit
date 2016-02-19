var _ = require('underscore');
var kit;

var Task = function(name, options, stream) {
	this.name = name;
    this.options = options;
	this.stream = stream;
	this.watchers = [];

	this.register();
};

Task.prototype.run = function() {
	return this.stream();
};

Task.prototype.register = function() {
	kit.tasks.push(this);

	return this;
};

Task.prototype.watch = function(regex) {
    this.watchers.push(regex);

    return this;
};

Task.prototype.ignore = function(path) {
    this.watchers.push(('!./' + path).replace('././', './'));

    return this;
};

module.exports = function(GulpKit) {
	kit = GulpKit;

	return Task;
};