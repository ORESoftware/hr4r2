"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("../isomorphic/react-components/index");
var express = require("express");
var router = express.Router();
var ReactDOMServer = require('react-dom/server');
router.get('/', function (req, res, next) {
    res.send(ReactDOMServer.renderToStaticMarkup(React.createElement(index_1.Demo, { age: 3, name: "Curt" })));
});
module.exports = router;
