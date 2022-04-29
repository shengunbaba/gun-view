import * as React from 'react'
import {Select} from 'gun-view';
import './demo.less'

const Option = Select.Option

const Demo = () => {

    const onChange = (val, e) => {
        console.log(val, e)
    }

    return (
        <Select
            value='3'
            showSearch={true}
            onChange={onChange}>
            <Option value='1'>1select option 1</Option>
            <Option value='2'>2select option 2</Option>
            <Option value='3'>3select option 3</Option>
        </Select>
    )
}

export default Demo;
