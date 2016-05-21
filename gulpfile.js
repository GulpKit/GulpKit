var GulpKit = require('GulpKit');

GulpKit(function(kit) {
    kit.scss({
        source: './scss/app.scss',
        output: './css/style.css'
    });
});