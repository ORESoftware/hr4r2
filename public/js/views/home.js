var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    return (function (_super) {
        __extends(Home, _super);
        function Home(props) {
            return _super.call(this, props) || this;
        }
        Home.prototype.render = function () {
            return (React.createElement("div", null, "We are home sucksa!xxxx!!"));
        };
        return Home;
    }(React.Component));
});
