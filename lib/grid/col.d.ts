import * as React from "react";
interface Props {
    span?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    className?: string;
    onClick?: Function;
    clsPrefix?: string;
}
declare const Col: React.FC<Props>;
export default Col;
