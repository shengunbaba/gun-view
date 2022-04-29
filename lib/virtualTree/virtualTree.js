"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./style.less");
const config_1 = require("../config");
const luban_class_1 = require("luban-class");
const icon_1 = require("./icon");
const checkbox_1 = require("../checkbox/checkbox");
/**
 *  1--虚拟滚动首先把多层级数据转化为单层级数组, 再进行渲染
 *  2--每个新item数据格式: { title,  id,  parentId,  leval , leaf, expend, checked, half}
 *  3-- parentId = -1-root  为根节点
 *
 */
class Vtree extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            anewData: [],
            top: 0
        };
        this.halfRef = [];
        this.div = null;
        this.offsite = 0;
        this.each = 31;
        this.listener = (e) => {
            const scrollTop = e.target.scrollTop;
            if (Math.abs(scrollTop - this.offsite) >= this.each) {
                this.offsite = scrollTop;
                this.setState({
                    top: scrollTop
                });
            }
        };
        this.updateData = (data, expendKeys, checkedKeys) => {
            const newData = [];
            this.halfRef = [...new Set(this.halfRef)];
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
                    });
                    if (item.children) {
                        resetData(item.children, item.id, leval + 1);
                    }
                }
            };
            //  外部props改变， 重新生成单层级数组
            resetData(data, '-1-root', 1);
            // 监听 expendKeys, checkedKeys 的改变
            this.getAnewData(newData, expendKeys, checkedKeys);
        };
        this.getAnewData = (data, expendKeys, checkedKeys) => {
            if (!data || data && data.length == 0) { // 没数据
                this.setState({
                    anewData: []
                });
                return;
            }
            const root = data.filter(x => x.parentId == '-1-root');
            if (expendKeys.length == 0) {
                this.setState({
                    anewData: root
                });
                return;
            }
            function getParentId(path, key) {
                const parent = data.find(y => y.id == key);
                if (parent && parent.parentId !== '-1-root') {
                    path.unshift(parent.parentId);
                    getParentId(path, parent.parentId);
                }
            }
            if (expendKeys.length > 0) { // 只有当前节点到最外层路径上所有的节点都展开才需要渲染
                const pathAll = expendKeys.map(key => {
                    const path = [key];
                    getParentId(path, key);
                    return path;
                });
                const whole = pathAll.filter(path => path.every(key => expendKeys.includes(key))); // 找出在expendKeys里面都有的完整路径
                let wholeKey = whole.reduce((a, b) => {
                    return a.concat(b);
                }, root);
                wholeKey = [...new Set(wholeKey)];
                const need = data.filter(item => wholeKey.find(x => item.parentId == x || item.parentId == '-1-root'));
                this.setState({
                    anewData: need
                });
            }
        };
        this._onExpend = (id, preStatus, e) => {
            const { onExpend, expendKeys } = this.props;
            if (preStatus) {
                const _expendKeys = expendKeys.filter(x => x !== id);
                onExpend([..._expendKeys], { id, expend: !preStatus }, e);
            }
            else {
                expendKeys.push(id);
                onExpend([...expendKeys], { id, expend: !preStatus }, e);
            }
        };
        this.getChildKeys = (data, childs) => {
            for (const item of data) {
                if (!item.disabled) {
                    childs.push(item.id);
                }
                if (item.children) {
                    this.getChildKeys(item.children, childs);
                }
            }
        };
        this.getFatherKeys = (arr, curKey, fathers, childs, targetKey) => {
            const { data } = this.props;
            for (const item of arr) {
                if (item.id == targetKey) {
                    if (item.children) {
                        this.getChildKeys(item.children, childs);
                    }
                }
                if (item.id != curKey && item.children) {
                    const result = this.getFatherKeys(item.children, curKey, fathers, childs, targetKey);
                    if (result) {
                        this.getFatherKeys(data, item.id, fathers, childs, targetKey);
                        break;
                    }
                }
                if (item.id == curKey) {
                    item.id !== targetKey && fathers.push(item);
                    return 1;
                    break;
                }
            }
        };
        this._onCheck = (checked, id, e, type) => {
            if (type === 'disabled') {
                return;
            }
            const { checkedKeys, onCheck, data } = this.props;
            const fathers = [];
            const childs = [id];
            this.getFatherKeys(data, id, fathers, childs, id); // 此处用原始tree结构数据遍历， 减少遍历次数
            const f = (keys, checked) => {
                const nodesMapFather = fathers.map(item => {
                    let nodes = [];
                    this.getChildKeys([item], nodes);
                    nodes = nodes.filter(x => x !== item.id && !item.disabled);
                    return {
                        fatherId: item.id,
                        childrens: nodes
                    };
                });
                for (const item of nodesMapFather) {
                    const ifallCheck = item.childrens.every(x => keys.includes(x));
                    if (ifallCheck) {
                        keys.push(item.fatherId);
                        this.halfRef = this.halfRef.filter(x => x !== item.fatherId);
                    }
                    else {
                        const ifHasOneChild = item.childrens.some(x => keys.includes(x));
                        if (ifHasOneChild) {
                            this.halfRef.push(item.fatherId);
                        }
                        else {
                            this.halfRef = this.halfRef.filter(x => x != item.fatherId);
                        }
                        keys = keys.filter(x => x !== item.fatherId);
                    }
                }
                if (fathers.length == 0) {
                    this.halfRef = this.halfRef.filter(x => !childs.includes(x));
                }
                return keys;
            };
            if (checked) {
                checkedKeys.push(...childs);
                const keys = f(checkedKeys, checked);
                this.halfRef = this.halfRef.filter(x => x !== id);
                onCheck([...new Set(keys)], { id, checked }, e);
            }
            else {
                const fathersId = fathers.map(x => x.id);
                this.halfRef.push(...fathersId);
                const _checkedKeys = checkedKeys.filter(x => !childs.includes(x));
                const keys = f(_checkedKeys, checked);
                onCheck([...new Set(keys)], { id, checked }, e);
            }
        };
    }
    componentDidMount() {
        const { data, expendKeys, checkedKeys } = this.props;
        this.updateData(data, expendKeys, checkedKeys);
        this.div && this.div.addEventListener('scroll', this.listener);
    }
    componentWillUnmount() {
        this.div && this.div.removeEventListener('scroll', this.listener);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const { expendKeys, checkedKeys, data } = nextProps;
        if (this.props.data != data || this.props.expendKeys != expendKeys || this.props.checkedKeys != checkedKeys) {
            this.updateData(data, expendKeys, checkedKeys);
        }
    }
    render() {
        const { perfixCls = `${config_1.prefix}-tree`, className, height } = this.props;
        const { top, anewData } = this.state;
        const clsTree = (0, luban_class_1.default)(perfixCls, `${config_1.prefix}-scrollbar`, { [`${className}`]: className });
        const renderData = (() => {
            const hideLen = Math.floor(top / this.each); // 滚动了多少个；
            const needLen = Math.ceil(height / this.each); // 需要多少个；
            return anewData.slice(hideLen, hideLen + needLen);
        })();
        const HEIGHT = (anewData.length + 1) * this.each + 100;
        return (React.createElement("div", { className: clsTree, style: { height: height + 30 }, ref: e => this.div = e },
            React.createElement("div", { className: `${perfixCls}-scroll`, style: { height: HEIGHT } },
                React.createElement("ul", { style: { height: height + 30, top } }, renderData.length > 0 && renderData.map((item) => {
                    return (React.createElement("li", { style: { paddingLeft: item.leaf ? item.leval * 24 + 30 + 'px' : item.leval * 24 + 'px' }, key: item.id },
                        !item.leaf &&
                            React.createElement("i", { onClick: (e) => this._onExpend(item.id, item.expend, e), className: (0, luban_class_1.default)({
                                    [`${perfixCls}-expend-arrow`]: item.expend
                                }) }, icon_1.default),
                        React.createElement(checkbox_1.default, { id: item.id, halfcheck: item.half, onChange: this._onCheck, disabled: item.disabled, checked: item.checked }, item.title)));
                })))));
    }
}
exports.default = Vtree;
