import {RefObject, useMemo, useRef} from "react"
import {useEventHandler} from "../../core/hooks/useEventHandler"
import styles from './Popover.module.css'

type PropsType = {
    control: RefObject<any>,
    content: JSX.Element,
    closePopover: () => void,
}
function Popover({
     control,
     content,
     closePopover,
}: PropsType) {
    const ref = useRef<HTMLDivElement|null>(null)
    const popoverLayerRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('mousedown', ref, event => event.stopPropagation())
    useEventHandler('click', ref, closePopover)
    useEventHandler('mousedown', popoverLayerRef, closePopover)

    const popoverStyle = useMemo(() => {
        const controlHTML = control.current as HTMLElement
        const controlBounds = controlHTML.getBoundingClientRect()
        return {
            left: controlBounds.left + 5,
            top: controlBounds.bottom + 5,
        }
    }, [control])

    const controlLayerStyle = useMemo(() => {
        const controlHTML = control.current as HTMLElement
        const controlBounds = controlHTML.getBoundingClientRect()
        return {
            left: controlBounds.left,
            top: controlBounds.top,
            height: controlBounds.height,
            width: controlBounds.width,
        }
    }, [control])

    return(
        <div className={styles.popoverLayer} ref={popoverLayerRef}>
            <div
                className={styles.popoverContainer}
                style={popoverStyle}
                ref={ref}
            >
                {content}
            </div>
            <div style={controlLayerStyle} className={styles.controlLayer}/>
        </div>
    )
}

export {
    Popover,
}