import * as React from "react";
import cls from 'luban-class'
import "./style.less"
import {prefix} from "../config";

interface Props {
    className?: string
    style?: Object
    effect?: 'scrollx'
    clsPrefix?: string
    children: React.ReactNode[]
    mouseEnterStopRoll?: boolean
}

/**
 *
 * 当activeIndex = length 的时候， 滚动队列 push(firstChild)， 在滚动停止时， 立刻将activeIndex 置为0；
 */
const Carousel: React.FC<Props> = (props) => {
    const {className, style, effect, mouseEnterStopRoll, clsPrefix, children} = props;

    const [activeIndex, setActiveIndex] = React.useState(0);
    const timer: any = React.useRef(null);
    const _activeIndex = React.useRef(activeIndex);
    const length = children.length;

    const firstChild = children[0];
    const _children = [...children];

    React.useEffect(() => {
        setTimer();
        return () => clearInterval(timer.current);
    }, [])

    const setTimer = () => {
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            let _index = _activeIndex.current + 1;
            setActiveIndex(_index)
            if (_index === length) {
                const t = setTimeout(() => {
                    setActiveIndex(0)
                    clearTimeout(t)
                }, 1200)
            }
        }, 6000)
    }
    React.useEffect(() => {
        _activeIndex.current = activeIndex;
    }, [activeIndex])

    if (activeIndex === length) {
        _children.push(firstChild)
    }

    const cls1 = cls(`${clsPrefix}`, {
        [`${className}`]: className,
        [`${clsPrefix}-scrollx`]: effect === 'scrollx',
        // [`${clsPrefix}-fade`]: effect === 'fade'
    })

    const styleContent = {
        width: `${_children.length * 100}%`,
        left: activeIndex * -100 + '%',
    }

    const mouseEnter = () => {
        if (mouseEnterStopRoll) {
            clearInterval(timer.current)
        }
    }

    const mouseLeave = () => {
        if (mouseEnterStopRoll) {
            setTimer()
        }
    }

    return (
        <div className={cls1} style={style}
             onMouseEnter={mouseEnter}
             onMouseLeave={mouseLeave}>
            <div className={cls(`${clsPrefix}-content`, {
                [`${clsPrefix}-content-reset`]: activeIndex === 0 && _activeIndex.current == length
            })} style={styleContent}>
                {
                    React.Children.map(_children, (child, index) => {
                        return (
                            <div className={`${clsPrefix}-item`}
                                 data-index={index}
                                 key={index}>{child}</div>
                        )
                    })
                }
            </div>

            {
                length > 1 &&
                <div className={`${clsPrefix}-tags`}>
                    {
                        React.Children.map(children, (child, index) => {
                            return (
                                <div data-index={index} key={index} onClick={() => setActiveIndex(index)}
                                     className={cls(`${clsPrefix}-tag`, {
                                         [`${clsPrefix}-tag-active`]: activeIndex === index || activeIndex === length && index === 0
                                     })}/>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}

Carousel.defaultProps = {
    clsPrefix: `${prefix}-carousel`,
    mouseEnterStopRoll: true,
    effect: 'scrollx'
}


export default Carousel;
