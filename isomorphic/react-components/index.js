var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var DemoProps = (function () {
        function DemoProps() {
        }
        return DemoProps;
    }());
    var Demo = (function (_super) {
        __extends(Demo, _super);
        function Demo(props) {
            return _super.call(this, props) || this;
        }
        Demo.prototype.render = function () {
            return (React.createElement("html", null,
                React.createElement("head", null,
                    React.createElement("script", { "data-main": "/js/main", src: "/vendor/require.js" }),
                    React.createElement("script", null,
                        "define('@AdminUIConfig', [], function () ",
                    ,
                        " new Object(",
                        React.createElement("", null),
                        "- data %>);" + " " + "});")),
                React.createElement("body", null,
                    React.createElement("div", { id: "root" }, "HELLO THERE"),
                    React.createElement("div", null,
                        React.createElement("progress", { id: "hot-reload-progress-bar", value: "100", max: "100" })))));
        };
        return Demo;
    }(React.Component));
    exports.Demo = Demo;
});
