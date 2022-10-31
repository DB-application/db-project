import {RefObject, useLayoutEffect, useRef} from "react";
import {
    checkScreenOverflowPosition,
    getPopoverPosition,
    invertPopoverSide,
    PopoverAlign,
    PopoverSide
} from "../../common/popover/getPopoverPosition";

type UseAppearPopoverProps = {
    show: boolean,
    controlRef: RefObject<HTMLElement|null>,
    popoverRef: RefObject<HTMLElement|null>,
    align: PopoverAlign,
    side: PopoverSide,
    animation: (element: HTMLElement) => Promise<any>
}

function useAppearPopover({
    show,
    controlRef,
    popoverRef,
    align,
    side,
    animation
}: UseAppearPopoverProps) {
    const appearedRef = useRef<boolean>(false)
    useLayoutEffect(() => {
        if (show && !appearedRef.current) {
            const controlHTML = controlRef.current
            const popoverHTML = popoverRef.current
            if (popoverHTML && controlHTML) {
                const controlBounds = controlHTML.getBoundingClientRect()
                const popoverRect = popoverHTML.getBoundingClientRect()
                const popoverInfo = {side, align}
                invertPopoverSide(controlBounds, popoverRect, popoverInfo)
                const position = getPopoverPosition(controlBounds, popoverRect, popoverInfo.side, popoverInfo.align)
                checkScreenOverflowPosition(position, popoverRect)
                popoverHTML.style.top = `${position.top}px`
                popoverHTML.style.left = `${position.left}px`
                animation(popoverHTML)
                    .then(() => appearedRef.current = true)
            }
        }
        else {
            appearedRef.current = false
        }

    }, [show, controlRef, popoverRef, popoverRef.current, side, align, animation])
}

export {
    useAppearPopover,
}