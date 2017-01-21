
import * as React from 'react';
import {Demo} from "../isomorphic/react-components/index";
var express = require("express");
var router = express.Router();

var ReactDOMServer = require('react-dom/server');



/* GET home page. */
router.get('/', function (req, res, next) {

    res.send(ReactDOMServer.renderToStaticMarkup(<Demo age={3} name="Curt"/>));

});

module.exports = router;
