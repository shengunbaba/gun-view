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
/**
 *
 * 约定： 在 src/component/icon 里面存放svg
 *
 */
const Icon = (_a) => {
    var props = __rest(_a, []);
    const p = require(`./demo/${props.type}`).default;
    const { onClick, className, onMouseEnter, onMouseLeave, style } = props;
    const onClickChange = (e) => {
        onClick && onClick(e);
    };
    const onEnter = (e) => {
        onMouseEnter && onMouseEnter(e);
    };
    const onLeave = (e) => {
        onMouseLeave && onMouseLeave(e);
    };
    return (React.createElement("i", { className: className, onClick: onClickChange, onMouseEnter: onEnter, onMouseLeave: onLeave, style: style }, p));
};
exports.default = Icon;
