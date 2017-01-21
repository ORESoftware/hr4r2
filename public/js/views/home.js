var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "js/data-stores/redux-store"], function (require, exports, React, store) {
    "use strict";
    var asyncSayActionCreator = function (message) {
        return function (dispatch) {
            setTimeout(function () {
                console.log('dispatching...');
                dispatch({
                    type: 'SAY',
                    message: message
                });
            }, 2000);
        };
    };
    var sayActionCreator = function (message) {
        return {
            type: 'SAY',
            message: message
        };
    };
    var i = 0;
    return (function (_super) {
        __extends(Home, _super);
        function Home(props) {
            return _super.call(this, props) || this;
        }
        Home.prototype.componentDidMount = function () {
            var s = store.getState();
            this.unsubscribe = store.subscribe(function () {
                console.log('home is subscribed => ' + i++);
            });
            setTimeout(function () {
                console.log('aidentttt');
                store.dispatch(sayActionCreator('a'));
            }, 1000);
        };
        Home.prototype.componentWillUnmount = function () {
            console.log('component will unsubscribe');
            this.unsubscribe();
        };
        Home.prototype.render = function () {
            return (React.createElement("div", null, "Wekkkpp zoom BBBB"));
        };
        return Home;
    }(React.Component));
});
