"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("./utils");
const config_1 = require("../config");
const Option = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { value, prefixCls } = props;
    return (React.createElement(utils_1.CTX.Consumer, null, (context) => {
        const { _onChange, _active } = context;
        return (React.createElement("div", { className: _active === value ? `${prefixCls}-active` : '', key: value, onMouseDown: (e) => _onChange(value, e) }, children));
    }));
};
Option.defaultProps = {
    prefixCls: `${config_1.prefix}-select-option`
};
exports.default = React.memo(Option);
