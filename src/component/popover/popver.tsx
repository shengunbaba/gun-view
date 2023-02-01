import React, {useState} from 'react';
import {prefix} from "../config";
import cls from 'luban-class'
import ReactDom from 'react-dom'
import useClickAway from '../hooks/useClickAway'
import './style.less'

const Popover = ({children, className = '', perfixCls, placement = 'topLeft', content}) => {

    const [style, setStyle] = useState<null | object>(null)

    const ref = useClickAway(() => {
        setStyle(null)
    })

    const classNames = cls(perfixCls, {
        [`${className}`]: className,
        [`${perfixCls}-top`]: placement === 'top',
        [`${perfixCls}-topleft`]: placement === 'topLeft',
        [`${perfixCls}-topright`]: placement === 'topRight',
    })

    const ele = React.Children.only(children);
    const getStyle = (target) => {
        const rect = target.getBoundingClientRect();
        const w = rect.width;
        const t = rect.top;
        const l = rect.left;

        let style = {};

        const bottom = window.innerHeight - t + 10
        if (placement == 'top') {
            style = {bottom, left: l + w / 2};
        }

        if (placement == 'topLeft') {
            style = {bottom, left: l};
        }

        if (placement == 'topRight') {
            const right = window.innerWidth - l - w;
            style = {bottom, right};
        }
        return style;
    };


    const onClick = (e) => {
        const current = e.currentTarget;
        setStyle(getStyle(current))
    }

    return (
        <>
            {React.cloneElement(ele, {onClick, ref})}
            {
                style && ReactDom.createPortal(<div style={style} className={classNames}>{content}</div>, document.body)
            }
        </>
    )
}

Popover.defaultProps = {
    perfixCls: `${prefix}-popover`
}
export default Popover


