import * as React from "react";
import {Carousel} from "luban-view";
import './style.less'

const Demo = () => {
    return (
        <Carousel className='carousel-demo' mouseEnterStopRoll={true}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </Carousel>
    )
}

export default Demo;
