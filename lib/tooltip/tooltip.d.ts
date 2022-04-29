import * as React from 'react';
import './style.less';
interface Props {
    content: React.ReactElement | string;
    children?: any;
    className?: string;
    perfixCls?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    destory?: boolean;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
