"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./style.less");
const config_1 = require("../config");
const luban_class_1 = require("luban-class");
const Speaker = (props) => {
    const phone = React.createElement("svg", { width: "1em", height: "1em", stroke: "currentColor", viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", null,
            React.createElement("path", { d: "M6.83114223,5.68701487 C7.25700774,5.25487309 7.29550946,4.58610538 6.90875405,4.11414316 L5.70944725,2.58102122 C5.32269184,2.06999824 4.58768273,1.99111704 4.08427494,2.38419805 C4.04577322,2.42394782 4.0072715,2.42394782 4.0072715,2.46307925 L2.96256257,3.52485731 C1.95691159,4.54697394 3.38835855,7.29901801 5.9806975,9.93313779 C8.5718197,12.5672399 11.2404668,13.9829852 12.2461178,13 L13.2908267,11.9381513 C13.7551939,11.4662597 13.7551939,10.7192291 13.2908267,10.2870874 L13.2138928,10.2082062 L11.704834,8.98928403 C11.2410752,8.59620302 10.5836779,8.63533445 10.1578819,9.06809456 L9.50046725,9.73686228 C8.80395986,9.30410217 8.18506429,8.83215762 7.64315478,8.28200321 C7.10178411,7.73123046 6.63809479,7.10221251 6.21222928,6.39429569 L6.83114223,5.68701487 Z", id: "Fill-1", fill: "none", strokeWidth: "0.8" })));
    const { perfixCls, className, leval = 3 } = props;
    return (React.createElement("div", { className: (0, luban_class_1.default)(perfixCls, {
            [`${className}`]: !!className
        }) },
        phone,
        React.createElement("div", { className: `${perfixCls}-leval` },
            leval == 3 && React.createElement("div", { className: `${perfixCls}-common ${perfixCls}-big` }),
            (leval == 3 || leval == 2) && React.createElement("div", { className: `${perfixCls}-common ${perfixCls}-middle` }),
            React.createElement("div", { className: `${perfixCls}-common ${perfixCls}-min` }))));
};
Speaker.defaultProps = {
    perfixCls: `${config_1.prefix}-speaker`,
};
exports.default = React.memo(Speaker);
