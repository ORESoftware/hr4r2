define(["require", "exports"], function (require, exports) {
    "use strict";
    var hotReloadSimple = function (item, cb) {
        require.undef(item);
        require([item], function (file) {
            cb(null, file);
        });
    };
    return {
        hotReload: hotReloadSimple
    };
});
