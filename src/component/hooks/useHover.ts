import {useEffect, useRef} from "react";
import {TargetType} from "./type/domTarget";
import type {MutableRefObject} from "react";

export interface Options {
    onEnter?: () => void;
    onLeave?: () => void;
    onChange?: (isHovering: boolean) => void;
}

const useHover = (options: Options): MutableRefObject<TargetType | undefined> => {
    const {onEnter, onLeave, onChange} = options || {};

    const $target = useRef<TargetType | undefined>()

    useEffect(() => {
        $target.current!.addEventListener('mouseenter', () => {
            onEnter?.()
            onChange?.(true);
        })

        $target.current!.addEventListener('mouseleave', () => {
            onLeave?.()
            onChange?.(false);
        })

    }, [])

    return $target
};

export default useHover;
