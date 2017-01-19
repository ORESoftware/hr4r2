define(["require", "exports", "react", "./isomorphic/react-components/error"], function (require, exports, React, error_1) {
    'use strict';
    var ReactDOMServer = require('react-dom/server');
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var index = require('./routes/index');
    var users = require('./routes/users');
    var app = express();
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', index);
    app.use('/users', users);
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.send(ReactDOMServer.renderToStaticMarkup(React.createElement(error_1.ErrorView, { error: err })));
    });
    module.exports = app;
});
