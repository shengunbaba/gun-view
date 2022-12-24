import * as React from 'react';
import './style.less'
import {prefix} from "../config";
import Portal from "./portal";

interface Props {
    content: React.ReactElement | string
    children: React.ReactNode
    className?: string
    perfixCls?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    destroy?: boolean
}

const Tooltip: React.FC<Props> = ({children, ...props}) => {

    const [target, setTarget] = React.useState(null)
    const div: any = React.useRef(null);

    const {destroy = true} = props;

    const ele: any = React.Children.only(children);

    const onMouseEnter = (e) => {
        div.current = document.createElement('div');
        document.body.appendChild(div.current)
        const target = e.currentTarget;
        setTarget(target)
    }


    const onMouseLeave = (e) => {
        if (!destroy) {
            return
        }
        if (div.current && div.current.parentNode) {
            div.current.parentNode.removeChild(div.current);
            setTarget(null)
        }
    }

    return (
        <>
            {React.cloneElement(ele, {onMouseEnter, onMouseLeave})}
            {
                target && <Portal target={target} div={div}{...props}/>
            }
        </>
    )
}

Tooltip.defaultProps = {
    perfixCls: `${prefix}-tooltip`,
    placement: 'top',
    destroy: true
}
export default React.memo(Tooltip);
