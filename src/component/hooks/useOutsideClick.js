import {useEffect, useRef} from 'react';

const useOutsideClick = (callback) => {

    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback && callback(e);
            }
        }
        window.addEventListener('click', handler)
        return () => {
            window.removeEventListener('click', handler);
        }
    }, [])

    return ref;
}

export default useOutsideClick;
