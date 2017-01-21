/* globals console define require React async */

import router = require('js/router');
import hotReloader = require('@hot-reload-handler');


function start() {

    console.log('app started.');

    if (true) {
        hotReloader.getConnection()
            .once('connect', function () {
                console.log('we have connected now initting router...');
                router.init();
                window.location.hash = 'home';
                const event = new Event('hashchange');
                window.dispatchEvent(event);
            });
    }

}

export = {
    start: start
}

