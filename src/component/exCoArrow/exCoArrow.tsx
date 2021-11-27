import * as React from 'react';
import './style.less'
import cls from 'luban-class'
import {prefix} from "../config";


interface Props {
    className?: string
    color?: string
    perfixCls?: string
    downward: boolean
    onChange?: Function
}

const ExCoArrow: React.FC<Props> = ({...props}) => {

    const {className = '', onChange, color, downward, perfixCls} = props

    const clsName = cls(perfixCls, {
        [`${perfixCls}-down`]: downward,
        [`${className}`]: className
    })

    const onArrowChange = (e) => {
        onChange && onChange(e)
    }

    return (
        <div className={clsName} onClick={onArrowChange}>
            <span className={`${perfixCls}-left`} style={{background: color}}></span>
            <span className={`${perfixCls}-right`} style={{background: color}}></span>
        </div>
    )
}

ExCoArrow.defaultProps = {
    perfixCls: `${prefix}-ex-co-arrow`,
    color: '#666'
}
export default React.memo(ExCoArrow);
