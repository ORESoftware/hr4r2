/* globals console define require React Error async */


import io = require('socketio');
import hotReloader = require( '@hot-reloader');
import hotReloader = require( 'js/css-adder');
import Backbone = require('backbone');
import $ = require('jquery');


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


let socketHotReload = null;

function getConnection() {

    if (socketHotReload == null) {
        console.log('document.cookie before socketio:', document.cookie);


        socketHotReload = io.connect('http://127.0.0.1:3980');


        socketHotReload.on('error', function socketConnectionErrorCallback(err) {
            console.error('Unable to connect Socket.IO ---->', JSON.stringify(err));
        });


        socketHotReload.on('connect', function (event) {
            console.info('successfully established a working and authorized connection'.toUpperCase());
        });


        socketHotReload.on('disconnect', function (event) {
            console.info('socket disconnected'.toUpperCase());
        });

        socketHotReload.on('.jsx transform error', function (data) {
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

        socketHotReload.on('start-progress-bar', function (data) {
            startProgressBar();
            $("#hot-reload-progress-bar").css('background-color', '#f3f3f3');
            updateProgressBar(20);
        });


        socketHotReload.on('HOT_RELOAD_JSX', function (data){

            console.log('hot reload => ready');

            updateProgressBar(40);

            hotReloader.hotReload(data, function (err, result) {

                if (err) {
                    alert(err);
                    return;
                }

                updateProgressBar(60);

                var filename = deCapitalizeFirstLetter(reconcilePath1(data, 'jsx'));

                require(['#allViews'], function (allViews) {
                    allViews[filename] = result;
                    updateProgressBar(80);
                    Backbone.history.loadUrl(Backbone.history.fragment);
                    updateProgressBar(100);
                });
            });
        });


        socketHotReload.on('hot-reload (.css)', function (data) {

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

    return socketHotReload;
}



export = {
    getConnection: getConnection
};

