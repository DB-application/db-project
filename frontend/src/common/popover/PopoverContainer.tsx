import React, {MutableRefObject, RefObject, useMemo, useRef} from "react"
import {useEventHandler} from "../../core/hooks/useEventHandler"
import {PopoverAlign, PopoverSide} from "./getPopoverPosition"
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
        const onPopoverClick = useRef<boolean>(false)
        const root = useMemo(() => verify(document.getElementById('root')), [])
        useHtmlElementEventHandler('mousedown', root,  () => {
            if (!onPopoverClick.current) {
                closePopover()
            }
        })
        useHtmlElementEventHandler('mouseup', root,  () => {
            onPopoverClick.current = false
        })
        useEventHandler('mousedown', popoverRef, () => {
            onPopoverClick.current = true
        })
        useEventHandler('mouseup', popoverRef, () => {
            onPopoverClick.current = true
        })

        return(
            <div
                className={styles.popoverContainer}
                ref={popoverRef}
            >
                {content}
            </div>
        )
    }
)

export {
    PopoverContainer,
}