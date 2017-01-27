'use strict';

import * as React from 'react';
var ReactDOMServer = require('react-dom/server');
import {ErrorView} from "./isomorphic/react-components/error";

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.use(function (req, res, next) {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(ReactDOMServer.renderToStaticMarkup(<ErrorView error={err}/>));

});

module.exports = app;
