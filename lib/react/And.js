"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function And(props) {
    var children = props.children.filter(function (a) { return a; });
    var length = children.length;
    var newChildren = [];
    for (var i = 0; i < length; i++) {
        newChildren.push(children[i]);
        if (i < length - 2) {
            newChildren.push(', ');
        }
        else if (i === length - 2) {
            newChildren.push(', and ');
        }
    }
    return React.createElement(React.Fragment, null, newChildren);
}
exports.default = And;
//# sourceMappingURL=And.js.map