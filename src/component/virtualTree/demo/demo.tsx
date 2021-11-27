import * as React from 'react'
import {VirtualTree} from 'luban-view';
import './demo.less'
import {treeData} from './standardData.js'


/**
 * 如果外部控制checkedKeys， 可以调用Vtree的 _onCheck 方法
 *
 */
const Demo = () => {

    const [data] = React.useState<any[]>(treeData)
    const [expendKeys, setExpendKeys] = React.useState<string[]>(['root'])
    /**
     * checkedKeys 初始值为[], 如果有值的话， 父子节点的初始状态会不一致。
     */
    const [checkedKeys, setCheckedKeys] = React.useState<string[]>([])

    const onExpend = (expendKeys, current, e) => {
        console.log(expendKeys, current);
        setExpendKeys(expendKeys)
    }

    const onCheck = (checkedKeys, current, e) => {
        console.log(checkedKeys, current);
        setCheckedKeys(checkedKeys)
    }

    return (
        <VirtualTree
            data={data}
            expendKeys={expendKeys}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            onExpend={onExpend}
            height={260}
        />
    )
}

export default Demo;
