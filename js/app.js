$(function() {

    var install = "<ins><strong>user$ </strong></ins>npm i gulpkit<br>" +
        "<ins><strong>███████████</strong></ins><ins>0.2</ins><ins><strong>███████████</strong></ins><ins>0.3</ins><ins><strong>█████████████████</strong></ins><ins>0.1</ins><ins><strong>██████████████████</strong></ins><ins>0.4</ins><ins><strong>████████████████</strong></ins>" +
        "<ins>0.2</ins><br><ins><strong>user$ </strong></ins>";

    var gulpfile = "<span class='purple'>var</span> GulpKit = require(<span class='green'>'GulpKit'</span>);<br><br>" +
        "GulpKit(<span class='purple'>function</span>(kit) {<br>" +
            "<span class='tab'></span>kit<span class='purple'>.</span><span class='blue'>scss</span>({<br>" +
                "<span class='tab'></span><span class='tab'></span><span class='green'>source</span><span class='orange'>:</span> <span class='green'>'./resources/scss/app.scss'</span>,<br>" +
                "<span class='tab'></span><span class='tab'></span><span class='green'>output</span><span class='orange'>:</span> <span class='green'>'./css/style.css'</span><br>" +
            "<span class='tab'></span>});<br>" +
            "<span class='tab'></span>kit<span class='purple'>.</span><span class='blue'>scss</span>({<br>" +
                "<span class='tab'></span><span class='tab'></span><span class='green'>source</span><span class='orange'>:</span> <span class='green'>'./resources/scss/admin.js'</span>,<br>" +
                "<span class='tab'></span><span class='tab'></span><span class='green'>output</span><span class='orange'>:</span> <span class='green'>'./css/admin.css'</span><br>" +
            "<span class='tab'></span>});<br>" +
            "<span class='tab'></span>kit<span class='purple'>.</span><span class='blue'>js</span>({<br>" +
                "<span class='tab'></span><span class='tab'></span><span class='green'>source</span><span class='orange'>:</span> <span class='green'>'./resources/js/app.js'</span>,<br>" +
                "<span class='tab'></span><span class='tab'></span><span class='green'>output</span><span class='orange'>:</span> <span class='green'>'./js/script.js'</span><br>" +
            "<span class='tab'></span>});<br>" +
        "});";

    var time = new Date();
    var hr = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();

    var run = "<ins><strong>user$ </strong></ins>gulp<br>" +
        "<ins>1</ins><ins><0strong>[<0span class='grey'>" + hr + ":" + min + ":" + sec + "</span>] Using gulpfile <0span class='purple'>~/GulpKit/gulpfile.js</span><0br></strong></ins>" +
        
        "<ins><0strong>[<0span class='grey'>" + hr + ":" + min + ":" + sec + "<0/span>] Starting &#39;<0span class='blue'>scss<0/span>&#39;...<0br></strong></ins>" +

        "<ins>0.3</ins><ins><0strong>[<0span class='grey'>" + hr + ":" + min + ":" + sec + "<0/span>] Finished &#39;<0span class='blue'>scss<0/span>&#39; after <span class='purple'>50 μs<0/span><0br><0/strong></ins>" +
        
        "<ins>0.3</ins><ins><0strong>[<0span class='grey'>" + hr + ":" + min + ":" + sec + "<0/span>] Starting &#39;<0span class='blue'>js<0/span>&#39; ...<0br><0/strong></ins>" +

        "<ins>0.5</ins><ins><0strong>[<0span class='grey'>" + hr + ":" + min + ":" + sec + "<0/span>] Finished &#39;<0span class='blue'>js<0/span>&#39; after <span class='purple'>70 μs<0/span><0br><0/strong></ins>" +

        "<ins>0.2</ins><ins><strong>user$ </strong></ins>";

    $('.terminal .term').t(install, {
        speed: 60,
        caret: '<span class="caret">▏</span>',
        init: function() {
            $('.terminal').addClass('active').removeClass('waiting');
        },
        fin: function() {
            $('.terminal').addClass('waiting');

            setTimeout(function() {
                $('.terminal').removeClass('active');
                $('.editor').addClass('active waiting');

                $('.editor .code').t(gulpfile, {
                    speed: 50,
                    delay: 0.8,
                    speed_vary: true,
                    caret: '<span class="caret">▏</span>',
                    typing: function() {
                        $('.editor').addClass('active').removeClass('waiting');
                    },
                    fin: function() {
                        $('.editor').removeClass('active');
                        $('.terminal .term').empty();
                        window.setTimeout(function() {
                            $('.terminal').addClass('active');

                            $('.terminal .term').t(run, {
                                speed: 35,
                                speed_vary: true,
                                caret: '<span class="caret">▏</span>',
                                fin: function() {
                                    $('.terminal').addClass('waiting');
                                    window.setTimeout(function() {
                                        $('.terminal').removeClass('active');
                                        $('.editor').addClass('active waiting');
                                    }, 2000);
                                }
                            });
                        }, 700);
                    }
                });
            }, 700);
        }
    });

});