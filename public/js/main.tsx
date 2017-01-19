/* globals console define require React async */


//https://github.com/ccoenraets/nodecellar
//http://ozkatz.github.io/converting-an-existing-backbonejs-project-to-requirejs.html
//https://github.com/volojs/create-template
//http://www.webdeveasy.com/optimize-requirejs-projects/
//https://github.com/tastejs/todomvc/tree/gh-pages/examples/backbone_require
//TODO: http://stackoverflow.com/questions/19827912/package-html-templates-in-require-js-optimizer
//TODO: https://cdnjs.com/libraries/backbone.js/tutorials/organizing-backbone-using-modules
//TODO: http://code.tutsplus.com/tutorials/game-on-backbone-and-ember--net-26836
//TODO: http://stackoverflow.com/questions/8780775/text-files-in-the-path-configuration-file
//TODO: http://blog.mayflower.de/3937-Backbone-React.html
//TODO: https://github.com/philix/jsx-requirejs-plugin
//TODO: Safari doesn't accept gzip compression?
//TODO: agage


requirejs.config({

    enforceDefine: false,
    waitSeconds: 7,
    baseUrl: '/',
    paths: {
        //core npm/bower modules
        'rxjs': '//cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.1/Rx',
        'async': '//cdnjs.cloudflare.com/ajax/libs/async/2.1.4/async',
        'react-dom': '//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom',
        'react': '//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-with-addons',
        // 'socketio': '//cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io',
        'socketio': '//cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io',
        '@hot-reload-handler': 'js/hot-reload-handler',
        '@hot-reloader': 'js/hot-reloader',

        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        'backbone': '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone'
    },

    'shim': {
        'underscore': {
            'exports': '_'
        },

        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        }
    }

});

document.addEventListener("DOMContentLoaded", function(event) {
    console.log('dom is ready');
    window.domIsReady = true;
});

const deps = [
    'react-dom',
    'react',
    'socketio',
    'async',
    'backbone'
];

require(deps, function () {

    require(['js/application'], function (Application) {

        try{
            // if we reload this file, this will error out
            Backbone.history.start();
        }
        catch(err){

        }

        Application.start();

    });

});




