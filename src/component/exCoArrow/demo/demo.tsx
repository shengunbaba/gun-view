import * as React from 'react';
import {ExCoArrow} from 'gun-view'

const Demo = () => {
    const [downward, setDownward] = React.useState(false)
    const onchange = (e) => {
        console.log(e)
        setDownward(!downward)
    }
    return (
        <ExCoArrow onChange={onchange} color='red' downward={downward}/>
    )
}

export default React.memo(Demo);
