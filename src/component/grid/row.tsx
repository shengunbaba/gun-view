import * as React from "react";
import cls from 'luban-class'
import {CTX} from './util'
import {prefix} from "../config";
import './style.less';

interface Props {
    gutter?: { xs?: number, sm?: number, md?: number, lg?: number } | Array<number> | number
    align?: 'middle' | 'top' | 'bottom'
    justify?: 'start' | 'end' | 'center' | 'around' | 'between'
    className?: string
    id?: string
    clsPrefix?: string
    children: React.ReactNode
}

const Row: React.FC<Props> = React.forwardRef(({children, gutter, align, justify, className, id, clsPrefix}, ref: any) => {

    const clsRow = cls(`${clsPrefix}`, {
        [`${clsPrefix}-${align}`]: align,
        [`${clsPrefix}-${justify}`]: justify,
        [`${className}`]: className
    });

    return (
        <CTX.Provider value={{gutter}}>
            <div className={clsRow} ref={ref} id={id}>{children}</div>
        </CTX.Provider>
    )
})

Row.defaultProps = {
    clsPrefix: `${prefix}-row`,
    align: 'top',
    justify: 'start'
}
export default Row;
