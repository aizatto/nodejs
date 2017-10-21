'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-next-line import/no-extraneous-dependencies


var State = {
  OPENED: 'opened',
  CLOSED: 'closed'
};

var Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      open: State.CLOSED
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var title = this.props.title;

      var children = (this.props.children || []).map(function (child, index) {
        var _child$props = child.props,
            title = _child$props.title,
            onClickProp = _child$props.onClick;


        var onClick = function onClick(e) {
          _this2.setState({
            open: State.CLOSED
          }, function () {
            if (onClickProp) {
              onClickProp(e);
            }
          });
        };

        return _react2.default.createElement(
          'li',
          {
            key: index,
            onClick: onClick },
          _react2.default.createElement(
            'a',
            { href: '#' },
            title
          )
        );
      });

      var className = (0, _classnames2.default)(['dropdown', {
        open: this.state.open === State.OPENED
      }]);

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'button',
          {
            className: (0, _classnames2.default)("btn", "btn-default", "dropdown-toggle", this.props.className),
            onClick: function onClick() {
              return _this2.toggleState();
            },
            type: 'button',
            id: 'dropdownMenu1',
            'aria-haspopup': 'true',
            'aria-expanded': 'true' },
          title,
          ' ',
          _react2.default.createElement('span', { className: 'caret' })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'dropdown-menu', 'aria-labelledby': 'dropdownMenu1' },
          children
        )
      );
    }
  }, {
    key: 'toggleState',
    value: function toggleState() {
      this.setState({
        open: this.state.open === State.OPENED ? State.CLOSED : State.OPENED
      });
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

exports.default = Dropdown;