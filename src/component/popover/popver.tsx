import React, {ReactNode, useState} from 'react';
import {prefix} from "../config";
import cls from 'luban-class'
import ReactDom from 'react-dom'
import useClickAway from '../hooks/useClickAway'
import './style.less'

interface Props {
    className?: string
    perfixCls?: string
    placement?: 'topLeft' | 'top' | 'topRight'
    content: ReactNode
    open?: boolean
}

const Popover: React.FC<Props> = ({
                                      children,
                                      className = '',
                                      perfixCls,
                                      placement = 'topLeft',
                                      content,
                                      open
                                  }) => {

    const [style, setStyle] = useState<null | object>(null)

    const ref = useClickAway(() => {

        // open 传值, 只通过open属性来控制隐藏
        open === undefined && setStyle(null)
    })

    const classNames = cls(perfixCls, {
        [`${className}`]: className,
        [`${perfixCls}-top`]: placement === 'top',
        [`${perfixCls}-topleft`]: placement === 'topLeft',
        [`${perfixCls}-topright`]: placement === 'topRight',
    })

    const ele: any = React.Children.only(children) as ReactNode;

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
                (open === undefined || open) && style &&
                ReactDom.createPortal(<div style={style}
                                           className={classNames}>{content}</div>, document.body)
            }
        </>
    )
}

Popover.defaultProps = {
    perfixCls: `${prefix}-popover`
}
export default Popover


