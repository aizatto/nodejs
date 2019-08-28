"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
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