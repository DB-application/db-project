import React, {MutableRefObject, RefObject, useEffect, useMemo, useRef} from 'react'
import styles from './Tooltip.module.css'
import {getPopoverPosition, PopoverAlign, PopoverSide} from "../popover/getPopoverPosition";


type PropsType = {
    text: string,
    elementRef: RefObject<any>,
    side?: PopoverSide,
    align?: PopoverAlign,
}

const Tooltip = React.forwardRef<HTMLDivElement|null, PropsType>(
    ({
        text,
        elementRef,
         side = 'bottom',
         align = 'center',
     }, ref
) => {
    const tooltipRef = ref as MutableRefObject<HTMLDivElement|null>
    useEffect(() => {
        const controlHTML = elementRef.current as HTMLElement
        const controlBounds = controlHTML.getBoundingClientRect()
        const popoverHTML = tooltipRef.current
        if (popoverHTML) {
            const popoverRect = popoverHTML.getBoundingClientRect()
            const position = getPopoverPosition(controlBounds, popoverRect, side, align)
            popoverHTML.style.top = `${position.top}px`
            popoverHTML.style.left = `${position.left}px`
        }
    }, [elementRef, tooltipRef.current, side, align])

    return(
        <div
            ref={ref}
            className={styles.tooltipContainer}
        >
            <span className={styles.text}>
                {text}
            </span>
        </div>
    )
})

export {
    Tooltip,
}