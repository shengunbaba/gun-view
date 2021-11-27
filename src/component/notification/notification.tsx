import * as React from "react";
import './style.less'
import {prefix} from '../config'
import * as Icons from "./icon";
import {render} from "react-dom";
import './style.less'

const {Warn, Success, Error, Close} = Icons

class Notification {
    msg: {
        title: string
        describe?: string
    }
    duration?: number
    perfixCls: string
    div: HTMLElement
    mouseHasEnter: boolean
    clickClose: boolean
    now: number
    wrap: HTMLElement | null

    constructor(msg, duration = 4.5) {
        this.msg = msg;
        this.mouseHasEnter = false
        this.clickClose = false
        this.now = Date.now();
        this.duration = duration * 1000;
        this.perfixCls = `${prefix}-notification`
        // create element
        this.div = document.createElement('div');
        this.div.classList.add(`${this.perfixCls}-item`)
        let wrap: HTMLElement | null = document.querySelector(`.${this.perfixCls}`)
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.classList.add(this.perfixCls)
            document.body.appendChild(wrap)
        }
        wrap.appendChild(this.div);
        this.wrap = wrap;
    }

    timer() {
        if (this.duration === 0) {
            return
        }
        const t1 = setTimeout(() => {
            clearTimeout(t1);
            if (this.mouseHasEnter && !this.clickClose) {
                return
            }
            this.div && this.div.classList.add(`${this.perfixCls}-hide`)
        }, this.duration as number)

        // t2定时器，消失的时候opacity渐变；
        const t2 = setTimeout(() => {
            clearTimeout(t2);
            if (this.mouseHasEnter && !this.clickClose) {
                return
            }
            this.div && this.div.parentNode && (this.div.parentNode as HTMLElement).removeChild(this.div);
        }, this.duration as number + 300)
    }

    mouseEnter() {
        this.mouseHasEnter = true
    }

    mouseLeave() {
        this.mouseHasEnter = false
        if (this.duration != 0) {
            if (Date.now() - this.now >= (this.duration as number)) {
                this.duration = 300
                this.timer()
            }

        }
    }

    onClose = () => {
        this.clickClose = true
        this.duration = 1
        this.timer()
    }

    render(type, icon) {
        render(
            <div className={`${this.perfixCls}-${type}`}
                 onMouseEnter={this.mouseEnter.bind(this)}
                 onMouseLeave={this.mouseLeave.bind(this)}>
                {
                    icon && <i className={`${this.perfixCls}-tag`}>{icon}</i>
                }
                <div className={`${this.perfixCls}-text`}>
                    <span>{this.msg.title}</span>
                    {
                        this.msg.describe &&
                        <span>{this.msg.describe}</span>
                    }
                </div>
                <i className={`${this.perfixCls}-close`} onClick={this.onClose}> {Close}</i>
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

    open() {
        this.render('open', null)
    }

}

export default Notification;
