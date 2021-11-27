import * as React from "react";
import {CTX} from "./util";
import cls from "luban-class";
import {prefix} from "../config";

interface Props {
    span?: number
    xs?: number  //屏幕 < 576px
    sm?: number  //屏幕 ≥ 576px
    md?: number  //屏幕 ≥ 768px
    lg?: number  //屏幕 ≥ 992px
    xl?: number  //屏幕 ≥ 1200px
    className?: string
    onClick?: Function
    clsPrefix?: string
}

const Col: React.FC<Props> = ({children, ...props}) => {

    const {gutter} = React.useContext(CTX);

    const {span, xs, sm, md, lg, xl, className, onClick, clsPrefix} = props;

    const style: any = {}
    if (gutter) {
        if (Object.prototype.toString.call(gutter) == '[object Array]') {
            Object.assign(style, {
                padding: `${gutter[0] / 2}px ${gutter[1] / 2}px`
            })
        }
        if (Object.prototype.toString.call(gutter) == '[object Object]') {

        }
        if (Object.prototype.toString.call(gutter) == '[object Number]') {
            Object.assign(style, {
                padding: `${gutter / 2}px`
            })
        }
    }

    const clsCol = cls(`${clsPrefix}`, {
        [`${clsPrefix}-xs-${xs}`]: xs && !span,
        [`${clsPrefix}-sm-${sm}`]: sm && !span,
        [`${clsPrefix}-md-${md}`]: md && !span,
        [`${clsPrefix}-lg-${lg}`]: lg && !span,
        [`${clsPrefix}-xl-${xl}`]: xl && !span,
        [`${clsPrefix}-span-${span}`]: span,
        [`${className}`]: !!className
    })

    const onClickEvent = () => {
        onClick && onClick()
    }
    return (
        <div className={clsCol} style={style} onClick={onClickEvent}>{children}</div>
    )
}
Col.defaultProps = {
    clsPrefix: `${prefix}-col`,
}
export default Col;
