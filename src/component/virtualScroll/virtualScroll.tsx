import React, {FC, useEffect, useRef, useState} from "react";
import {prefix} from "../config";
import cls from 'luban-class';
import {debounce} from "../utils";
import './style.less'

type Props = {
    render: (item) => React.ReactNode
    perfixCls?: string
    list: any[]
    height: number
    rowHeight: number
    className?: string
}
const VirtualScroll: FC<Props> = ({className, render, height, rowHeight, list, perfixCls}) => {

    const [[_list, passedIndex], setList] = useState<any[]>([[], 0])
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scroll = debounce(() => {
            const scroll: number = ref.current!.scrollTop;
            const passedIndex = Math.floor(scroll / rowHeight);
            const passingIndex = Math.ceil((scroll + height) / rowHeight);
            const _list = list.slice(passedIndex, passingIndex + 1);
            setList([_list, passedIndex])
        }, 50)
        scroll()
        ref.current!.addEventListener('scroll', scroll)
        return () => {
            ref.current?.removeEventListener('scroll', scroll)
        }
    }, [ref.current, list.length, height, rowHeight])

    return (

        <div ref={ref} style={{height: height + 'px'}}
             className={cls(perfixCls, {
                 [`${className}`]: !!className
             })}>
            <ul style={{height: rowHeight * list.length + 'px'}}>
                {
                    _list.map((item, index) => <li
                            key={index}
                            className={`${perfixCls}-item`}
                            style={{top: (passedIndex + index) * rowHeight + 'px'}}>
                            {render(item)}
                        </li>
                    )
                }
            </ul>

        </div>
    )
}

VirtualScroll.defaultProps = {
    perfixCls: `${prefix}-virtual-scroll`,
}

export default VirtualScroll
