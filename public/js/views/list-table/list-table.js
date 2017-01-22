var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var ListTable = (function (_super) {
        __extends(ListTable, _super);
        function ListTable(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.addItem = _this.addItem.bind(_this);
            _this.removeItem = _this.removeItem.bind(_this);
            _this.editItem = _this.editItem.bind(_this);
            return _this;
        }
        ListTable.prototype.addItem = function () {
        };
        ListTable.prototype.removeItem = function (index) {
        };
        ListTable.prototype.editItem = function (index, event) {
        };
        ListTable.prototype.render = function () {
            var _this = this;
            var _a = this.props, items = _a.items, addItem = _a.addItem;
            return (React.createElement("div", null,
                React.createElement("table", null,
                    React.createElement("tbody", null, map(items, function (item, index) {
                        return (React.createElement("tr", { key: index },
                            React.createElement("td", null,
                                React.createElement("input", { onChange: _this.editItem.bind(null, index), type: "text", value: item })),
                            React.createElement("td", null,
                                React.createElement("button", { onClick: _this.removeItem.bind(null, index), className: "delete" },
                                    React.createElement("i", { className: "fa fa-trash" })))));
                    }))),
                React.createElement("button", { onClick: this.addItem, className: "add" },
                    React.createElement("i", { className: "fa fa-plus" })),
                React.createElement(InfoBox, null)));
        };
        return ListTable;
    }(React.Component));
});
