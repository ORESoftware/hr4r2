/* globals console define require React async */
define(["require", "exports"], function (require, exports) {
    "use strict";
    //http://devble.com/create-cookies-in-javascript-read-values/
    //TODO: http://geeks.bizzabo.com/post/83917692143/7-battle-tested-backbonejs-rules-for-amazing-web-apps
    //TODO: https://www.compose.io/articles/the-mongodb-oplog-and-node-js/
    //TODO: http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/
    var globalRequire = window.require;
    var hotReloadSimple = function (item, cb) {
        globalRequire.undef(item);
        globalRequire([item], function (file) {
            cb(null, file);
        });
    };
    return {
        hotReload: hotReloadSimple
    };
});
