import {RefObject, useEffect} from "react";


function useEventHandler(eventType: string, ref: RefObject<HTMLElement>, handler: (e: Event) => void) {
    useEffect(() => {
        const elements = ref.current
        elements && elements.addEventListener(eventType, handler)
        return () => {
            elements && elements.removeEventListener(eventType, handler)
        }
    })
}

export {
    useEventHandler,
}