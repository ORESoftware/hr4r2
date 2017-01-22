define(["require", "exports", "js/router", "@hot-reload-handler", "@config"], function (require, exports, router, hotReloader, config) {
    "use strict";
    function load() {
        router.init();
        window.location.hash = 'home';
        window.dispatchEvent(new Event('hashchange'));
    }
    function start() {
        console.log(' => app started, config => ', config);
        if (config.env === 'dev') {
            hotReloader.getConnection()
                .once('connect', function () {
                console.log(' => We have connected to dev-server, now initting router...');
                load();
            });
        }
        else {
            load();
        }
    }
    return {
        start: start
    };
});
