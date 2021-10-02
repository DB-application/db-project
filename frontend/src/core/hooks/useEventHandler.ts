import {RefObject, useEffect} from "react";


function useEventHandler(eventType: string, ref: RefObject<HTMLElement>, handler: (e: Event) => void) {
    useEffect(() => {
        ref.current && ref.current.addEventListener(eventType, handler)
        return () => {
            ref.current && ref.current.removeEventListener(eventType, handler)
        }
    })
}

export {
    useEventHandler,
}