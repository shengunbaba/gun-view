import * as React from 'react';
import { CTX } from './utils';
import Option from './option';
import './style.less'
import { prefix } from '../config'
import cls from 'luban-class'
import { ReactElement } from "react";
import * as icons from './arrow'

const { ArrowIcon, SearchIcon } = icons

interface Props {
    className ? : string
    value: string
    onChange ? : Function
    perfixCls ? : string
    style ? : any
    showSearch ? : boolean
}

interface ExProps extends React.FC < Props > {
    Option: typeof Option
}

const Select: ExProps = ({ children, ...props }) => {

    const { value, onChange, className, perfixCls, style, showSearch } = props

    const [active, setActive] = React.useState < string > (value)
    const [show, setShow] = React.useState < boolean > (false)
    const [viewData, setViewData] = React.useState < string > ('')
    const [searchValue, setSearchValue] = React.useState < string > ('')

    React.useEffect(() => {
        React.Children.forEach(children, (child: React.ReactElement) => {
            if (child.props.value == value) {
                setViewData(child.props.children as string)
            }
        })
    }, [value])


    const _onChange = (val, e) => {
        console.log(val)
        React.Children.forEach(children, (child: React.ReactElement) => {
            if (child.props.value == val) {
                setViewData(child.props.children)
                setActive(val)
            }
        })
        setShow(false)
        onChange && onChange(val, e)
    }
    const ctxValue = {
        _onChange,
        _active: active
    }

    const onSelectChange = (e) => {
        setShow(!show)
    }

    const onBlur = (e) => {
        setShow(false)
        setSearchValue('')
    }

    const oninputChange = (e) => {
        const value = e.target.value.trim();
        setSearchValue(value)
    }

    const renderChildren = (function() {
        if (showSearch) {
            const result: React.ReactElement[] = [];
            React.Children.map(children, (child: ReactElement) => {
                if (child.props.children.includes(searchValue)) {
                    result.push(child)
                }
            })
            return result
        } else {
            return children
        }
    })()
    const inputCls = cls(`${perfixCls}-input`, {
        [`${perfixCls}-input-hide`]: !showSearch || showSearch && !show
    })
    const dropCls = cls(`${perfixCls}-drop`, `${prefix}-scrollbar`, {
        [`${perfixCls}-drop-show`]: show,
        [`${perfixCls}-drop-hide`]: !show
    })
    return (
        <CTX.Provider value={ctxValue}>
            <div className={className ? `${className} ${perfixCls}` : perfixCls} style={style}>
                <div onClick={onSelectChange} className={`${perfixCls}-view`}>
                    <input type="text"
                           className={inputCls}
                           readOnly={!showSearch}
                           onChange={oninputChange}
                           onBlur={onBlur}
                           placeholder={viewData}/>
                    <span>{viewData}</span>
                    {
                        showSearch && show ?
                            <i className={`${perfixCls}-isearch`}>{SearchIcon}</i> :
                            <i className={show ? `${perfixCls}-iup` : ''}>{ArrowIcon}</i>
                    }
                </div>
                <div className={dropCls}>
                    {show && renderChildren}
                </div>
            </div>
        </CTX.Provider>
    )
}

Select.defaultProps = {
    perfixCls: `${prefix}-select`,
    showSearch: false
}

Select.Option = Option;

export default Select;