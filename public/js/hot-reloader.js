define(["require", "exports"], function (require, exports) {
    "use strict";
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
