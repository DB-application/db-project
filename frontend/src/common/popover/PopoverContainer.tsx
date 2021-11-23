import React, {MutableRefObject, RefObject, useEffect, useMemo, useRef} from "react"
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
        const popoverLayer = useMemo(() => verify(document.getElementById('popover')), [])
        useHtmlElementEventHandler('mousedown', document,  e => {
            const target = e.target as Node
            const isPopover = popoverLayer.contains(target)
            const compareResult = target.compareDocumentPosition(verify(popoverRef.current))
            if (compareResult != 8) {
                if (!isPopover || compareResult == 4) {
                    closePopover()
                }
            }
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