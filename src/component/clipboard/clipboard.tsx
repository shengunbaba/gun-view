import * as React from 'react'

interface Props {
    copy: string;  //  需要复制的文本
    onChange?: Function   // 复制后的回调
}

const Clipboard: React.FC<Props> = ({children, ...props}) => {

    const {onChange, copy} = props

    const ele: any = React.Children.only(children);

    const onClick = (e) => {

        // 监听复制事件
        document.oncopy = function (e: any) {
            e.clipboardData.setData('text', copy);
            e.preventDefault();
            document.oncopy = null;
        }
        document.execCommand('Copy');

        onChange && onChange(e)
    }

    return React.cloneElement(ele, {onClick})
}

export default Clipboard;
