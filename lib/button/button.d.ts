import * as React from 'react';
import './style.less';
interface Props {
    className?: string;
    loading?: boolean;
    onClick?: Function;
    perfixCls?: string;
}
declare const Button: React.FC<Props>;
export default Button;
