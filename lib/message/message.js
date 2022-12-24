"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./style.less");
const config_1 = require("../config");
const Icons = require("./icon");
const react_dom_1 = require("react-dom");
require("./style.less");
const { Warn, Success, Error } = Icons;
class Message {
    constructor(msg, duration = 2.6) {
        this.msg = msg;
        this.duration = duration * 1000;
        this.perfixCls = `${config_1.prefix}-message`;
        this.div = document.createElement('div');
        this.div.classList.add(`${this.perfixCls}-item`);
        let wrap = document.querySelector(`.${this.perfixCls}`);
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.classList.add(this.perfixCls);
            document.body.appendChild(wrap);
        }
        wrap.appendChild(this.div);
        this.wrap = wrap;
    }
    timer() {
        const t = setTimeout(() => {
            this.div.parentNode.removeChild(this.div);
            if (this.wrap && this.wrap.childElementCount === 0) {
                this.wrap.parentNode.removeChild(this.wrap);
            }
            clearTimeout(t);
        }, this.duration);
    }
    render(type, icon) {
        (0, react_dom_1.render)(React.createElement("div", { className: `${this.perfixCls}-${type}` },
            icon,
            " ",
            React.createElement("span", null, this.msg)), this.div);
        this.timer();
    }
    success() {
        this.render('success', Success);
    }
    warn() {
        this.render('warn', Warn);
    }
    error() {
        this.render('error', Error);
    }
    common() {
        this.render('common', null);
    }
}
exports.default = Message;
