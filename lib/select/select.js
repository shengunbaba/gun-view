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
const option_1 = require("./option");
require("./style.less");
const config_1 = require("../config");
const luban_class_1 = require("luban-class");
const icons = require("./arrow");
const { ArrowIcon, SearchIcon } = icons;
const Select = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { value, onChange, className, perfixCls, style, showSearch } = props;
    const [active, setActive] = React.useState(value);
    const [show, setShow] = React.useState(false);
    const [viewData, setViewData] = React.useState('');
    const [searchValue, setSearchValue] = React.useState('');
    React.useEffect(() => {
        React.Children.forEach(children, (child) => {
            if (child.props.value == value) {
                setViewData(child.props.children);
            }
        });
    }, [value]);
    const _onChange = (val, e) => {
        console.log(val);
        React.Children.forEach(children, (child) => {
            if (child.props.value == val) {
                setViewData(child.props.children);
                setActive(val);
            }
        });
        setShow(false);
        onChange && onChange(val, e);
    };
    const ctxValue = {
        _onChange,
        _active: active
    };
    const onSelectChange = (e) => {
        setShow(!show);
    };
    const onBlur = (e) => {
        setShow(false);
        setSearchValue('');
    };
    const oninputChange = (e) => {
        const value = e.target.value.trim();
        setSearchValue(value);
    };
    const renderChildren = (function () {
        if (showSearch) {
            const result = [];
            React.Children.map(children, (child) => {
                if (child.props.children.includes(searchValue)) {
                    result.push(child);
                }
            });
            return result;
        }
        else {
            return children;
        }
    })();
    const inputCls = (0, luban_class_1.default)(`${perfixCls}-input`, {
        [`${perfixCls}-input-hide`]: !showSearch || showSearch && !show
    });
    const dropCls = (0, luban_class_1.default)(`${perfixCls}-drop`, `${config_1.prefix}-scrollbar`, {
        [`${perfixCls}-drop-show`]: show,
        [`${perfixCls}-drop-hide`]: !show
    });
    return (React.createElement(utils_1.CTX.Provider, { value: ctxValue },
        React.createElement("div", { className: className ? `${className} ${perfixCls}` : perfixCls, style: style },
            React.createElement("div", { onClick: onSelectChange, className: `${perfixCls}-view` },
                React.createElement("input", { type: "text", className: inputCls, readOnly: !showSearch, onChange: oninputChange, onBlur: onBlur, placeholder: viewData }),
                React.createElement("span", null, viewData),
                showSearch && show ?
                    React.createElement("i", { className: `${perfixCls}-isearch` }, SearchIcon) :
                    React.createElement("i", { className: show ? `${perfixCls}-iup` : '' }, ArrowIcon)),
            React.createElement("div", { className: dropCls }, show && renderChildren))));
};
Select.defaultProps = {
    perfixCls: `${config_1.prefix}-select`,
    showSearch: false
};
Select.Option = option_1.default;
exports.default = Select;
