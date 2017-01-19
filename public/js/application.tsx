/* globals console define require React async */

import router = require('js/router');
import hotReloader = require('@hot-reloader');


function start() {

    console.log('app started.');

    if (true) {
        hotReloader.getConnection()
            .once('connected', function () {
                router.init();
                window.location.hash = 'home';
            });
    }

}

export = {
    start: start
}

