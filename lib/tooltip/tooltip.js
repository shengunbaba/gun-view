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
const config_1 = require("../config");
const portal_1 = require("./portal");
const Tooltip = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const [target, setTarget] = React.useState(null);
    const div = React.useRef(null);
    const { destory = true } = props;
    const ele = React.Children.only(children);
    const onMouseEnter = (e) => {
        div.current = document.createElement('div');
        document.body.appendChild(div.current);
        const target = e.currentTarget;
        setTarget(target);
    };
    const onMouseLeave = (e) => {
        if (!destory) {
            return;
        }
        if (div.current && div.current.parentNode) {
            div.current.parentNode.removeChild(div.current);
            setTarget(null);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.cloneElement(ele, { onMouseEnter, onMouseLeave }),
        target && React.createElement(portal_1.default, Object.assign({ target: target, div: div }, props))));
};
Tooltip.defaultProps = {
    perfixCls: `${config_1.prefix}-tooltip`,
    placement: 'top',
    destory: true
};
exports.default = React.memo(Tooltip);
