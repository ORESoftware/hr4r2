requirejs.config({
    enforceDefine: false,
    waitSeconds: 7,
    baseUrl: '/',
    paths: {
        'rxjs': '//cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.1/Rx',
        'async': '//cdnjs.cloudflare.com/ajax/libs/async/2.1.4/async',
        'react-dom': '//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom',
        'react': '//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-with-addons',
        'socketio': '//cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io',
        '@hot-reloader': 'js/hot-reload-handler',
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
var deps = [
    'react-dom',
    'react',
    'socketio',
    'async',
    'backbone'
];
require(deps, function () {
    require(['js/application'], function (Application) {
        Application.start();
    });
});
