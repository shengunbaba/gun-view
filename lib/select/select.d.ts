import * as React from 'react';
import Option from './option';
import './style.less';
interface Props {
    className?: string;
    value: string;
    onChange?: Function;
    perfixCls?: string;
    style?: any;
    showSearch?: boolean;
}
interface ExProps extends React.FC<Props> {
    Option: typeof Option;
}
declare const Select: ExProps;
export default Select;
