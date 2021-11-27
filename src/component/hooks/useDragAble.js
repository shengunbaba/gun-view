import {useRef, useEffect} from "react";
import {throttle} from "../utils";

const useDragAble = (dragAble = true) => {
    const targetRef = useRef(null);
    const handleRef = useRef(null);
    const prePosition = useRef(null);
    const mouseDown = useRef(false);

    useEffect(() => {
        const up = () => {
            if (dragAble) {
                mouseDown.current = false;
                prePosition.current = null;
            }
        }
        document.addEventListener('mouseup', up)
        return () => {
            document.removeEventListener('mouseup', up)
        }
    }, [])


    useEffect(() => {
        handleRef.current.addEventListener('mousedown', () => {
            dragAble && (mouseDown.current = true);
        })
    }, [])

    useEffect(() => {
        const winH = window.innerHeight;
        const winW = window.innerWidth;
        const move = (e) => {
            if (mouseDown.current) {
                if (!prePosition.current) {
                    prePosition.current = {x: e.clientX, y: e.clientY};
                }
                const diffX = e.clientX - prePosition.current.x;
                const diffY = e.clientY - prePosition.current.y;
                prePosition.current = {x: e.clientX, y: e.clientY};
                const target = targetRef.current;
                const initLeft = target.offsetLeft;
                const initTop = target.offsetTop;
                const height = target.offsetHeight;
                const width = target.offsetWidth;
                let top = initTop + diffY;
                let left = initLeft + diffX;

                if (top < height / 2) {
                    top = height / 2
                }
                if (top + height / 2 > winH) {
                    top = winH - height / 2
                }
                if (left < width / 2) {
                    left = width / 2
                }
                if (left + width / 2 > winW) {
                    left = winW - width / 2
                }
                target.style.top = top + 'px';
                target.style.left = left + 'px';
            }
        }

        const _move = throttle(move, 50);
        document.addEventListener('mousemove', _move);

        return () => {
            document.removeEventListener('mousemove', _move);
        }
    }, [])

    return {targetRef, handleRef};
}


export default useDragAble;
