/* globals define async require */


import * as React from 'react';
const ReactDOM = require('react-dom');


if (!("onhashchange" in window)) {
    alert("The browser does *not* support the hashchange event!");
}


function changeRoute(fns) {

    async.parallel(fns, function (err) {

    });

}

function getPage(routes: string[], cb: Function) {

    require(routes, function (view) {
            // pass back all static assets that were fetched, first asset is always view
            cb.apply(null, [view]);
        },
        function (err) {

            console.error(err.stack || err);
            alert(err.stack || err);

        });

}


function handleRoute(props) {

    return function (View) {

        console.log(' rendering view after requiring file...');
        ReactDOM.render(<View  {...props}/>, document.getElementById('root'), function (err, res) {
            console.log('motorboat: ',err, res);
        });

    }

}


function home() {

    console.log('we are home now...');
    getPage(['js/views/home'], handleRoute({}));
}


const routes = {
    home: home,

};


export function init() {

    window.onhashchange = function () {

        console.log(' => location => ', location.hash, location.href, location);

        // remove # hash (first char)
        const href = String(window.location.hash).slice(1);

        if (typeof  routes[href] !== 'function') {
            console.log('routes location not found...');
        }
        else {
            routes[href].apply(null);
        }

    };

}





