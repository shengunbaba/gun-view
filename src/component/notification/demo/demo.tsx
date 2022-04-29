import * as React from 'react'
import {Notification} from 'gun-view';
import './demo.less'

const Demo = () => {

    /**
     * duration = 0 ,  就不会自动关闭
     */
    const onSuccess = () => {
        new Notification({
            title: 'successsuccesssuccesssuccesssuccesssuccesssuccess',
            describe: 'successsuccesssuccesssuccesssuccesssuccesssuccess'
        }, 0).success()
    }

    const onWarn = () => {
        new Notification({
            title: 'warn',
            describe: 'warnwarnwarnwarnwarnwarnwarnwarnwarnwarnwarnwarnwarn'
        }).warn()
    }

    const onError = () => {
        new Notification({
            title: 'error',
            describe: 'errorerrorerrorerrorerrorerrorerrorerrorerrorerror'
        }).error()
    }

    const onOpen = () => {
        new Notification({
            title: 'open',
            describe: 'openopenopenopenopenopenopenopenopenopenopenopenopen'
        }).open()
    }

    return (
        <div className='message'>
            <h5>Notification</h5>
            <span onClick={onOpen}>open</span>
            <br/> <br/>
            <span onClick={onSuccess}>success</span>
            <br/> <br/>
            <span onClick={onWarn}>warn</span>
            <br/> <br/>
            <span onClick={onError}>error</span>
        </div>

    )
}

export default Demo;
