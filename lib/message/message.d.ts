import './style.less';
import './style.less';
declare class Message {
    msg: string;
    duration?: number;
    perfixCls: string;
    div: HTMLElement;
    wrap: HTMLElement;
    constructor(msg: any, duration?: number);
    timer(): void;
    render(type: any, icon: any): void;
    success(): void;
    warn(): void;
    error(): void;
    common(): void;
}
export default Message;
