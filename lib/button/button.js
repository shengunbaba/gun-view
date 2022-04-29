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
require("./style.less");
const icon_1 = require("./icon");
const luban_class_1 = require("luban-class");
const config_1 = require("../config");
const Button = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { className, loading, onClick, perfixCls } = props;
    const onClickChange = (e) => {
        if (loading) {
            return;
        }
        onClick && onClick(e);
    };
    const clsButton = (0, luban_class_1.default)(perfixCls, {
        [`${perfixCls}-loading`]: loading,
        [`${className}`]: className
    });
    return (React.createElement("button", { className: clsButton, onClick: onClickChange },
        loading && React.createElement("i", null, icon_1.default),
        React.createElement("span", null, children)));
};
Button.defaultProps = {
    perfixCls: `${config_1.prefix}-button`,
};
exports.default = Button;
