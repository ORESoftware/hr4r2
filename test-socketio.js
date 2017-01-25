!function (root, factory) {

    if ('function' === typeof define && define.amd) {
        define('mymodule', [], function () {
            return (root.mymodule = factory())
        });
    }

    else if ('object' === typeof module && module.exports) {
        module.exports = factory();
    }

    else {
        root.mymodule = factory();
    }


}(this, function () {

    'use strict';
    return function (boundTransportFn) {

        Object.keys(console).forEach(function (key) {

            let f;

            if ((f = console[key]) && typeof f === 'function') {

                console[key] = function () {

                    Object.values(arguments).forEach(function (a) {
                        boundTransportFn(a);
                    });

                    f.apply(console, arguments);

                }
            }
        });

    }
});


