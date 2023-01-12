import * as React from 'react'
import {Checkbox} from 'gun-view';
import './demo.less'


const Demo = () => {

    const [check, setCheck] = React.useState(true)

    const [check1, setCheck1] = React.useState(false)
    const onChange = (e) => {
        console.log(e)
        setCheck(!check)
    }

    return (
        <div>
            <Checkbox onChange={onChange} checked={check}>Checkbox</Checkbox>
            <br/>
            <Checkbox halfcheck={true} checked={check1} onChange={() => {
                setCheck1(!check1)
            }
            }>Checkbox</Checkbox>
            <br/>
            <Checkbox disabled={true} checked={true}>disable</Checkbox>
            <br/>
            <Checkbox disabled={true} checked={false}>disable</Checkbox>
        </div>

    )
}

export default Demo;
