import React, {RefObject, useMemo} from 'react'
import styles from './Tooltip.module.css'


type PropsType = {
    text: string,
    elementRef: RefObject<any>,
}

function Tooltip({
    text,
    elementRef,
}: PropsType) {
    const position = useMemo(() => {
        const element = elementRef.current as HTMLElement
        const bounds = element.getBoundingClientRect()
        return {
            left: bounds.left + 0.5 * bounds.width,
            top: bounds.bottom + 10 ,
        }
    }, [elementRef])

    return(
        <div
            className={styles.tooltipContainer}
            style={position}
        >
            {text}
        </div>
    )
}

export {
    Tooltip,
}