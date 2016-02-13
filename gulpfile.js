var GulpKit = require('GulpKit');

GulpKit(function(kit) {
    kit.scss({
        source: './scss/app.scss',
        output: './css/style.css'
    });

    // kit.js({
    //     source: './resources/js/app.js',
    //     output: './js/script.js'
    // });
});