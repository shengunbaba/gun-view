import * as React from 'react'
import {Modal} from 'gun-view';
import './demo.less'

const Demo = () => {
    const [show, setShow] = React.useState(false)

    const onRight = (e) => {
    }

    const onCancel = (e) => {
        setShow(false)
    }

    const onLeft = (e) => {
        setShow(false)
    }

    const onShow = () => {
        setShow(true)
    }
    return (

        <div>
            <h5>Modal</h5>
            <br/> <br/>
            <button onClick={onShow}>modal-click</button>
            {
                show &&
                <Modal
                    dragAble={true}
                    title='title'
                    onRight={onRight}
                    right='Comfirm'
                    onCancel={onCancel}
                    onLeft={onLeft}
                    left='Cancel'
                >
                    <div>line line</div>
                    <div>line line line lineline line</div>
                    <div>....</div>
                </Modal>
            }

        </div>


    )
}

export default Demo;
