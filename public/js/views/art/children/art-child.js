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
define(["require", "exports", "react", "@redux-store"], function (require, exports, React, store) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArtChild = (function (_super) {
        __extends(ArtChild, _super);
        function ArtChild(props) {
            return _super.call(this, props) || this;
        }
        ArtChild.prototype.componentDidMount = function () {
            var s = store.getState();
            this.unsubscribe = store.subscribe(function () {
                console.log('home is subscribed.');
            });
        };
        ArtChild.prototype.componentWillUnmount = function () {
            console.log('component will unsubscribe');
            this.unsubscribe();
        };
        ArtChild.prototype.render = function () {
            return (React.createElement("div", null, "Wekkkpp zoom REBECCKKK"));
        };
        return ArtChild;
    }(React.Component));
    exports.default = ArtChild;
});
