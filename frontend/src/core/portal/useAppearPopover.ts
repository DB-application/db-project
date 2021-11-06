import {RefObject, useLayoutEffect, useRef} from "react";
import {
    getPopoverPosition,
    invertPopoverSide,
    PopoverAlign,
    PopoverSide
} from "../../common/popover/getPopoverPosition";
import {popoverAppearAnimation} from "../../common/popover/popoverHideAnimation";


function useAppearPopover(
    show: boolean,
    controlRef: RefObject<HTMLElement|null>,
    popoverRef: RefObject<HTMLElement|null>,
    align: PopoverAlign,
    side: PopoverSide,
) {
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
                popoverHTML.style.top = `${position.top}px`
                popoverHTML.style.left = `${position.left}px`
                popoverAppearAnimation(popoverHTML)
                    .then(() => appearedRef.current = true)
            }
        }
        else {
            appearedRef.current = false
        }

    }, [show, controlRef, popoverRef, popoverRef.current, side, align])
}

export {
    useAppearPopover,
}