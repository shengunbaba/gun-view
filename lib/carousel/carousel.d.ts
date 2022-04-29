import * as React from "react";
import "./style.less";
interface Props {
    className?: string;
    style?: Object;
    effect?: 'scrollx';
    clsPrefix?: string;
    children: any;
    mouseEnterStopRoll?: boolean;
}
/**
 *
 * 当activeIndex = length 的时候， 滚动队列 push(firstChild)， 在滚动停止时， 立刻将activeIndex 置为0；
 */
declare const Carousel: React.FC<Props>;
export default Carousel;
