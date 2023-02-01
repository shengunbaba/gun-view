import {useRef, useCallback} from 'react';

function useLockFn<P extends any[] = any[]>(fn: (...args: P) => Promise<any>) {
    const lockRef = useRef(false);

    return useCallback(async (...args: P) => {
            if (lockRef.current) return;
            lockRef.current = true;
            try {
                const ret = await fn(...args);
                lockRef.current = false;
                return ret;
            } catch (e) {
                lockRef.current = false;
                throw e;
            }
        },
        [fn],
    );
}

export default useLockFn;
