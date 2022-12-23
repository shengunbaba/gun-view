import * as React from 'react';
import {render} from 'react-dom';
import './index.less'
import Select from './component/select/demo/demo';
import CheckBox from './component/checkbox/demo/demo';
import Modal from './component/modal/demo/demo'
import Clipboard from './component/clipboard/demo/demo'
import ExCoArrow from './component/exCoArrow/demo/demo'
import Tooltip from './component/tooltip/demo/demo'
import Button from './component/button/demo/demo'
import Icon from './component/icon/demo/demo'
import Message from './component/message/demo/demo'
import Radio from "./component/radio/demo/demo";
import Notification from "./component/notification/demo/demo";
import Speaker from "./component/speaker/demo/demo";
import Grid from "./component/grid/demo/demo";
import Carousel from "./component/carousel/demo/demo";

render(
    <ul className='app'>
        <li><Select/></li>
        <li><CheckBox/></li>
        <li><Modal/></li>
        <li><Clipboard/></li>
        <li><ExCoArrow/></li>
        <li className='tool-tip-demo'><Tooltip/></li>
        <li><Button/></li>
        <li><Icon/></li>
        <li><Message/></li>
        <li><Radio/></li>
        <li><Notification/></li>
        <li><Speaker/></li>
        <li><Grid/></li>
        <li><Carousel/></li>
    </ul>
    , document.getElementById('app')
)
