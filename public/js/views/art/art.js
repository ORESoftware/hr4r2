var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "../../data-stores/redux-store", "./children/art-child"], function (require, exports, React, store, art_child_1) {
    "use strict";
    return (function (_super) {
        __extends(Home, _super);
        function Home(props) {
            return _super.call(this, props) || this;
        }
        Home.prototype.componentDidMount = function () {
            var s = store.getState();
            this.unsubscribe = store.subscribe(function () {
                console.log('home is subscribed.');
            });
        };
        Home.prototype.componentWillUnmount = function () {
            console.log('component will unsubscribe');
            this.unsubscribe();
        };
        Home.prototype.render = function () {
            art_child_1.default = require('./children/art-child').default;
            return (React.createElement("div", null,
                "Wekkkpp zoom peaches",
                React.createElement(art_child_1.default, null)));
        };
        return Home;
    }(React.Component));
});
