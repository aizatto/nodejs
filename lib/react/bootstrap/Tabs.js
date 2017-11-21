'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fn = require('./../../fn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-next-line import/no-extraneous-dependencies


// eslint-disable-next-line import/no-extraneous-dependencies


// eslint-disable-next-line import/no-extraneous-dependencies


var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    var activeKey = props.defaultActiveKey;
    if (activeKey === null && props.children.length > 0) {
      activeKey = props.children[0].props.eventKey;
    }

    _this.state = {
      activeKey: activeKey
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          defaultActiveKey = _props.defaultActiveKey,
          onSelect = _props.onSelect,
          props = _objectWithoutProperties(_props, ['defaultActiveKey', 'onSelect']);

      var activeKey = this.state.activeKey;

      var content = null;

      var currentUrl = window.location.toString();

      var children = _lodash2.default.flatten(this.props.children).map(function (child) {
        if (!child) {
          return null;
        }

        var _child$props = _extends({}, child.props),
            eventKey = _child$props.eventKey,
            hrefProp = _child$props.href,
            childRender = _child$props.render,
            className = _child$props.className,
            title = _child$props.title,
            childProps = _objectWithoutProperties(_child$props, ['eventKey', 'href', 'render', 'className', 'title']);

        var href = hrefProp;

        childProps.key = eventKey;
        var aClassName = '';

        if (href) {
          if (eventKey === activeKey || (0, _fn.compareURL)(currentUrl, href)) {
            aClassName = 'active';
          }
        } else {
          if (eventKey === activeKey) {
            aClassName = 'active';
            content = childRender ? childRender() : null;
          }

          href = '#' + eventKey;
          var fn = childProps.onClick;
          childProps.onClick = function (e) {
            _this2.setState({
              activeKey: eventKey
            }, function () {
              if (fn) {
                fn(e);
              }
              if (onSelect) {
                onSelect(eventKey);
              }
            });
          };
        }

        return _react2.default.createElement(
          'li',
          _extends({
            role: 'presentation',
            className: 'nav-item ' + className
          }, childProps),
          _react2.default.createElement(
            'a',
            { className: 'nav-link ' + aClassName, href: href },
            title
          )
        );
      });

      props.className = 'nav nav-tabs ' + props.className;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          props,
          children
        ),
        content
      );
    }
  }]);

  return Tabs;
}(_react2.default.Component);

Tabs.propTypes = {
  defaultActiveKey: _propTypes2.default.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: _propTypes2.default.array.isRequired,
  onSelect: _propTypes2.default.func
};
Tabs.defaultProps = {
  defaultActiveKey: null,
  onSelect: null,
  className: ''
};
exports.default = Tabs;