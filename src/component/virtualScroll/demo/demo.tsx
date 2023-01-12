import {VirtualScroll} from "gun-view";
import React from "react";
import './demo.less'

const Demo = () => {

    // 0 - 99
    const data = Array.from({length: 100}, (k, v) => v);

    return (
        <div className='demo-virtual-scroll' style={{height: '220px'}}>
            <VirtualScroll list={data}
                           height={220}
                           rowHeight={28}
                           render={(item) => {
                               return <>
                                   {item}
                               </>
                           }}
            />
        </div>

    )
}

export default Demo;
