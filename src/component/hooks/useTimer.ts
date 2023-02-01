import useLatest from "./useLateat";
import {useCallback, useEffect, useRef} from "react";

export const useInterval = (fn: () => void, ms: number) => {
    const $fn = useLatest(fn);
    const $timer = useRef<NodeJS.Timer | undefined>()
    useEffect(() => {
        clearInterval($timer.current)
        $timer.current = setInterval(() => {
            $fn.current()
        }, ms)

    }, [ms])


    return useCallback(() => {
        clearInterval($timer.current)
    }, [])

}

export const useTimeout = (fn: () => void, ms: number) => {
    const $fn = useLatest(fn);
    const $timer = useRef<NodeJS.Timer | undefined>()
    useEffect(() => {
        clearTimeout($timer.current)
        $timer.current = setTimeout(() => {
            $fn.current()
        }, ms)

    }, [ms])


    return useCallback(() => {
        clearTimeout($timer.current)
    }, [])

}
