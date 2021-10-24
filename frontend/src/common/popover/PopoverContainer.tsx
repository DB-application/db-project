import {CSSProperties, RefObject, useEffect, useMemo, useRef} from "react"
import {useEventHandler} from "../../core/hooks/useEventHandler"
import {getPopoverPosition, PopoverAlign, PopoverSide} from "./getPopoverPosition"
import styles from './Popover.module.css'

type PropsType = {
    control: RefObject<any>,
    content: JSX.Element,
    closePopover: () => void,
    align?: PopoverAlign,
    side?: PopoverSide,
}

function PopoverContainer({
    control,
    content,
    closePopover,
    align = 'left',
    side = 'bottom',
}: PropsType) {
    const ref = useRef<HTMLDivElement|null>(null)
    const popoverLayerRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('mousedown', ref, e => {
        e.preventDefault()
    })
    useEventHandler('mousedown', popoverLayerRef, e => {
        if (!e.defaultPrevented) {
            e.preventDefault()
        }
    })

    useEffect(() => {
        const controlHTML = control.current as HTMLElement
        const controlBounds = controlHTML.getBoundingClientRect()
        const popoverHTML = ref.current
        if (popoverHTML) {
            const popoverRect = popoverHTML.getBoundingClientRect()
            const position = getPopoverPosition(controlBounds, popoverRect, side, align)
            popoverHTML.style.top = `${position.top}px`
            popoverHTML.style.left = `${position.left}px`
        }
    }, [control.current, ref.current, side, align])

    return(
        <div className={styles.popoverLayer} ref={popoverLayerRef}>
            <div
                className={styles.popoverContainer}
                ref={ref}
            >
                {content}
            </div>
        </div>
    )
}

export {
    PopoverContainer,
}