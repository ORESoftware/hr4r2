define(["require", "exports", "socketio", "@hot-reloader", "backbone", "jquery"], function (require, exports, io, hotReloader, Backbone, $) {
    "use strict";
    function replaceAll(str, target, replacement) {
        return str.split(target).join(replacement);
    }
    function reconcilePath($filepath, fold1, fold2) {
        var filepath = replaceAll($filepath, '\\', '/');
        var folderz = String(filepath).split('/');
        var folds = [];
        var add = false;
        var prev = null;
        folderz.forEach(function (folder, index) {
            if (add === true) {
                folds.push(folder);
            }
            if (prev === fold1 && (folder === fold2 || !fold2)) {
                add = true;
            }
            prev = folder;
        });
        return folds.join('/');
    }
    function reconcilePath1($filepath, fold1) {
        var filepath = replaceAll($filepath, '\\', '/');
        var folderz = String(filepath).split('/');
        var folds = [];
        var add = false;
        folderz.forEach(function (folder, index) {
            if (add === true) {
                folds.push(folder);
            }
            if (folder === fold1) {
                add = true;
            }
        });
        return folds.join('/');
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function deCapitalizeFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
    var socket = null;
    function getConnection() {
        if (socket == null) {
            console.log('document.cookie before socketio:', document.cookie);
            socket = io.connect('http://127.0.0.1:3980');
            socket.on('error', function socketConnectionErrorCallback(err) {
                console.error('Unable to connect Socket.IO ---->', JSON.stringify(err));
            });
            socket.on('connect', function (event) {
                console.info('successfully established a working and authorized connection'.toUpperCase());
            });
            socket.on('disconnect', function (event) {
                console.info('socket disconnected'.toUpperCase());
            });
            socket.on('.jsx transform error', function (data) {
                window.throwGlobalError(new Error(data));
            });
            function startProgressBar() {
                $("#hot-reload-progress-bar").show();
            }
            function stopProgressBar() {
                $("#hot-reload-progress-bar").hide();
            }
            function updateProgressBar(value) {
                $("#hot-reload-progress-bar").prop('value', value);
            }
            socket.on('start-progress-bar', function (data) {
                startProgressBar();
                $("#hot-reload-progress-bar").css('background-color', '#f3f3f3');
                updateProgressBar(20);
            });
            socket.on('HOT_RELOAD_JSX', function (data) {
                updateProgressBar(40);
                hotReloader.hotReload(data.path, function (err, result) {
                    if (err) {
                        alert(err);
                    }
                    else {
                        updateProgressBar(60);
                        setTimeout(function () {
                            updateProgressBar(80);
                            console.log('about to reload backbone history loadurl');
                            Backbone.history.loadUrl(Backbone.history.fragment);
                            updateProgressBar(100);
                        }, 100);
                    }
                });
            });
            socket.on('hot-reload (.css)', function (data) {
                updateProgressBar(40);
                hotReloader.hotReload(data, function (err, result) {
                    if (err) {
                        alert(err);
                        return;
                    }
                    updateProgressBar(60);
                    var filename = String(data).replace('text!', '');
                    require(['#allCSS'], function (allCSS) {
                        allCSS[filename] = result;
                        updateProgressBar(80);
                        Backbone.history.loadUrl(Backbone.history.fragment);
                        updateProgressBar(100);
                    });
                });
            });
        }
        return socket;
    }
    return {
        getConnection: getConnection
    };
});
