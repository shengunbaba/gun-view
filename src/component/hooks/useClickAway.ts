import {useEffect, useRef} from 'react';

const useClickAway = (callback) => {

    const ref = useRef<HTMLElement | Element>(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback && callback(e);
            }
        };
        window.addEventListener('click', handler);
        return () => {
            window.removeEventListener('click', handler);
        };
    }, []);

    return ref;
};

export default useClickAway;
