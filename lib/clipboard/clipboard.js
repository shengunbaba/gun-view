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
const Clipboard = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { onChange, copy } = props;
    const ele = React.Children.only(children);
    const onClick = (e) => {
        // 监听复制事件
        document.oncopy = function (e) {
            e.clipboardData.setData('text', copy);
            e.preventDefault();
            document.oncopy = null;
        };
        document.execCommand('Copy');
        onChange && onChange(e);
    };
    return React.cloneElement(ele, { onClick });
};
exports.default = Clipboard;
