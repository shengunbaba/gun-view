import {useEffect} from "react";

const useEventListener = (event: string, target, cb): void => {
    useEffect(() => {
        const lis = (e) => {
            cb?.(e)
        }
        target.addEventListener(event, lis)

        return () => {
            target?.removeEventListener(event, lis)
        }
    }, [])
}

export default useEventListener;
