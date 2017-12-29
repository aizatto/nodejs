'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-next-line import/no-extraneous-dependencies


// eslint-disable-next-line import/no-extraneous-dependencies


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

      var className = (0, _classnames2.default)(['dropdown', {
        show: this.state.open === State.OPENED
      }]);

      var title = this.props.title;

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'button',
          {
            className: (0, _classnames2.default)('btn', 'btn-secondary', 'dropdown-toggle', this.props.className),
            onClick: function onClick() {
              return _this2.toggleState();
            },
            type: 'button',
            'aria-haspopup': 'true',
            'aria-expanded': this.state.open === State.OPENED
          },
          title
        ),
        this.renderChildren()
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this3 = this;

      var children = this.props.children.map(function (child, index) {
        var _child$props = child.props,
            title = _child$props.title,
            onClickProp = _child$props.onClick;


        var onClick = function onClick(e) {
          e.preventDefault();
          _this3.setState({
            open: State.CLOSED
          }, function () {
            if (onClickProp) {
              onClickProp(e);
            }
          });
        };

        return _react2.default.createElement(
          'a',
          {
            key: index,
            onClick: onClick,
            className: 'dropdown-item',
            href: '#dropdown'
          },
          title
        );
      });

      var className = (0, _classnames2.default)(['dropdown-menu', {
        show: this.state.open === State.OPENED
      }]);

      return _react2.default.createElement(
        'div',
        { className: className },
        children
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

Dropdown.propTypes = {
  title: _propTypes2.default.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: _propTypes2.default.array,
  className: _propTypes2.default.string
};
Dropdown.defaultProps = {
  children: [],
  className: ''
};
exports.default = Dropdown;