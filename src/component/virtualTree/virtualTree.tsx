import * as React from 'react';
import './style.less'
import {prefix} from '../config'
import cls from 'luban-class'
import Icon from "./icon";
import Checkbox from "../checkbox/checkbox";

interface Props {
    className?: string
    perfixCls?: string
    data: any[]
    expendKeys: string[]
    checkedKeys: string[]
    onCheck: Function
    onExpend: Function
    height: number
}


/**
 *  1--虚拟滚动首先把多层级数据转化为单层级数组, 再进行渲染
 *  2--每个新item数据格式: { title,  id,  parentId,  leval , leaf, expend, checked, half}
 *  3-- parentId = -1-root  为根节点
 *
 */

class Vtree extends React.Component<Props, any> {

    state = {
        anewData: [],
        top: 0
    }

    halfRef: string[] = []
    div: HTMLDivElement | null = null
    offsite: number = 0
    each: number = 31


    componentDidMount(): void {
        const {data, expendKeys, checkedKeys} = this.props
        this.updateData(data, expendKeys, checkedKeys)
        this.div && this.div.addEventListener('scroll', this.listener)
    }

    listener = (e) => {
        const scrollTop = e.target.scrollTop
        if (Math.abs(scrollTop - this.offsite) >= this.each) {
            this.offsite = scrollTop
            this.setState({
                top: scrollTop
            })
        }
    }

    componentWillUnmount(): void {
        this.div && this.div.removeEventListener('scroll', this.listener)
    }

    updateData = (data, expendKeys, checkedKeys) => {

        const newData: any = [];
        this.halfRef = [...new Set(this.halfRef)]

        const resetData = (data, id, leval) => {
            for (const item of data) {
                newData.push({
                    title: item.title,
                    id: item.id,
                    parentId: id,
                    leval,
                    leaf: !item.children,
                    expend: expendKeys.includes(item.id),
                    checked: checkedKeys.includes(item.id),
                    half: this.halfRef.includes(item.id),
                    disabled: item.disabled
                })
                if (item.children) {
                    resetData(item.children, item.id, leval + 1)
                }
            }
        }

        //  外部props改变， 重新生成单层级数组
        resetData(data, '-1-root', 1);

        // 监听 expendKeys, checkedKeys 的改变
        this.getAnewData(newData, expendKeys, checkedKeys)
    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        const {expendKeys, checkedKeys, data} = nextProps
        if (this.props.data != data || this.props.expendKeys != expendKeys || this.props.checkedKeys != checkedKeys) {
            this.updateData(data, expendKeys, checkedKeys)
        }


    }

    getAnewData = (data, expendKeys, checkedKeys) => {
        if (!data || data && data.length == 0) {  // 没数据
            this.setState({
                anewData: []
            })
            return;
        }
        const root: any[] = data.filter(x => x.parentId == '-1-root');
        if (expendKeys.length == 0) {
            this.setState({
                anewData: root
            })
            return;
        }

        function getParentId(path, key) {
            const parent = data.find(y => y.id == key);
            if (parent && parent.parentId !== '-1-root') {
                path.unshift(parent.parentId)
                getParentId(path, parent.parentId)
            }
        }

        if (expendKeys.length > 0) {           // 只有当前节点到最外层路径上所有的节点都展开才需要渲染
            const pathAll: string[][] = expendKeys.map(key => {   // 找出每个expendKey， 到最外层节点的路径
                const path = [key]
                getParentId(path, key)
                return path
            })

            const whole: string[][] = pathAll.filter(path => path.every(key => expendKeys.includes(key)))  // 找出在expendKeys里面都有的完整路径
            let wholeKey: string[] = whole.reduce((a, b) => {
                return a.concat(b)
            }, root)
            wholeKey = [...new Set(wholeKey)];
            const need: any[] = data.filter(item => wholeKey.find(x => item.parentId == x || item.parentId == '-1-root'));
            this.setState({
                anewData: need
            })

        }
    }
    _onExpend = (id, preStatus, e) => {    // 改变外部expendKeys

        const {onExpend, expendKeys} = this.props
        if (preStatus) {
            const _expendKeys = expendKeys.filter(x => x !== id);
            onExpend([..._expendKeys], {id, expend: !preStatus}, e)
        } else {
            expendKeys.push(id)
            onExpend([...expendKeys], {id, expend: !preStatus}, e)
        }
    }

