import * as React from 'react'
import {Checkbox} from 'gun-view';
import './demo.less'


const Demo = () => {

    const [check] = React.useState(true)
    const onChange = (status, id, e) => {
        console.log(status, id, e)
    }

    return (
        <div>
            <Checkbox onChange={onChange} checked={check} id='uuid'>Checkbox</Checkbox>
            <br/>
            <Checkbox halfcheck={true} onChange={onChange}>Checkbox</Checkbox>
            <br/>
            <Checkbox disabled={true} checked={true} onChange={onChange}>disable</Checkbox>
            <br/>
            <Checkbox disabled={true} checked={false} onChange={onChange}>disable</Checkbox>
        </div>

    )
}

export default Demo;
