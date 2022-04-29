import * as React from 'react'
import {Tooltip} from 'gun-view';
import './demo.less'

const Demo = () => {

    const [content, setContent] = React.useState <string>('tooltip')

    const onContentChange = () => {
        setContent(content.split('').reverse().join(''))
    }
    return (
        <>
            <Tooltip content={content} placement='top' destory={true}>
                <div className='demo' onClick={onContentChange}>
                    <span>tooltip-top</span>
                </div>
            </Tooltip>
            <Tooltip content={content} placement='bottom'>
                <div className='demo' onClick={onContentChange}>
                    <span>tooltip-bottom</span>
                </div>
            </Tooltip>
            <Tooltip content={content} placement='left'>
                <div className='demo' onClick={onContentChange}>
                    <span>tooltip-left</span>
                </div>
            </Tooltip>
            <Tooltip content={content} placement='right'>
                <div className='demo' onClick={onContentChange}>
                    <span>tooltip-right</span>
                </div>
            </Tooltip>
        </>

    )
}

export default Demo;
