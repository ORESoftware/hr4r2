define(["require", "exports", "js/router", "@hot-reloader"], function (require, exports, router, hotReloader) {
    "use strict";
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
    return {
        start: start
    };
});
