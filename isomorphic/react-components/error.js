"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ErrorView = (function (_super) {
    __extends(ErrorView, _super);
    function ErrorView(props) {
        var _this = _super.call(this, props) || this;
        _this.error = props.error;
        return _this;
    }
    ErrorView.prototype.render = function () {
        return (React.createElement("div", null, this.error.stack || this.error));
    };
    return ErrorView;
}(React.Component));
exports.ErrorView = ErrorView;
