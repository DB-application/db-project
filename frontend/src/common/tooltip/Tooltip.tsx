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