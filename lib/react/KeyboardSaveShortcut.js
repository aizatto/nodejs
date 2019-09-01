"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var keyboardShortcuts_1 = require("../keyboardShortcuts");
var KeyboardSaveShortcut = function (props) {
    keyboardShortcuts_1.useKeyboardSaveShortcut(props.saveFn);
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.default = KeyboardSaveShortcut;
//# sourceMappingURL=KeyboardSaveShortcut.js.map