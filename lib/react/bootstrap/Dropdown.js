"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
var React = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var State = {
    OPENED: 'opened',
    CLOSED: 'closed',
};
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            open: State.CLOSED,
        };
        return _this;
    }
    Dropdown.prototype.render = function () {
        var _this = this;
        var className = classnames_1.default([
            'dropdown',
            {
                show: this.state.open === State.OPENED,
            },
        ]);
        var title = this.props.title;
        return (React.createElement("div", { className: className },
            React.createElement("button", { className: classnames_1.default('btn', 'btn-secondary', 'dropdown-toggle', this.props.className), onClick: function () { return _this.toggleState(); }, type: "button", "aria-haspopup": "true", "aria-expanded": this.state.open === State.OPENED }, title),
            this.renderChildren()));
    };
    Dropdown.prototype.renderChildren = function () {
        var _this = this;
        var children = this.props.children.map(function (child, index) {
            var _a = child.props, title = _a.title, onClickProp = _a.onClick;
            var onClick = function (e) {
                e.preventDefault();
                _this.setState({
                    open: State.CLOSED,
                }, function () {
                    if (onClickProp) {
                        onClickProp(e);
                    }
                });
            };
            return (React.createElement("a", { 
                // eslint-disable-next-line react/no-array-index-key
                key: index, onClick: onClick, className: "dropdown-item", href: "#dropdown" }, title));
        });
        var className = classnames_1.default([
            'dropdown-menu',
            {
                show: this.state.open === State.OPENED,
            },
        ]);
        return (React.createElement("div", { className: className }, children));
    };
    Dropdown.prototype.toggleState = function () {
        this.setState(function (prevState) { return ({
            open: prevState.open === State.OPENED
                ? State.CLOSED
                : State.OPENED,
        }); });
    };
    Dropdown.defaultProps = {
        children: [],
        className: '',
    };
    return Dropdown;
}(React.Component));
exports.default = Dropdown;
//# sourceMappingURL=Dropdown.js.map