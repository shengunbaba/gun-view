import * as React from 'react'
import {Message} from 'luban-view';
import './demo.less'


const Demo = () => {


    const onSuccess = () => {
        new Message('afa').success()
    }

    const onWarn = () => {
        new Message('afa').warn()
    }

    const onError = () => {
        new Message('afa').error()
    }
    return (
        <div className='message'>
            <h5>Message</h5>
            <span onClick={onSuccess}>success</span>
            <br/> <br/>
            <span onClick={onWarn}>warn</span>
            <br/> <br/>
            <span onClick={onError}>error</span>
        </div>

    )
}

export default Demo;
