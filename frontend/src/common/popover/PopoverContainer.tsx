import React, {MutableRefObject, RefObject, useEffect, useMemo, useRef} from "react"
import {useEventHandler} from "../../core/hooks/useEventHandler"
import {getPopoverPosition, invertPopoverSide, PopoverAlign, PopoverSide} from "./getPopoverPosition"
import styles from './Popover.module.css'
import {verify} from "../../core/verify";
import {useHtmlElementEventHandler} from "../../core/hooks/useHtmlElementEventHandler";

type PropsType = {
    control: RefObject<any>,
    content: JSX.Element,
    closePopover: () => void,
    align?: PopoverAlign,
    side?: PopoverSide,
}

const PopoverContainer = React.forwardRef<HTMLDivElement, PropsType>(
({
        closePopover,
        align = 'center',
        side = 'bottom',
        control,
        content,
    }, ref) => {
    const popoverRef = ref as MutableRefObject<HTMLDivElement|null>
    const root = useMemo(() => verify(document.getElementById('root')), [])
    useHtmlElementEventHandler('mousedown', root,  (event) => {
        if (!event.defaultPrevented) {
            closePopover()
        }
    })

    useEventHandler('mousedown', popoverRef, e => {
        e.preventDefault()
    })

    useEffect(() => {
        const controlHTML = control.current
        const popoverHTML = popoverRef.current
        if (popoverHTML && controlHTML) {
            const controlBounds = controlHTML.getBoundingClientRect()
            const popoverRect = popoverHTML.getBoundingClientRect()
            const popoverInfo = {side, align}
            invertPopoverSide(controlBounds, popoverRect, popoverInfo)
            const position = getPopoverPosition(controlBounds, popoverRect, popoverInfo.side, popoverInfo.align)
            popoverHTML.style.top = `${position.top}px`
            popoverHTML.style.left = `${position.left}px`
        }
    }, [control, popoverRef.current, side, align])

    return(
        <div
            className={styles.popoverContainer}
            ref={popoverRef}
        >
            {content}
        </div>
    )
}

export {
    PopoverContainer,
}