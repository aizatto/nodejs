'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tab;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tab(props) {
  return props.title;
} // eslint-disable-next-line import/no-extraneous-dependencies


Tab.propTypes = {
  title: _propTypes2.default.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  render: _propTypes2.default.func.isRequired
};