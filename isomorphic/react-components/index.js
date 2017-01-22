"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DemoProps = (function () {
    function DemoProps() {
    }
    return DemoProps;
}());
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo(props) {
        var _this = _super.call(this, props) || this;
        _this.getScript = _this.getScript.bind(_this);
        return _this;
    }
    Demo.prototype.getScript = function () {
        var config = JSON.stringify({
            env: process.env.NODE_ENV
        });
        return { __html: 'define("@config", [], function () {' +
                ' return ' + config + ';' +
                '});' };
    };
    Demo.prototype.getProdHead = function () {
        return (React.createElement("script", { src: "/optimized/bundles/common.js" }));
    };
    Demo.prototype.getDevHead = function () {
        return (React.createElement("script", { "data-main": "/js/main", src: "/vendor/require.js" }));
    };
    Demo.prototype.render = function () {
        var isDev = process.env.NODE_ENV !== 'production';
        return (React.createElement("html", null,
            React.createElement("head", null,
                isDev ? this.getDevHead() : this.getProdHead(),
                React.createElement("script", { dangerouslySetInnerHTML: this.getScript() })),
            React.createElement("div", null,
                React.createElement("progress", { id: "hot-reload-progress-bar", value: "100", max: "100" })),
            React.createElement("body", null,
                React.createElement("div", { id: "root" }, "Initial Home Page"))));
    };
    return Demo;
}(React.Component));
exports.Demo = Demo;
