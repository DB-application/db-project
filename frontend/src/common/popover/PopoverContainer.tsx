import {CSSProperties, RefObject, useMemo, useRef} from "react"
import {useEventHandler} from "../../core/hooks/useEventHandler"
import styles from './Popover.module.css'

type PopoverAlign = 'center' | 'left' | 'right'

type PropsType = {
    control: RefObject<any>,
    content: JSX.Element,
    closePopover: () => void,
    align?: PopoverAlign
}

function getPositionByAlign(elementRect: DOMRect, align: PopoverAlign): CSSProperties|undefined {
    switch (align) {
        case "left":
            return {
                left: elementRect.left + 5,
                top: elementRect.bottom + 5,
            }
        case "center":
            return {
                left: (elementRect.left + elementRect.right) / 2,
                top: elementRect.bottom + 5,
                transform: 'translateX(-50%)',
            }
        case "right":
            return {
                left: elementRect.right - 5,
                top: elementRect.bottom + 5,
                transform: 'translateX(-100%)',
            }
    }
}

function PopoverContainer({
    control,
    content,
    closePopover,
    align = 'left',
}: PropsType) {
    const ref = useRef<HTMLDivElement|null>(null)
    const popoverLayerRef = useRef<HTMLDivElement|null>(null)

    useEventHandler('mousedown', ref, e => {
        e.preventDefault()
    })
    useEventHandler('click', ref, e => {
        if (e.defaultPrevented) {
            closePopover()
        }
        e.preventDefault()
    })
    useEventHandler('mousedown', popoverLayerRef, e => {
        if (!e.defaultPrevented) {
            e.preventDefault()
        }
    })

    const popoverStyle = useMemo(() => {
        const controlHTML = control.current as HTMLElement
        const controlBounds = controlHTML.getBoundingClientRect()
        return getPositionByAlign(controlBounds, align)
    }, [control, align])

    const controlLayerStyle = useMemo(() => {
        const controlHTML = control.current as HTMLElement
        const controlBounds = controlHTML.getBoundingClientRect()
        return {
            left: controlBounds.left,
            top: controlBounds.top,
            height: controlBounds.height,
            width: controlBounds.width,
        }
    }, [control])

    return(
        <div className={styles.popoverLayer} ref={popoverLayerRef}>
            <div
                className={styles.popoverContainer}
                style={popoverStyle}
                ref={ref}
            >
                {content}
            </div>
            <div style={controlLayerStyle} className={styles.controlLayer}/>
        </div>
    )
}

export {
    PopoverContainer,
}

export type {
    PopoverAlign,
}