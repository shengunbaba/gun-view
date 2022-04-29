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
const util_1 = require("./util");
const luban_class_1 = require("luban-class");
const config_1 = require("../config");
const Col = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { gutter } = React.useContext(util_1.CTX);
    const { span, xs, sm, md, lg, xl, className, onClick, clsPrefix } = props;
    const style = {};
    if (gutter) {
        if (Object.prototype.toString.call(gutter) == '[object Array]') {
            Object.assign(style, {
                padding: `${gutter[0] / 2}px ${gutter[1] / 2}px`
            });
        }
        if (Object.prototype.toString.call(gutter) == '[object Object]') {
        }
        if (Object.prototype.toString.call(gutter) == '[object Number]') {
            Object.assign(style, {
                padding: `${gutter / 2}px`
            });
        }
    }
    const clsCol = (0, luban_class_1.default)(`${clsPrefix}`, {
        [`${clsPrefix}-xs-${xs}`]: xs && !span,
        [`${clsPrefix}-sm-${sm}`]: sm && !span,
        [`${clsPrefix}-md-${md}`]: md && !span,
        [`${clsPrefix}-lg-${lg}`]: lg && !span,
        [`${clsPrefix}-xl-${xl}`]: xl && !span,
        [`${clsPrefix}-span-${span}`]: span,
        [`${className}`]: !!className
    });
    const onClickEvent = () => {
        onClick && onClick();
    };
    return (React.createElement("div", { className: clsCol, style: style, onClick: onClickEvent }, children));
};
Col.defaultProps = {
    clsPrefix: `${config_1.prefix}-col`,
};
exports.default = Col;
