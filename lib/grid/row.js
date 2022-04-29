"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const luban_class_1 = require("luban-class");
const util_1 = require("./util");
const config_1 = require("../config");
require("./style.less");
const Row = React.forwardRef(({ children, gutter, align, justify, className, id, clsPrefix }, ref) => {
    const clsRow = (0, luban_class_1.default)(`${clsPrefix}`, {
        [`${clsPrefix}-${align}`]: align,
        [`${clsPrefix}-${justify}`]: justify,
        [`${className}`]: className
    });
    return (React.createElement(util_1.CTX.Provider, { value: { gutter } },
        React.createElement("div", { className: clsRow, ref: ref, id: id }, children)));
});
Row.defaultProps = {
    clsPrefix: `${config_1.prefix}-row`,
    align: 'top',
    justify: 'start'
};
exports.default = Row;
