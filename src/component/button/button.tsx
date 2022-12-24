import * as React from 'react';
import './style.less'
import Icon from "./icon";
import cls from 'luban-class'
import {prefix} from "../config";

interface Props {
    className?: string
    loading?: boolean
    onClick?: Function
    perfixCls?: string
}

const Button: React.FC<Props> = ({children, ...props}) => {

    const {className, loading, onClick, perfixCls} = props;

    const onClickChange = (e) => {
        if (loading) {
            return
        }
        onClick && onClick(e)
    }

    const clsButton = cls(perfixCls, {
        [`${perfixCls}-loading`]: loading,
        [`${className}`]: className
    })

    return (
        <button className={clsButton} onClick={onClickChange}>
            {
                loading && <i>{Icon}</i>
            }
            <span>{children}</span>
        </button>
    )
}

Button.defaultProps = {
    perfixCls: `${prefix}-button`,
}

export default Button;
