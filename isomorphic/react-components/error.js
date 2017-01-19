var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
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
});
