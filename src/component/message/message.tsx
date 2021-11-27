import * as React from "react";
import './style.less'
import {prefix} from '../config'
import * as Icons from "./icon";
import {render} from "react-dom";
import './style.less'

const {Warn, Success, Error} = Icons

class Message {
    msg: string
    duration?: number
    perfixCls: string
    div: HTMLElement
    wrap: HTMLElement

    constructor(msg, duration = 2.6) {
        this.msg = msg;
        this.duration = duration * 1000;
        this.perfixCls = `${prefix}-message`
        this.div = document.createElement('div');
        this.div.classList.add(`${this.perfixCls}-item`);
        let wrap: HTMLElement | null = document.querySelector(`.${this.perfixCls}`)
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.classList.add(this.perfixCls)
            document.body.appendChild(wrap)
        }
        wrap.appendChild(this.div)
        this.wrap = wrap;
    }

    timer() {
        const t = setTimeout(() => {
            (this.div.parentNode as HTMLElement).removeChild(this.div);
            if (this.wrap && this.wrap.childElementCount === 0) {
                (this.wrap.parentNode as HTMLElement).removeChild(this.wrap)
            }
            clearTimeout(t)
        }, this.duration as number)
    }

    render(type, icon) {
        render(
            <div className={`${this.perfixCls}-${type}`}>
                {icon} <span>{this.msg}</span>
            </div>, this.div
        )
        this.timer()
    }

    success() {
        this.render('success', Success)
    }

    warn() {
        this.render('warn', Warn)
    }

    error() {
        this.render('error', Error)
    }

    common() {
        this.render('common', null)
    }

}

export default Message;
