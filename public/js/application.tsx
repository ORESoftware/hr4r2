

import router = require('js/router');
import hotReloader = require('@hot-reload-handler');
import config = require('@config');


function load() {
    router.init();
    window.location.hash = 'home';
    window.dispatchEvent(new Event('hashchange'));
}

function start() {

    console.log(' => app started, config => ', config);

    if (config.env === 'development') {
        console.log('env is development, now attempting to connecto dev server...');
        hotReloader.getConnection()
            .once('connect', function () {
                console.log(' => We have connected to dev-server, now initting router...');
                load();
            });
    }
    else{
        load();
    }

}

export = {
    start: start
}

