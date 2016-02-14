$(function() {

    window.terminal = {
        el: $('.terminal'),
        term: $('.terminal .term'),
        type: function(text, callback) {
            var self = this;

            if(text.indexOf('%TIME%') > -1) {
                function pad(num, size) {
                    var s = num+"";
                    while (s.length < size) s = "0" + s;
                    return s;
                }
                var time = new Date();
                var hr = pad(time.getHours(), 2);
                var min = pad(time.getMinutes(), 2);
                var sec = pad(time.getSeconds(), 2);

                text = text.replace(/%TIME%/g, hr + ':' + min + ':' + sec);
            }

            var options = {
                speed: 60,
                caret: '<span class="caret">▏</span>',
                init: function() {
                    self.el.addClass('active waiting');
                    editor.el.removeClass('active');
                },
                typing: function() {
                    self.el.removeClass('waiting');
                    self.el.find('.cmd-input').hide();
                },
                fin: function() {
                    self.el.addClass('waiting');

                    if(self.el.find('.cmd').length == 0) {
                        $("<span class='cmd-input'><br>$ <span class='cmd'></span></span>").insertBefore(self.term.find('.t-caret'));
                    }
                    self.el.find('.cmd-input').show().find('br').show();

                    if(typeof callback == 'function') {
                        callback();
                    }
                }
            };
            terminal.term.t(text, options);
        },
        clear: function() {
            $('.terminal .t-container').empty();
            $('.terminal .cmd-input br').hide();
        },
        help: function() {
            terminal.type(
                "<ins><strong>$ help<br>" +
                "<0span class='blue'>Available commands<0/span><br>" +
                "- gulp (--tasks) [task]<br>" +
                "- gulpkit<br>" +
                "- credits<br>" +
                "- many, many easter eggs" +
                "</strong></ins>"
            );
        },
        credits: function() {
            terminal.type(
                "<ins><strong>$ credits<br>" +
                "Credits for <0span class='red'>GulpKit<0/span>" +
                "<br>├── Created by Dan Bovey" +
                "<br>└── Tasks created by Jake Cobley</strong></ins>"
            );
        },
        gulpkit: function() {
            terminal.type(
                "<ins><strong>$ gulpkit<br>" +
                "GulpKit v0.0.1 ALPHA</strong></ins>"
            );
        },
        install: function() {
            terminal.type(
                "<ins><strong>$ </strong></ins>npm i gulpkit<br>" +
                "<ins><strong>███████████</strong></ins><ins>0.2</ins><ins><strong>███████████</strong></ins><ins>0.3</ins><ins><strong>█████████████████</strong></ins><ins>0.1</ins><ins><strong>██████████████████</strong></ins><ins>0.4</ins><ins><strong>████████████████</strong></ins>" +
                "<ins>0.2</ins>",
                function() {
                    if(!editor.written) {
                        editor.writeGulpfile();
                    }
                }
            );
        },
        gulp: {
            default: function(task, callback) {
                terminal.type(
                    "<ins><strong>$ gulp " + task + "<br></strong></ins>" +
                    "<ins>1</ins><ins><0strong>[<0span class='grey'>%TIME%</span>] Using gulpfile <0span class='purple'>~/GulpKit/gulpfile.js</span><0br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%<0/span>] Starting &#39;<0span class='blue'>scss<0/span>&#39;...<0br></strong></ins>" +
                    "<ins>0.3</ins><ins><0strong>[<0span class='grey'>%TIME%<0/span>] Finished &#39;<0span class='blue'>scss<0/span>&#39; after <span class='purple'>50 μs<0/span><0br><0/strong></ins>" +
                    "<ins>0.3</ins><ins><0strong>[<0span class='grey'>%TIME%<0/span>] Starting &#39;<0span class='blue'>js<0/span>&#39; ...<0br><0/strong></ins>" +
                    "<ins>0.5</ins><ins><0strong>[<0span class='grey'>%TIME%<0/span>] Finished &#39;<0span class='blue'>js<0/span>&#39; after <span class='purple'>70 μs<0/span><0/strong></ins>" +
                    "<ins>0.2</ins>",
                    function() {
                        if(typeof callback == 'function') {
                            callback();
                        }
                    }
                );
            },
            scss: function() {
                terminal.type(
                    "<ins><strong>$ gulp<br></strong></ins>" +
                    "<ins>1</ins><ins><0strong>[<0span class='grey'>%TIME%</span>] Using gulpfile <0span class='purple'>~/GulpKit/gulpfile.js</span><0br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%<0/span>] Starting &#39;<0span class='blue'>scss<0/span>&#39;...<0br></strong></ins>" +
                    "<ins>0.3</ins><ins><0strong>[<0span class='grey'>%TIME%<0/span>] Finished &#39;<0span class='blue'>scss<0/span>&#39; after <span class='purple'>50 μs<0/span><0/strong></ins>" +
                    "<ins>0.2</ins>"
                );
            },
            js: function() {

            },
            unknown: function(task) {
                terminal.type(
                    "<ins><strong>$ gulp " + task + "<br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%</span>] Using gulpfile <0span class='purple'>~/GulpKit/gulpfile.js</span><0br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%<0/span>] <0span class='red'>Task '" + task + "' is not in your gulpfile<0/span><0br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%<0/span>] Please check the documentation for proper gulpfile formatting<0/strong></ins>" +
                    "<ins>0.2</ins>"
                );
            },
            list: function() {
                terminal.type(
                    "<ins><strong>$ gulp --tasks<br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%</span>] Using gulpfile <0span class='purple'>~/GulpKit/gulpfile.js</span><0br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%</span>] Tasks for <0span class='purple'>~/GulpKit/gulpfile.js</span><0br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%</span>] ├── watch<0br></strong></ins>" +
                    "<ins><0strong>[<0span class='grey'>%TIME%</span>] └── scss</strong></ins>"
                );
            }
        }
    };

    window.editor = {
        written: false,
        el: $('.editor'),
        code: $('.editor .code'),
        type: function(text, callback) {
            var self = this;

            var options = {
                speed: 0, // 50
                delay: 0.8,
                speed_vary: true,
                caret: '<span class="caret">▏</span>',
                init: function() {
                    self.el.addClass('active waiting');
                    terminal.el.removeClass('active');
                },
                typing: function() {
                    self.el.removeClass('waiting');
                },
                fin: function() {
                    self.el.addClass('waiting');

                    if(typeof callback == 'function') {
                        callback();
                    }
                }
            };
            editor.code.t(text, options);
        },
        writeGulpfile: function() {
            this.written = true;

            this.type(
                "<span class='purple'>var</span> GulpKit = require(<span class='green'>'GulpKit'</span>);<br><br>" +
                "GulpKit(<span class='purple'>function</span>(kit) {<br>" +
                    "<span class='tab'></span>kit<span class='purple'>.</span><span class='blue'>scss</span>({<br>" +
                        "<span class='tab'></span><span class='tab'></span><span class='green'>source</span><span class='orange'>:</span> <span class='green'>'./resources/scss/app.scss'</span>,<br>" +
                        "<span class='tab'></span><span class='tab'></span><span class='green'>output</span><span class='orange'>:</span> <span class='green'>'./css/style.css'</span><br>" +
                    "<span class='tab'></span>});<br>" +
                    "<span class='tab'></span>kit<span class='purple'>.</span><span class='blue'>scss</span>({<br>" +
                        "<span class='tab'></span><span class='tab'></span><span class='green'>source</span><span class='orange'>:</span> <span class='green'>'./resources/scss/admin.scss'</span>,<br>" +
                        "<span class='tab'></span><span class='tab'></span><span class='green'>output</span><span class='orange'>:</span> <span class='green'>'./css/admin.css'</span><br>" +
                    "<span class='tab'></span>});<br>" +
                    "<span class='tab'></span>kit<span class='purple'>.</span><span class='blue'>js</span>({<br>" +
                        "<span class='tab'></span><span class='tab'></span><span class='green'>source</span><span class='orange'>:</span> <span class='green'>'./resources/js/app.js'</span>,<br>" +
                        "<span class='tab'></span><span class='tab'></span><span class='green'>output</span><span class='orange'>:</span> <span class='green'>'./js/script.js'</span><br>" +
                    "<span class='tab'></span>});<br>" +
                "});",
                function() {
                    terminal.type("<ins><strong>$ </strong></ins>gulp", function() {
                        terminal.gulp.default('', function() {
                            initFreeMode();
                        });
                    });
                }
            );
        }
    };

    var initFreeMode = function() {
        terminal.el.click(function() {
            editor.el.removeClass('active');
            terminal.el.addClass('active');
        });
        editor.el.click(function() {
            terminal.el.removeClass('active');
            editor.el.addClass('active');
        });
        $(document).keypress(function(e) {
            if(terminal.el.hasClass('active')) {
                var currentText = $('.terminal .cmd').text();

                if(e.charCode != 13) {
                    var char = String.fromCharCode(e.charCode);
                    $('.terminal .cmd').text(currentText + char);

                    e.preventDefault();
                }
            }
        });
        $(document).keydown(function(e) {
            if(terminal.el.hasClass('active')) {
                var text = $('.terminal .cmd').text().trim().toLowerCase();

                if(e.keyCode == 13) {
                    var cmd = text.split(' ')[0];
                    var others = text.replace(cmd, '').trim();

                    $('.terminal .cmd').empty();

                    if(cmd == 'clear') {
                        terminal.clear();
                    } else if(cmd == 'help') {
                        terminal.help();
                    } else if(cmd == 'credits') {
                        terminal.credits();
                    } else if(cmd == 'gulpkit') {
                        terminal.gulpkit();
                    } else if(cmd == 'gulp') {
                        if(text == 'gulp' || others == 'default') {
                            terminal.gulp.default('default');
                        } else if(others == 'scss') {
                            terminal.gulp.scss();
                        } else if(others == 'js') {
                            terminal.gulp.js();
                        } else if(others == '--tasks') {
                            terminal.gulp.list();
                        } else {
                            terminal.gulp.unknown(others);
                        }
                    } else if((cmd == 'rm' && others == '-rf') || (cmd == 'rm' && others == '-r')) {
                        $('body').empty();
                    } else {
                        $('.terminal .t-container').html('$ ' + text + '<br>' + '-bash: ' + cmd + ': command not found');
                        $('.terminal .cmd-input br').show();
                    }

                    e.preventDefault();
                    return;
                } else if(e.keyCode == 8) {
                    $('.terminal .cmd').text(text.substring(0, text.length - 1));

                    e.preventDefault();
                    return;
                }
            } 
        });
    }

    terminal.install();

});