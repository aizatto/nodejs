"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var fn_1 = require("./fn");
// Taken from https://github.com/facebook/draft-js/blob/aede8238ed5f36e6ebaf637c713bee24f56d29e6/src/component/utils/KeyBindingUtil.js
var isOSX = navigator.userAgent.indexOf("Mac OS X") !== -1;
// https://aizatto.github.io/keyboardevents/
// https://keycode.info/
// https://github.com/nfriend/ts-keycode-enum/blob/HEAD/Key.enum.ts
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["ESCAPE"] = 27] = "ESCAPE";
    KeyCode[KeyCode["DIGIT_0"] = 48] = "DIGIT_0";
    KeyCode[KeyCode["DIGIT_1"] = 49] = "DIGIT_1";
    KeyCode[KeyCode["DIGIT_2"] = 50] = "DIGIT_2";
    KeyCode[KeyCode["DIGIT_3"] = 51] = "DIGIT_3";
    KeyCode[KeyCode["DIGIT_4"] = 52] = "DIGIT_4";
    KeyCode[KeyCode["DIGIT_5"] = 53] = "DIGIT_5";
    KeyCode[KeyCode["DIGIT_6"] = 54] = "DIGIT_6";
    KeyCode[KeyCode["DIGIT_7"] = 55] = "DIGIT_7";
    KeyCode[KeyCode["DIGIT_8"] = 56] = "DIGIT_8";
    KeyCode[KeyCode["DIGIT_9"] = 57] = "DIGIT_9";
    KeyCode[KeyCode["A"] = 65] = "A";
    KeyCode[KeyCode["B"] = 66] = "B";
    KeyCode[KeyCode["C"] = 67] = "C";
    KeyCode[KeyCode["D"] = 68] = "D";
    KeyCode[KeyCode["E"] = 69] = "E";
    KeyCode[KeyCode["F"] = 70] = "F";
    KeyCode[KeyCode["G"] = 71] = "G";
    KeyCode[KeyCode["H"] = 72] = "H";
    KeyCode[KeyCode["I"] = 73] = "I";
    KeyCode[KeyCode["J"] = 74] = "J";
    KeyCode[KeyCode["K"] = 75] = "K";
    KeyCode[KeyCode["L"] = 76] = "L";
    KeyCode[KeyCode["M"] = 77] = "M";
    KeyCode[KeyCode["N"] = 78] = "N";
    KeyCode[KeyCode["O"] = 79] = "O";
    KeyCode[KeyCode["P"] = 80] = "P";
    KeyCode[KeyCode["Q"] = 81] = "Q";
    KeyCode[KeyCode["R"] = 82] = "R";
    KeyCode[KeyCode["S"] = 83] = "S";
    KeyCode[KeyCode["T"] = 84] = "T";
    KeyCode[KeyCode["U"] = 85] = "U";
    KeyCode[KeyCode["V"] = 86] = "V";
    KeyCode[KeyCode["W"] = 87] = "W";
    KeyCode[KeyCode["X"] = 88] = "X";
    KeyCode[KeyCode["Y"] = 89] = "Y";
    KeyCode[KeyCode["Z"] = 90] = "Z";
})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));
var Modifiers;
(function (Modifiers) {
    Modifiers["CTRL"] = "ctrl";
    Modifiers["SHIFT"] = "shift";
    // macOS
    Modifiers["OPTION"] = "option";
    Modifiers["COMMAND"] = "command";
    // others
    Modifiers["ALT"] = "alt";
})(Modifiers = exports.Modifiers || (exports.Modifiers = {}));
var OS;
(function (OS) {
    OS[OS["MAC"] = 0] = "MAC";
    OS[OS["OTHERS"] = 1] = "OTHERS";
})(OS = exports.OS || (exports.OS = {}));
function assertModifiers(e, expectedModifiers) {
    var modifiers = new Set();
    if (e.ctrlKey) {
        modifiers.add(Modifiers.CTRL);
    }
    if (e.shiftKey) {
        modifiers.add(Modifiers.SHIFT);
    }
    if (isOSX) {
        if (e.altKey) {
            modifiers.add(Modifiers.OPTION);
        }
        if (e.metaKey) {
            modifiers.add(Modifiers.COMMAND);
        }
    }
    else {
        if (e.altKey) {
            modifiers.add(Modifiers.ALT);
        }
    }
    return fn_1.setEqual(modifiers, expectedModifiers);
}
exports.assertModifiers = assertModifiers;
function useKeyboardSaveShortcut(saveFn) {
    react_1.useEffect(function () {
        var listener = function (e) {
            if (e.keyCode !== KeyCode.S) {
                return;
            }
            var modifiers = isOSX
                ? new Set([Modifiers.COMMAND])
                : new Set([Modifiers.CTRL]);
            if (assertModifiers(e, modifiers)) {
                e.preventDefault();
                saveFn();
            }
        };
        document.addEventListener("keydown", listener);
        return function () {
            document.removeEventListener("keydown", listener);
        };
    });
}
exports.useKeyboardSaveShortcut = useKeyboardSaveShortcut;
//# sourceMappingURL=keyboardShortcuts.js.map