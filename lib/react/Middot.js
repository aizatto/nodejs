"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Middot(props) {
    var length = props.children.length;
    var children = [];
    for (var i = 0; i < length; i++) {
        var child = props.children[i];
        children.push(child);
        if (i < length - 1) {
            children.push(React.createElement("span", { key: i }, " \u00B7 "));
        }
    }
    return React.createElement(React.Fragment, null, children);
}
exports.default = Middot;
;
//# sourceMappingURL=Middot.js.map