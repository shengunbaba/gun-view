import * as React from 'react'
import {Radio} from 'gun-view';
import './demo.less'


const Demo = () => {

    const [check] = React.useState(false)
    const onChange = (e) => {
        console.log(e)
    }

    return (
        <Radio checked={check} onChange={onChange}>Radio</Radio>

    )
}

export default Demo;
