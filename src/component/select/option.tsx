import * as React from 'react';
import {CTX} from './utils';
import {prefix} from '../config'

interface Props {
    value: string
    className?: string
    prefixCls?: string
    children: React.ReactNode
}

const Option: React.FC<Props> = ({children, ...props}) => {

    const {value, prefixCls} = props;

    return (
        <CTX.Consumer>
            {
                (context: any) => {
                    const {_onChange, _active} = context;
                    return (
                        <div className={_active === value ? `${prefixCls}-active` : ''}
                             key={value} onMouseDown={(e) => _onChange(value, e)}>{children}</div>
                    )
                }
            }
        </CTX.Consumer>
    )
}

Option.defaultProps = {
    prefixCls: `${prefix}-select-option`
}

export default React.memo(Option);
