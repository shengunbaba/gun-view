import * as React from 'react'
import {Button} from 'luban-view';
import './demo.less'

const Demo = () => {
    const [loading, setLoading] = React.useState(false)

    const onclickChange = (e) => {
        console.log(e)
        setLoading(!loading)
    }

    return (
        <div>
            <h5>button</h5>
            <br/> <br/>
            <Button onClick={onclickChange} loading={loading} className='demo-button'>click</Button>
        </div>
    )
}

export default Demo;
