![GulpKit Logo](http://i.imgur.com/ruOxMof.png)

Abstraction for front-end automation.

GulpKit aims to match the simplicity of CodeKit with the power of NPM and Gulp packages. In a matter of minutes, you can get setup with a highly configurable gulpfile that compiles your front-end site(s) and watches for changes.

[![npm](https://img.shields.io/npm/dt/gulpkit.svg)](https://www.npmjs.com/package/gulpkit)
[![npm](https://img.shields.io/npm/v/gulpkit.svg)](https://www.npmjs.com/package/gulpkit)
[![npm](https://img.shields.io/npm/l/gulpkit.svg)](https://raw.githubusercontent.com/GulpKit/GulpKit/master/LICENSE)

## Install

    npm i gulpkit
    
## Creating a gulpfile

    var GulpKit = require('GulpKit');
    
    GulpKit(function(kit) {
        // tasks
    });
    
### Tasks

Currently only a prototype sass compiler task exists.

#### scss

Compile sass files, autoprefix vendor prefixes, combines media queries and concat/minify CSS.

    kit.scss({
        source: './scss/**/*',
        output: './css'
    });
    
## Extending GulpKit

If the options in config aren't enough or you need extra functionality, you can extend GulpKit and make a custom task.

    GulpKit.extend('customScss', function(options) {
        // return a gulp stream
    })
    .watch('path/to/watch')
    .ignore('path/to/ignore');
    
## Credit

* Some tasks built by [Jake Cobley](http://cobe.ly) from [JakeCobley/Kettle](https://github.com/JakeCobley/Kettle)
* * scss
