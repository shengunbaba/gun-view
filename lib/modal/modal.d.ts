import * as React from 'react';
import './style.less';
interface Props {
    title?: string;
    onCancel?: Function;
    onRight?: Function;
    onLeft?: Function;
    left?: string;
    right?: string;
    className?: string;
    perfixCls?: string;
    dragAble?: boolean;
}
declare const Modal: React.FC<Props>;
export default Modal;
