var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "@redux-store", "uuid"], function (require, exports, React, store, uuid) {
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
                            return {
                                title: c.data.title,
                                description: c.data.public_description,
                                image: c.data.header_img
                            };
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
            _this.onClickRetrieve = _this.onClickRetrieve.bind(_this);
            _this.state = {
                clicked: false,
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
            return this.state.items.map(function (item, index) {
                var style = {
                    backgroundColor: index % 2 === 0 ? "#ffa500" : "#0000CD"
                };
                return (React.createElement("tr", { style: style, key: uuid() },
                    React.createElement("td", null, item.title),
                    React.createElement("td", null,
                        " ",
                        item.description),
                    React.createElement("td", null,
                        React.createElement("img", { src: item.image }))));
            });
        };
        Home.prototype.onClickRetrieve = function () {
            this.state.clicked = true;
            store.dispatch(asyncActionCreator());
        };
        Home.prototype.getTableHeader = function () {
            return (React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, " Title"),
                    React.createElement("th", null, " Description"),
                    React.createElement("th", null, " Image "))));
        };
        Home.prototype.getTableBody = function () {
            return (React.createElement("tbody", null, this.collateRedditResuls()));
        };
        Home.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement("button", { onClick: this.onClickRetrieve }, " Click to retrieve SubReddits on ReactJS"),
                React.createElement("div", null,
                    React.createElement("div", null, "______________________________"),
                    React.createElement("b", null, " Reddit Search Results:"),
                    React.createElement("div", null, "______________________________"),
                    this.state.clicked ?
                        React.createElement("table", null,
                            this.getTableHeader(),
                            this.getTableBody())
                        : null)));
        };
        return Home;
    }(React.Component));
});
