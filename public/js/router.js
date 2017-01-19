/* globals define async require */
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
    if (!("onhashchange" in window)) {
        alert("The browser does *not* support the hashchange event!");
    }
    function changeRoute(fns) {
        async.parallel(fns, function (err) {
        });
    }
    function getPage(routes, cb) {
        require(routes, function (view) {
            // pass back all static assets that were fetched, first asset is always view
            cb.apply(null, [view]);
        }, function (err) {
            console.error(err.stack || err);
            alert(err.stack || err);
        });
    }
    function handleRoute(props) {
        return function (View) {
            console.log(' rendering view after requiring file...');
            ReactDOM.render(React.createElement(View, __assign({}, props)), document.getElementById('root'), function (err, res) {
                console.log('motorboat: ', err, res);
            });
        };
    }
    function home() {
        console.log('we are home now...');
        getPage(['js/views/home'], handleRoute({}));
    }
    var routes = {
        home: home,
    };
    function init() {
        window.onhashchange = function () {
            console.log(' => location => ', location.hash, location.href, location);
            // remove # hash (first char)
            var href = String(window.location.hash).slice(1);
            if (typeof routes[href] !== 'function') {
                console.log('routes location not found...');
            }
            else {
                routes[href].apply(null);
            }
        };
    }
    exports.init = init;
});
