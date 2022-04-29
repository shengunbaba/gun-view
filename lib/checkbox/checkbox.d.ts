import * as React from 'react';
import './style.less';
interface Props {
    className?: string;
    onChange?: Function;
    perfixCls?: string;
    checked?: boolean;
    halfcheck?: boolean;
    children?: React.ReactElement | any;
    id?: string;
    disabled?: boolean;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
