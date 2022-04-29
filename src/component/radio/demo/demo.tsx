import * as React from 'react'
import {Radio} from 'gun-view';
import './demo.less'


const Demo = () => {

    const [check] = React.useState(false)
    const onChange = (status, id, e) => {
        console.log(status, id, e)
    }

    return (
        <Radio checked={check} onChange={onChange} id='uuid'>Radio</Radio>

    )
}

export default Demo;
