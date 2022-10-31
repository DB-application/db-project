import React, {MutableRefObject, RefObject} from "react"
import {PopoverAlign, PopoverSide} from "./getPopoverPosition"
import styles from './Popover.module.css'
import {useCloseLayer} from "../../core/portal/useCloseLayer";

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

        useCloseLayer('popover', popoverRef, closePopover)

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