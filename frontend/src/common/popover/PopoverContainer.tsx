import React, {MutableRefObject, RefObject, useRef} from "react"
import {PopoverAlign, PopoverSide} from "./getPopoverPosition"
import styles from './Popover.module.css'
import {verify} from "../../core/verify";
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
        const popoverLayerRef = useRef(verify(document.getElementById('popover')) as HTMLDivElement)

        useCloseLayer(popoverRef, popoverLayerRef, closePopover)

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