var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "../../data-stores/redux-store"], function (require, exports, React, store) {
    "use strict";
    var asyncActionCreator = function () {
        return function (dispatch) {
            fetch('https://www.reddit.com/subreddits/search.json?q=reactjs', {
                method: 'get',
            }).then(function (response) {
                console.log('response => ', response);
                response.json().then(function (json) {
                    console.log('json => ', json);
                    dispatch({
                        type: 'GET_REACTJS_REDDIT',
                        result: json.data.children.map(function (c) {
                            return c.data.title;
                        })
                    });
                });
            }).catch(function (err) {
                console.error(err.stack || err);
            });
        };
    };
    var i = 0;
    return (function (_super) {
        __extends(Home, _super);
        function Home(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                items: []
            };
            return _this;
        }
        Home.prototype.componentDidMount = function () {
            var _this = this;
            var s = store.getState();
            this.unsubscribe = store.subscribe(function () {
                console.log('home is subscribed => ' + i++, 'items =>', store.getState().items);
                _this.setState({
                    items: store.getState().items
                });
            });
        };
        Home.prototype.componentWillUnmount = function () {
            console.log('component will unsubscribe');
            this.unsubscribe();
        };
        Home.prototype.collateRedditResuls = function () {
            return this.state.items.map(function (item) {
                console.log('item => ', item);
                return (React.createElement("div", null, item));
            });
        };
        Home.prototype.onClick = function () {
            store.dispatch(asyncActionCreator());
        };
        Home.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement("button", { onClick: this.onClick }, " Retrieve SubReddits on ReactJS"),
                React.createElement("div", null,
                    React.createElement("b", null, " Results:"),
                    this.collateRedditResuls())));
        };
        return Home;
    }(React.Component));
});
