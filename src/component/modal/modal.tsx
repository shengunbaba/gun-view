import * as React from 'react';
import './style.less';
import Icon from './icon'
import {prefix} from "../config";
import * as ReactDom from "react-dom";
import cls from 'luban-class'
import useDragAble from '../hooks/useDragAble.js'

interface Props {
    title?: string
    onCancel?: Function;
    onRight?: Function;
    onLeft?: Function
    left?: string
    right?: string
    className?: string
    perfixCls?: string
    dragAble?: boolean
}

const Modal: React.FC<Props> = ({...props}) => {
    const {children, title, onRight, onCancel, onLeft, right, left, className, perfixCls, dragAble} = props;
    const div = React.useRef<any>(document.createElement('div'));

    React.useEffect(() => {
        document.body.appendChild(div.current);
        return () => {
            document.body.removeChild(div.current);
        }
    }, [])

    const {targetRef, handleRef} = useDragAble(dragAble);

    const onLeftClick = (e) => {
        onLeft && onLeft(e)
    }
    const onRightClick = (e) => {
        onRight && onRight(e)
    }

    const onCancelClick = (e) => {
        onCancel && onCancel(e)
    }


    const classNames = cls(perfixCls, {
        [`${className}`]: className,
        [`${perfixCls}-nodrag`]: !dragAble,
        [`${perfixCls}-drag`]: dragAble,
    })

    return ReactDom.createPortal(
        <div className={classNames} ref={targetRef}>
            <div className={`${perfixCls}-core`}>
                {onCancel && <i onClick={onCancelClick}>{Icon}</i>}
                {
                    title &&
                    <p className={`${perfixCls}-title`} ref={handleRef}>{title}</p>
                }
                <div className={`${perfixCls}-content`}>
                    {children}
                </div>
                {
                    (left || right) && <div className={`${perfixCls}-btns`}>
                        {
                            left && <span onClick={onLeftClick} className={`${perfixCls}-left`}>{left}</span>
                        }
                        {
                            right && <span onClick={onRightClick} className={`${perfixCls}-right`}>{right}</span>
                        }
                    </div>
                }
            </div>
        </div>, div.current
    )
}

Modal.defaultProps = {
    perfixCls: `${prefix}-modal`
}

export default Modal;
