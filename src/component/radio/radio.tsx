import * as React from 'react';
import './style.less'
import {prefix} from '../config'
import cls from 'luban-class';

interface Props {
    className?: string
    onChange?: Function
    perfixCls?: string
    checked?: boolean
    children?: React.ReactElement | any
    id?: string
}

const Radio: React.FC<Props> = ({children, ...props}) => {

    const {className, perfixCls, checked, onChange, id} = props

    const [inputCheck, setInputCheck] = React.useState<boolean>(!!checked)

    React.useEffect(() => {
        setInputCheck(!!checked)
    }, [checked])

    const onCheck = (e) => {
        setInputCheck(!inputCheck)
        onChange && onChange(!inputCheck, id, e)
    }

    const clsBox = cls(perfixCls, {
        [`${className}`]: className,
    })

    const clsInput = cls(`${perfixCls}-input`, {
        [`${perfixCls}-checked`]: inputCheck
    })

    return (
        <div className={clsBox}
             onClick={onCheck}>
            <span className={clsInput}/>
            {
                children && <span className={`${perfixCls}-content`}>{children}</span>
            }
        </div>
    )
}

Radio.defaultProps = {
    perfixCls: `${prefix}-radio`,
    checked: false
}

export default React.memo(Radio);
