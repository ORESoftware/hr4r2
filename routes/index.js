define(["require", "exports", "react", "../isomorphic/react-components/index"], function (require, exports, React, index_1) {
    "use strict";
    var express = require("express");
    var router = express.Router();
    var ReactDOMServer = require('react-dom/server');
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.send(ReactDOMServer.renderToStaticMarkup(React.createElement(index_1.Demo, { age: 3, name: "Curt" })));
    });
    module.exports = router;
});
