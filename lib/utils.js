"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.debounce = void 0;
const debounce = (fn, ms) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn(...args);
        }, ms);
    };
};
exports.debounce = debounce;
const throttle = (fn, ms) => {
    let exec = true;
    return function (...args) {
        if (exec) {
            fn(...args);
            exec = false;
            const t = setTimeout(() => {
                exec = true;
                clearTimeout(t);
            }, ms);
        }
    };
};
exports.throttle = throttle;
