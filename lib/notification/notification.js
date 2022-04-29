"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./style.less");
const config_1 = require("../config");
const Icons = require("./icon");
const react_dom_1 = require("react-dom");
require("./style.less");
const { Warn, Success, Error, Close } = Icons;
class Notification {
    constructor(msg, duration = 4.5) {
        this.onClose = () => {
            this.clickClose = true;
            this.duration = 1;
            this.timer();
        };
        this.msg = msg;
        this.mouseHasEnter = false;
        this.clickClose = false;
        this.now = Date.now();
        this.duration = duration * 1000;
        this.perfixCls = `${config_1.prefix}-notification`;
        // create element
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
        if (this.duration === 0) {
            return;
        }
        const t1 = setTimeout(() => {
            clearTimeout(t1);
            if (this.mouseHasEnter && !this.clickClose) {
                return;
            }
            this.div && this.div.classList.add(`${this.perfixCls}-hide`);
        }, this.duration);
        // t2定时器，消失的时候opacity渐变；
        const t2 = setTimeout(() => {
            clearTimeout(t2);
            if (this.mouseHasEnter && !this.clickClose) {
                return;
            }
            this.div && this.div.parentNode && this.div.parentNode.removeChild(this.div);
        }, this.duration + 300);
    }
    mouseEnter() {
        this.mouseHasEnter = true;
    }
    mouseLeave() {
        this.mouseHasEnter = false;
        if (this.duration != 0) {
            if (Date.now() - this.now >= this.duration) {
                this.duration = 300;
                this.timer();
            }
        }
    }
    render(type, icon) {
        (0, react_dom_1.render)(React.createElement("div", { className: `${this.perfixCls}-${type}`, onMouseEnter: this.mouseEnter.bind(this), onMouseLeave: this.mouseLeave.bind(this) },
            icon && React.createElement("i", { className: `${this.perfixCls}-tag` }, icon),
            React.createElement("div", { className: `${this.perfixCls}-text` },
                React.createElement("span", null, this.msg.title),
                this.msg.describe &&
                    React.createElement("span", null, this.msg.describe)),
            React.createElement("i", { className: `${this.perfixCls}-close`, onClick: this.onClose },
                " ",
                Close)), this.div);
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
    open() {
        this.render('open', null);
    }
}
exports.default = Notification;
