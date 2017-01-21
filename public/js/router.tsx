/* globals define async require */


import * as React from 'react';
const ReactDOM = require('react-dom');
const async = require('async');
import store = require('js/data-stores/redux-store');


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

        ReactDOM.render(<View  {...props}/>, document.getElementById('root'), function (err, res) {
            if(err){
                console.error(err.stack || err);
            }
        });

    }

}


function home() {

    getPage(['js/views/home'], handleRoute({}));
}


function art() {

    getPage(['js/views/art'], handleRoute({}));
}


const routes = {
    '#home': home,
    '#art': art

};


function onHashChange() {
    console.log(' => hash change => location => ', location.hash, location.href, location);

    const href = window.location.hash;

    if (typeof  routes[href] !== 'function') {
        console.log('routes location not found...');
    }
    else {
        routes[href].apply(null);
    }
}


export function init() {

    window.addEventListener('hashchange', onHashChange, false);


}





