import * as React from "react";
interface DefaultProps {
    type: string;
    className?: string;
    onClick?: any;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    style?: any;
    ref?: any;
}
/**
 *
 * 约定： 在 src/component/icon 里面存放svg
 *
 */
declare const Icon: React.FC<DefaultProps>;
export default Icon;
