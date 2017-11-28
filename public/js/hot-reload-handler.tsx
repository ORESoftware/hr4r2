

const io = require('socket.io');
import hotReloader = require('@hot-reloader');

////////

function replaceAll(str, target, replacement) {
    return str.split(target).join(replacement);
}


let socket = null;

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


        const startProgressBar = function startProgressBar() {
            // $("#hot-reload-progress-bar").show();
        };

        const stopProgressBar = function stopProgressBar() {
            // $("#hot-reload-progress-bar").hide();
        };

        const updateProgressBar = function updateProgressBar(value) {
            // $("#hot-reload-progress-bar").prop('value', value);
        };

        socket.on('start-progress-bar', function (data) {
            startProgressBar();
            // $("#hot-reload-progress-bar").css('background-color', '#f3f3f3');
            updateProgressBar(20);
        });


        // socket.on('HOT_RELOAD_JSX', function (data){
        //
        //     console.log('hot reload => ready', data.path);
        //
        //     updateProgressBar(40);
        //
        //     hotReloader.hotReload(data.path, function (err, result) {
        //
        //         if (err) {
        //             alert(err);
        //             return;
        //         }
        //
        //         updateProgressBar(60);
        //
        //         var filename = deCapitalizeFirstLetter(reconcilePath1(data, 'jsx'));
        //
        //         require(['#allViews'], function (allViews) {
        //             allViews[filename] = result;
        //             updateProgressBar(80);
        //             Backbone.history.loadUrl(Backbone.history.fragment);
        //             updateProgressBar(100);
        //         });
        //     });
        // });


        socket.on('HOT_RELOAD_JSX', function (data) {

            // document.getElementById('progress-bar-unactive-style').disabled = true;
            // document.getElementById('progress-bar-active-style').disabled = false;

            console.log('data => ', data);
            updateProgressBar(40);

            hotReloader.hotReload(data.path, function (err, result) {

                if (err) {
                    alert(err);
                }
                else {
                    updateProgressBar(60);
                    setTimeout(function () {
                        updateProgressBar(80);
                        // const href = String(window.location.hash).slice(1);
                        // window.location.hash = 'home';
                        window.dispatchEvent(new Event('hashchange'));
                        // Backbone.history.loadUrl(Backbone.history.fragment);
                        updateProgressBar(100);
                        // document.getElementById('progress-bar-unactive-style').disabled = false;
                        // document.getElementById('progress-bar-active-style').disabled = true;
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
                    // Backbone.history.loadUrl(Backbone.history.fragment);
                    updateProgressBar(100);
                });
            });
        });
    }

    return socket;
}


export = {
    getConnection: getConnection
};

