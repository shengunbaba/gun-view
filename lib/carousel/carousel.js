"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const luban_class_1 = require("luban-class");
require("./style.less");
const config_1 = require("../config");
/**
 *
 * 当activeIndex = length 的时候， 滚动队列 push(firstChild)， 在滚动停止时， 立刻将activeIndex 置为0；
 */
const Carousel = (props) => {
    const { className, style, effect, mouseEnterStopRoll, clsPrefix, children } = props;
    const [activeIndex, setActiveIndex] = React.useState(0);
    const timer = React.useRef(null);
    const _activeIndex = React.useRef(activeIndex);
    const length = children.length;
    const firstChild = children[0];
    const _children = [...children];
    React.useEffect(() => {
        setTimer();
        return () => clearInterval(timer.current);
    }, []);
    const setTimer = () => {
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            let _index = _activeIndex.current + 1;
            setActiveIndex(_index);
            if (_index === length) {
                const t = setTimeout(() => {
                    setActiveIndex(0);
                    clearTimeout(t);
                }, 1200);
            }
        }, 6000);
    };
    React.useEffect(() => {
        _activeIndex.current = activeIndex;
    }, [activeIndex]);
    if (activeIndex === length) {
        _children.push(firstChild);
    }
    const cls1 = (0, luban_class_1.default)(`${clsPrefix}`, {
        [`${className}`]: className,
        [`${clsPrefix}-scrollx`]: effect === 'scrollx',
        // [`${clsPrefix}-fade`]: effect === 'fade'
    });
    const styleContent = {
        width: `${_children.length * 100}%`,
        left: activeIndex * -100 + '%',
    };
    const mouseEnter = () => {
        if (mouseEnterStopRoll) {
            clearInterval(timer.current);
        }
    };
    const mouseLeave = () => {
        if (mouseEnterStopRoll) {
            setTimer();
        }
    };
    return (React.createElement("div", { className: cls1, style: style, onMouseEnter: mouseEnter, onMouseLeave: mouseLeave },
        React.createElement("div", { className: (0, luban_class_1.default)(`${clsPrefix}-content`, {
                [`${clsPrefix}-content-reset`]: activeIndex === 0 && _activeIndex.current == length
            }), style: styleContent }, React.Children.map(_children, (child, index) => {
            return (React.createElement("div", { className: `${clsPrefix}-item`, "data-index": index, key: index }, child));
        })),
        length > 1 &&
            React.createElement("div", { className: `${clsPrefix}-tags` }, React.Children.map(children, (child, index) => {
                return (React.createElement("div", { "data-index": index, key: index, onClick: () => setActiveIndex(index), className: (0, luban_class_1.default)(`${clsPrefix}-tag`, {
                        [`${clsPrefix}-tag-active`]: activeIndex === index || activeIndex === length && index === 0
                    }) }));
            }))));
};
Carousel.defaultProps = {
    clsPrefix: `${config_1.prefix}-carousel`,
    mouseEnterStopRoll: true,
    effect: 'scrollx'
};
exports.default = Carousel;
