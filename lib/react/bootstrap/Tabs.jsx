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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
var React = require("react");
// eslint-disable-next-line import/no-extraneous-dependencies
var lodash_1 = require("lodash");
var fn_1 = require("../../fn");
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs(props) {
        var _this = _super.call(this, props) || this;
        var activeKey = props.defaultActiveKey;
        if (activeKey === null &&
            props.children.length > 0) {
            activeKey = props.children[0].props.eventKey;
        }
        _this.state = {
            activeKey: activeKey,
        };
        return _this;
    }
    Tabs.prototype.render = function () {
        var _this = this;
        var _a = this.props, defaultActiveKey = _a.defaultActiveKey, onSelect = _a.onSelect, props = __rest(_a, ["defaultActiveKey", "onSelect"]);
        var activeKey = this.state.activeKey;
        var content = null;
        var currentUrl = window.location.toString();
        var children = lodash_1.default.flatten(this.props.children).map(function (child) {
            if (!child) {
                return null;
            }
            var _a = child.props, eventKey = _a.eventKey, hrefProp = _a.href, childRender = _a.render, className = _a.className, title = _a.title, childProps = __rest(_a, ["eventKey", "href", "render", "className", "title"]);
            var href = hrefProp;
            childProps.key = eventKey;
            var aClassName = '';
            if (href) {
                if (eventKey === activeKey ||
                    fn_1.compareURL(currentUrl, href)) {
                    aClassName = 'active';
                }
            }
            else {
                if (eventKey === activeKey) {
                    aClassName = 'active';
                    content = childRender
                        ? childRender()
                        : null;
                }
                href = "#" + eventKey;
                var fn_2 = childProps.onClick;
                childProps.onClick = function (e) {
                    _this.setState({
                        activeKey: eventKey,
                    }, function () {
                        if (fn_2) {
                            fn_2(e);
                        }
                        if (onSelect) {
                            onSelect(eventKey);
                        }
                    });
                };
            }
            return (<li role="presentation" className={"nav-item " + className} {...childProps}>
          <a className={"nav-link " + aClassName} href={href}>{title}</a>
        </li>);
        });
        var className = "nav nav-tabs " + props.className;
        return (<div>
        <ul {...props} className={className}>
          {children}
        </ul>
        {content}
      </div>);
    };
    Tabs.defaultProps = {
        defaultActiveKey: null,
        onSelect: null,
        className: '',
    };
    return Tabs;
}(React.Component));
exports.default = Tabs;
//# sourceMappingURL=Tabs.jsx.map