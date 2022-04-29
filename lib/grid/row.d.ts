import * as React from "react";
import './style.less';
interface Props {
    gutter?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
    } | Array<number> | number;
    align?: 'middle' | 'top' | 'bottom';
    justify?: 'start' | 'end' | 'center' | 'around' | 'between';
    className?: string;
    id?: string;
    clsPrefix?: string;
}
declare const Row: React.FC<Props>;
export default Row;
