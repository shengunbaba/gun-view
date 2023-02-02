import {Popover} from 'gun-view';
import React from 'react';
import './style.less'

const Demo = () => {
    return <>
        <Popover
            placement='top'
            content={
                <ul>
                    <li onClick={() => console.log(11111)}>111111</li>
                    <li>222222</li>
                </ul>}>
            <div className='popover-demo'>Popover top</div>
        </Popover>

        <Popover
            placement='topLeft'
            content={
                <ul>
                    <li>111111</li>
                    <li>222222</li>
                    <li>333333</li>
                </ul>}>
            <div className='popover-demo'>Popover topLeft</div>
        </Popover>


        <Popover
            placement='topRight'
            content={
                <ul>
                    <li>111111</li>
                    <li>222222</li>
                </ul>}>
            <div className='popover-demo'>Popover topRight</div>
        </Popover>
    </>;
};

export default Demo;