    getChildKeys = (data, childs) => {
        for (const item of data) {
            if (!item.disabled) {
                childs.push(item.id)
            }
            if (item.children) {
                this.getChildKeys(item.children, childs)
            }
        }
    }

    getFatherKeys = (arr, curKey, fathers, childs, targetKey) => {  // 查找所有父节点
        const {data} = this.props
        for (const item of arr) {
            if (item.id == targetKey) {
                if (item.children) {
                    this.getChildKeys(item.children, childs)
                }
            }

            if (item.id != curKey && item.children) {
                const result = this.getFatherKeys(item.children, curKey, fathers, childs, targetKey)
                if (result) {
                    this.getFatherKeys(data, item.id, fathers, childs, targetKey)
                    break
                }
            }
            if (item.id == curKey) {
                item.id !== targetKey && fathers.push(item);
                return 1;
                break
            }
        }
    }

    _onCheck = (checked, id, e, type) => {      // 改变外部checkedKeys

        if (type === 'disabled') {
            return
        }

        const {checkedKeys, onCheck, data} = this.props
        const fathers: any[] = [];
        const childs: string[] = [id];
        this.getFatherKeys(data, id, fathers, childs, id)   // 此处用原始tree结构数据遍历， 减少遍历次数

        const f = (keys, checked) => {
            const nodesMapFather = fathers.map(item => {  // 判断每个父节点上的所有子节点， 是否都checked
                let nodes = []
                this.getChildKeys([item], nodes);
                nodes = nodes.filter(x => x !== item.id && !item.disabled);
                return {
                    fatherId: item.id,
                    childrens: nodes
                }
            })

            for (const item of nodesMapFather) {
                const ifallCheck = item.childrens.every(x => keys.includes(x))
                if (ifallCheck) {
                    keys.push(item.fatherId)
                    this.halfRef = this.halfRef.filter(x => x !== item.fatherId)
                } else {
                    const ifHasOneChild = item.childrens.some(x => keys.includes(x));
                    if (ifHasOneChild) {
                        this.halfRef.push(item.fatherId)
                    } else {
                        this.halfRef = this.halfRef.filter(x => x != item.fatherId)
                    }
                    keys = keys.filter(x => x !== item.fatherId)
                }
            }

            if (fathers.length == 0) {
                this.halfRef = this.halfRef.filter(x => !childs.includes(x))
            }
            return keys
        }


        if (checked) {
            checkedKeys.push(...childs)
            const keys = f(checkedKeys, checked)
            this.halfRef = this.halfRef.filter(x => x !== id);
            onCheck([...new Set(keys)], {id, checked}, e)
        } else {
            const fathersId: string[] = fathers.map(x => x.id);
            this.halfRef.push(...fathersId)
            const _checkedKeys = checkedKeys.filter(x => !childs.includes(x));
            const keys = f(_checkedKeys, checked)
            onCheck([...new Set(keys)], {id, checked}, e)
        }

    }

    render() {
        const {perfixCls = `${prefix}-tree`, className, height} = this.props

        const {top, anewData} = this.state
        const clsTree = cls(perfixCls, `${prefix}-scrollbar`, {[`${className}`]: className});
        const renderData = (() => {
            const hideLen = Math.floor(top / this.each);  // 滚动了多少个；
            const needLen = Math.ceil(height / this.each); // 需要多少个；
            return anewData.slice(hideLen, hideLen + needLen)
        })()

        const HEIGHT = (anewData.length + 1) * this.each + 100;

        return (
            <div className={clsTree} style={{height: height + 30}} ref={e => this.div = e}>
                <div className={`${perfixCls}-scroll`} style={{height: HEIGHT}}>
                    <ul style={{height: height + 30, top}}>
                        {
                            renderData.length > 0 && renderData.map((item: any) => {
                                return (
                                    <li
                                        style={{paddingLeft: item.leaf ? item.leval * 24 + 30 + 'px' : item.leval * 24 + 'px'}}
                                        key={item.id}
                                    >
                                        {
                                            !item.leaf &&
                                            <i onClick={(e) => this._onExpend(item.id, item.expend, e)}
                                               className={cls({
                                                   [`${perfixCls}-expend-arrow`]: item.expend
                                               })}>{Icon}</i>
                                        }
                                        <Checkbox id={item.id} halfcheck={item.half}
                                                  onChange={this._onCheck}
                                                  disabled={item.disabled}
                                                  checked={item.checked}>{item.title}</Checkbox>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
        )
    }
}

export default Vtree;
