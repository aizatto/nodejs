"use strict";
exports.__esModule = true;
// eslint-disable-next-line import/no-extraneous-dependencies
var prop_types_1 = require("prop-types");
function Tab(props) {
    return props.title;
}
exports["default"] = Tab;
Tab.propTypes = {
    title: prop_types_1["default"].node.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    render: prop_types_1["default"].func
};
Tab.defaultProps = {
    className: ''
};
