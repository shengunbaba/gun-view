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
const luban_class_1 = require("luban-class");
const config_1 = require("../config");
const ExCoArrow = (_a) => {
    var props = __rest(_a, []);
    const { className = '', onChange, color, downward, perfixCls } = props;
    const clsName = (0, luban_class_1.default)(perfixCls, {
        [`${perfixCls}-down`]: downward,
        [`${className}`]: className
    });
    const onArrowChange = (e) => {
        onChange && onChange(e);
    };
    return (React.createElement("div", { className: clsName, onClick: onArrowChange },
        React.createElement("span", { className: `${perfixCls}-left`, style: { background: color } }),
        React.createElement("span", { className: `${perfixCls}-right`, style: { background: color } })));
};
ExCoArrow.defaultProps = {
    perfixCls: `${config_1.prefix}-ex-co-arrow`,
    color: '#666'
};
exports.default = React.memo(ExCoArrow);
