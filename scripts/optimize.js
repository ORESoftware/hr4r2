//#npm
const _ = require('lodash');
const async = require('async');
const requirejs = require('requirejs');

const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

rimraf.sync(path.resolve(projectRoot + '/public/optimized'));


// >>>> https://github.com/requirejs/example-multipage


const paths = {
    '@AdminUIConfig': 'empty:',
    //requireLib: 'vendor/require',
    async: 'empty:',
    flux: 'empty:',
    react: 'empty:',
    'react-dom': 'empty:',
    'socket.io': 'empty:',
};

const baseConfig = _.merge({}, {paths: paths}, {
    //'optimize': 'none',
    mainConfigFile: 'public/js/main.js',
    allowSourceOverwrites: false,
    preserveLicenseComments: false,
    findNestedDependencies: false,
    baseUrl: 'public',
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
        out: path.resolve(projectRoot, 'public/optimized/bundles/common.js'),
        include: [
            // 'text'
        ],
        'stubModules': [
            // 'text'
        ]
    }),

    HomeView: _.merge({}, baseConfig, {
        out: path.resolve(projectRoot, 'public/optimized/bundles/home-view.js'),
        include: [
            path.resolve(projectRoot, 'public/js/views/home.js'),
        ]
    }),

    ArtView: _.merge({}, baseConfig, {
        out: path.resolve(projectRoot, 'public/optimized/bundles/art-view.js'),
        include: [
            path.resolve(projectRoot, 'public/js/views/art.js'),
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
