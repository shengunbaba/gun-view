import * as React from 'react'
import {Clipboard} from 'luban-view';
import './demo.less'

const Demo = () => {

    const [count, setCount] = React.useState(0)
    const onChange = (e) => {
        console.log(e)
        setCount(count + 1)
    }
    return (
        <Clipboard copy={'点击我复制到剪贴板'} onChange={onChange}>
            <div>
                <div className='demo-clipboard'>点击我复制到剪贴板</div>
                <div>{`已复制${count}次，ctrl + v 粘贴`}</div>
            </div>
        </Clipboard>

    )
}

export default Demo;
