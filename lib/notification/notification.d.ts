import './style.less';
import './style.less';
declare class Notification {
    msg: {
        title: string;
        describe?: string;
    };
    duration?: number;
    perfixCls: string;
    div: HTMLElement;
    mouseHasEnter: boolean;
    clickClose: boolean;
    now: number;
    wrap: HTMLElement | null;
    constructor(msg: any, duration?: number);
    timer(): void;
    mouseEnter(): void;
    mouseLeave(): void;
    onClose: () => void;
    render(type: any, icon: any): void;
    success(): void;
    warn(): void;
    error(): void;
    open(): void;
}
export default Notification;
