/* globals console define require React async */
define(["require", "exports", "js/router", "@hot-reload-handler"], function (require, exports, router, hotReloader) {
    "use strict";
    function start() {
        console.log('app started.');
        if (true) {
            hotReloader.getConnection()
                .once('connect', function () {
                console.log('we have connected now initting router...');
                router.init();
                window.location.hash = 'home';
            });
        }
    }
    return {
        start: start
    };
});
