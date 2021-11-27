export const debounce = (fn, ms) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
            timer = null;
        }
        timer = setTimeout(() => {
            fn(...args);
        }, ms)
    }
}

export const throttle = (fn, ms) => {
    let exec = true;

    return function (...args) {
        if (exec) {
            fn(...args)
            exec = false;
            const t = setTimeout(() => {
                exec = true;
                clearTimeout(t)
            }, ms)
        }
    }
}
