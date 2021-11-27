import * as ReactDom from "react-dom";
import * as React from "react";
import cls from "luban-class";

const Portal = (props) => {

    const {className = '', perfixCls, placement = 'top', target, div} = props;

    const getStyle = (target) => {
        const rect = target.getBoundingClientRect();
        const w = rect.width;
        const t = rect.top;
        const b = rect.bottom;
        const l = rect.left;
        const h = rect.height;

        let style = {};
        if (placement == 'top') {
            style = {top: t - 30, left: l + w / 2};
        }
        if (placement == 'bottom') {
            style = {top: b + 8, left: l + w / 2};
        }

        if (placement == 'left') {
            style = {top: t + h / 2, left: l - 12};
        }

        if (placement == 'right') {
            style = {top: t + h / 2, left: l + w + 12};
        }

        return style;
    };

    const style = getStyle(target);

    const _cls = cls(perfixCls, {
        [className]: className,
        [`${perfixCls}-left`]: placement === 'left',
        [`${perfixCls}-right`]: placement === 'right',
        [`${perfixCls}-bottom`]: placement === 'bottom',
        [`${perfixCls}-top`]: placement === 'top'
    })

    return ReactDom.createPortal(<div className={_cls} style={style}>{props.content}</div>, div.current)
}


export default React.memo(Portal);
