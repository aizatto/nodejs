"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
function Status(props) {
    if (!props.relay.hasMore()) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    // TODO: there is a race condition here
    if (props.relay.isLoading()) {
        return react_1.default.createElement(react_1.default.Fragment, null, "Loading...");
    }
    return react_1.default.createElement("span", { onClick: function () { return props.loadMore(); } }, "Scroll To Load More");
}
var ScrollPagination = function (props) {
    var ref = react_1.useRef(null);
    react_1.useEffect(function () {
        var listener = function () {
            if (!props.relay.hasMore() || props.relay.isLoading()) {
                return;
            }
            var el = ref.current;
            if (!el) {
                return;
            }
            var elementBottom = el.scrollTop + el.scrollHeight;
            var screenBottom = window.pageYOffset + window.innerHeight;
            if (elementBottom <= screenBottom) {
                props.loadMore();
            }
        };
        listener();
        window.addEventListener("scroll", listener);
        return function () {
            window.removeEventListener("scroll", listener);
        };
    });
    return (react_1.default.createElement("div", { className: props.className, ref: ref },
        props.children,
        react_1.default.createElement(Status, __assign({}, props))));
};
exports.default = ScrollPagination;
//# sourceMappingURL=ScrollPagination.js.map