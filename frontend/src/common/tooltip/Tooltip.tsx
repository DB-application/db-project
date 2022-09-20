import React, {MutableRefObject, RefObject, useEffect, useMemo, useRef} from 'react'
import styles from './Tooltip.module.css'
import {getPopoverPosition, PopoverAlign, PopoverSide} from "../popover/getPopoverPosition";


type PropsType = {
    text: string,
    side?: PopoverSide,
    align?: PopoverAlign,
}

const Tooltip = React.forwardRef<HTMLDivElement|null, PropsType>(
    ({
        text,
        side = 'bottom',
        align = 'center',
     }, ref
) => {
    return(
        <div
            ref={ref}
            className={styles.tooltipContainer}
        >
            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
})

export {
    Tooltip,
}