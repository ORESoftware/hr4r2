var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var ReactDOM = require('react-dom');
    var async = require('async');
    function changeRoute(fns) {
        async.parallel(fns, function (err) {
        });
    }
    function getPage(routes, cb) {
        require(routes, function (view) {
            cb.apply(null, [view]);
        }, function (err) {
            console.error(err.stack || err);
            alert(err.stack || err);
        });
    }
    function handleRoute(props) {
        return function (View) {
            ReactDOM.render(React.createElement(View, __assign({}, props)), document.getElementById('root'), function (err, res) {
                if (err) {
                    console.error(err.stack || err);
                }
            });
        };
    }
    function home() {
        getPage(['js/views/home/home'], handleRoute({}));
    }
    function art() {
        getPage(['js/views/art/art'], handleRoute({}));
    }
    var routes = {
        '#home': home,
        '#art': art
    };
    function onHashChange() {
        console.log(' => hash change => location => ', location.hash, location.href, location);
        var href = window.location.hash;
        if (typeof routes[href] !== 'function') {
            console.log('routes location not found...');
        }
        else {
            routes[href].apply(null);
        }
    }
    function init() {
        window.addEventListener('hashchange', onHashChange, false);
    }
    exports.init = init;
});
