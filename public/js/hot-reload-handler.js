define(["require", "exports", "@hot-reloader"], function (require, exports, hotReloader) {
    "use strict";
    var io = require('socket.io');
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
            var startProgressBar_1 = function startProgressBar() {
            };
            var stopProgressBar = function stopProgressBar() {
            };
            var updateProgressBar_1 = function updateProgressBar(value) {
            };
            socket.on('start-progress-bar', function (data) {
                startProgressBar_1();
                updateProgressBar_1(20);
            });
            socket.on('HOT_RELOAD_JSX', function (data) {
                console.log('data => ', data);
                updateProgressBar_1(40);
                hotReloader.hotReload(data.path, function (err, result) {
                    if (err) {
                        alert(err);
                    }
                    else {
                        updateProgressBar_1(60);
                        setTimeout(function () {
                            updateProgressBar_1(80);
                            window.dispatchEvent(new Event('hashchange'));
                            updateProgressBar_1(100);
                        }, 100);
                    }
                });
            });
            socket.on('hot-reload (.css)', function (data) {
                updateProgressBar_1(40);
                hotReloader.hotReload(data, function (err, result) {
                    if (err) {
                        alert(err);
                        return;
                    }
                    updateProgressBar_1(60);
                    var filename = String(data).replace('text!', '');
                    require(['#allCSS'], function (allCSS) {
                        allCSS[filename] = result;
                        updateProgressBar_1(80);
                        updateProgressBar_1(100);
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
