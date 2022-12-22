import * as React from 'react';
import './style.less'
import {prefix} from '../config'
import cls from 'luban-class';

interface Props {
    className?: string
    onChange?: Function
    perfixCls?: string
    checked?: boolean
    halfcheck?: boolean
    children?: React.ReactElement | any
    id?: string
    disabled?: boolean
}

const Checkbox: React.FC<Props> = ({children, ...props}) => {

    const {className, perfixCls, checked, onChange, id, halfcheck = false, disabled = false} = props;


    const onCheck = (e) => {
        if (disabled) {
            onChange && onChange(checked, id, e)
            return
        }
        onChange && onChange(!checked, id, e)
    }

    const clsBox = cls(perfixCls, {
        [`${className}`]: className,
        [`${perfixCls}-disabled`]: disabled
    })

    const clsInput = cls(`${perfixCls}-input`, {
        [`${perfixCls}-checked`]: checked,
        [`${perfixCls}-unchecked`]: !checked,
        [`${perfixCls}-halfcheck`]: halfcheck,
    })
    return (
        <div className={clsBox} onClick={onCheck}>
            <span className={clsInput}></span>
            {
                children && <div className={`${perfixCls}-content`}>{children}</div>
            }
        </div>
    )
}

Checkbox.defaultProps = {
    perfixCls: `${prefix}-checkbox`,
    checked: false,
    halfcheck: false,
    disabled: false
}

export default React.memo(Checkbox);
