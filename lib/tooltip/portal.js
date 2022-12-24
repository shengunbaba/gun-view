"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactDom = require("react-dom");
const React = require("react");
const luban_class_1 = require("luban-class");
const Portal = (props) => {
    const { className = '', perfixCls, placement = 'top', target, div } = props;
    const getStyle = (target) => {
        const rect = target.getBoundingClientRect();
        const w = rect.width;
        const t = rect.top;
        const b = rect.bottom;
        const l = rect.left;
        const h = rect.height;
        let style = {};
        if (placement == 'top') {
            style = { top: t - 30, left: l + w / 2 };
        }
        if (placement == 'bottom') {
            style = { top: b + 8, left: l + w / 2 };
        }
        if (placement == 'left') {
            style = { top: t + h / 2, left: l - 12 };
        }
        if (placement == 'right') {
            style = { top: t + h / 2, left: l + w + 12 };
        }
        return style;
    };
    const style = getStyle(target);
    const _cls = (0, luban_class_1.default)(perfixCls, {
        [className]: className,
        [`${perfixCls}-left`]: placement === 'left',
        [`${perfixCls}-right`]: placement === 'right',
        [`${perfixCls}-bottom`]: placement === 'bottom',
        [`${perfixCls}-top`]: placement === 'top'
    });
    return ReactDom.createPortal(React.createElement("div", { className: _cls, style: style }, props.content), div.current);
};
exports.default = React.memo(Portal);
