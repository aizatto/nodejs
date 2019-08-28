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