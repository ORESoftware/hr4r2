// this script should be run from the public directory (public should be cwd)


const _ = require('lodash');
const async = require('async');
const requirejs = require('requirejs');

const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

function resolve(p) {
    return path.resolve(projectRoot, p);
}


rimraf.sync(resolve('public/optimized'));
// >>>> https://github.com/requirejs/example-multipage

const _paths = {
    'rxjs': '//cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.1/Rx',
    'async': '//cdnjs.cloudflare.com/ajax/libs/async/2.1.4/async',
    'react-dom': '//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom',
    'react': '//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-with-addons',
    'socket.io': '//cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io',
    '@hot-reload-handler': 'js/hot-reload-handler',
    '@hot-reloader': 'js/hot-reloader',
    'tslib': 'vendor/tslib',
    'immutable': '//cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable',
    'react-redux': '//cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.5/react-redux',
    'redux': '//cdnjs.cloudflare.com/ajax/libs/redux/3.5.2/redux',
    'list-table': 'js/views/list-table',
    'firebase': '//www.gstatic.com/firebasejs/3.6.2/firebase.js',
    'redux-thunk': '//cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.2.0/redux-thunk'
};

const paths = Object.assign(_paths, {
    '@AdminUIConfig': 'empty:',
    requireLib: 'vendor/require',
    async: 'empty:',
    flux: 'empty:',
    react: 'empty:',
    'react-dom': 'empty:',
    'socket.io': 'empty:',
});

const baseConfig = _.merge({}, {paths: paths}, {
    //'optimize': 'none',
    mainConfigFile: resolve('public/js/main.js'),
    allowSourceOverwrites: false,
    preserveLicenseComments: false,
    findNestedDependencies: false,
    baseUrl: '.',
    //'name': 'app/js/main',
    create: true,
    fileExclusionRegExp: /\.git/,
    inlineText: true,
    logLevel: 0,
});

const configs = {

    //note: this is used for page load
    Common: _.merge({}, {paths: paths}, {
        //'optimizeAllPluginResources': true,
        //optimize: 'none',
        out: resolve('public/optimized/bundles/common.js'),
        include: [
            // 'text'
            resolve('public/js/main.js'),
            resolve('public/vendor/require.js')
        ],
        'stubModules': [
            // 'text'
        ]
    }),

    HomeView: _.merge({}, baseConfig, {
        out: resolve('public/optimized/bundles/home-view.js'),
        include: [
            resolve('public/js/views/home.js'),
        ]
    }),

    ArtView: _.merge({}, baseConfig, {
        out: resolve('public/optimized/bundles/art-view.js'),
        include: [
            resolve('public/js/views/art.js'),
        ]
    }),

};

async.eachSeries(Object.keys(configs), function (key, cb) {

    requirejs.optimize(configs[key], function (buildResponse) {

        console.log('build response => ', buildResponse);
        cb(null);

    }, function (err) {

        cb(err);

    });

}, function complete(err) {

    if (err) {
        console.error(err.stack || err);
        process.exit(1);
    }
    else {
        process.exit(0);
    }

});
