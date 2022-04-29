import * as React from 'react';
import './style.less';
interface Props {
    className?: string;
    perfixCls?: string;
    data: any[];
    expendKeys: string[];
    checkedKeys: string[];
    onCheck: Function;
    onExpend: Function;
    height: number;
}
/**
 *  1--虚拟滚动首先把多层级数据转化为单层级数组, 再进行渲染
 *  2--每个新item数据格式: { title,  id,  parentId,  leval , leaf, expend, checked, half}
 *  3-- parentId = -1-root  为根节点
 *
 */
declare class Vtree extends React.Component<Props, any> {
    state: {
        anewData: never[];
        top: number;
    };
    halfRef: string[];
    div: HTMLDivElement | null;
    offsite: number;
    each: number;
    componentDidMount(): void;
    listener: (e: any) => void;
    componentWillUnmount(): void;
    updateData: (data: any, expendKeys: any, checkedKeys: any) => void;
    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void;
    getAnewData: (data: any, expendKeys: any, checkedKeys: any) => void;
    _onExpend: (id: any, preStatus: any, e: any) => void;
    getChildKeys: (data: any, childs: any) => void;
    getFatherKeys: (arr: any, curKey: any, fathers: any, childs: any, targetKey: any) => 1 | undefined;
    _onCheck: (checked: any, id: any, e: any, type: any) => void;
    render(): JSX.Element;
}
export default Vtree;
