import React, {RefObject, useEffect, useMemo, useRef} from 'react'
import styles from './Tooltip.module.css'
import {getPopoverPosition, PopoverAlign, PopoverSide} from "../popover/getPopoverPosition";


type PropsType = {
    text: string,
    elementRef: RefObject<any>,
    side?: PopoverSide,
    align?: PopoverAlign,
}

function Tooltip({
    text,
    elementRef,
    side = 'bottom',
    align = 'center',
}: PropsType) {
    const popoverRef = useRef<HTMLDivElement|null>(null)

    useEffect(() => {
        const controlHTML = elementRef.current as HTMLElement
        const controlBounds = controlHTML.getBoundingClientRect()
        const popoverHTML = popoverRef.current
        if (popoverHTML) {
            const popoverRect = popoverHTML.getBoundingClientRect()
            const position = getPopoverPosition(controlBounds, popoverRect, side, align)
            popoverHTML.style.top = `${position.top}px`
            popoverHTML.style.left = `${position.left}px`
        }
    }, [elementRef, popoverRef.current, side, align])

    return(
        <div
            ref={popoverRef}
            className={styles.tooltipContainer}
        >
            {text}
        </div>
    )
}

export {
    Tooltip,
}