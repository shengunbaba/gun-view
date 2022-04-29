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
const config_1 = require("../config");
const ReactDom = require("react-dom");
const luban_class_1 = require("luban-class");
const useDragAble_js_1 = require("../hooks/useDragAble.js");
const Modal = (_a) => {
    var props = __rest(_a, []);
    const { children, title, onRight, onCancel, onLeft, right, left, className, perfixCls, dragAble } = props;
    const div = React.useRef(document.createElement('div'));
    React.useEffect(() => {
        document.body.appendChild(div.current);
        return () => {
            document.body.removeChild(div.current);
        };
    }, []);
    const { targetRef, handleRef } = (0, useDragAble_js_1.default)(dragAble);
    const onLeftClick = (e) => {
        onLeft && onLeft(e);
    };
    const onRightClick = (e) => {
        onRight && onRight(e);
    };
    const onCancelClick = (e) => {
        onCancel && onCancel(e);
    };
    const classNames = (0, luban_class_1.default)(perfixCls, {
        [`${className}`]: className,
        [`${perfixCls}-nodrag`]: !dragAble,
        [`${perfixCls}-drag`]: dragAble,
    });
    return ReactDom.createPortal(React.createElement("div", { className: classNames, ref: targetRef },
        React.createElement("div", { className: `${perfixCls}-core` },
            onCancel && React.createElement("i", { onClick: onCancelClick }, icon_1.default),
            title &&
                React.createElement("p", { className: `${perfixCls}-title`, ref: handleRef }, title),
            React.createElement("div", { className: `${perfixCls}-content` }, children),
            (left || right) && React.createElement("div", { className: `${perfixCls}-btns` },
                left && React.createElement("span", { onClick: onLeftClick, className: `${perfixCls}-left` }, left),
                right && React.createElement("span", { onClick: onRightClick, className: `${perfixCls}-right` }, right)))), div.current);
};
Modal.defaultProps = {
    perfixCls: `${config_1.prefix}-modal`
};
exports.default = Modal;
