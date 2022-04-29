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
const luban_class_1 = require("luban-class");
const Checkbox = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { className, perfixCls, checked, onChange, id, halfcheck = false, disabled = false } = props;
    const [inputCheck, setInputCheck] = React.useState(!!checked);
    React.useEffect(() => {
        setInputCheck(!!checked);
    }, [checked]);
    const onCheck = (e) => {
        if (disabled) {
            onChange && onChange(inputCheck, id, e);
            return;
        }
        setInputCheck(!inputCheck);
        onChange && onChange(!inputCheck, id, e);
    };
    const clsBox = (0, luban_class_1.default)(perfixCls, {
        [`${className}`]: className,
        [`${perfixCls}-disabled`]: disabled
    });
    const clsInput = (0, luban_class_1.default)(`${perfixCls}-input`, {
        [`${perfixCls}-checked`]: inputCheck,
        [`${perfixCls}-unchecked`]: !inputCheck,
        [`${perfixCls}-halfcheck`]: halfcheck,
    });
    return (React.createElement("div", { className: clsBox, onClick: onCheck },
        React.createElement("span", { className: clsInput }),
        children && React.createElement("div", { className: `${perfixCls}-content` }, children)));
};
Checkbox.defaultProps = {
    perfixCls: `${config_1.prefix}-checkbox`,
    checked: false,
    halfcheck: false,
    disabled: false
};
exports.default = React.memo(Checkbox);
