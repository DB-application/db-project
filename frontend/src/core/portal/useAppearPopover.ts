import {RefObject, useLayoutEffect} from "react";
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
    useLayoutEffect(() => {
        if (show) {
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
            }
        }

    }, [show, controlRef, popoverRef.current, side, align])
}

export {
    useAppearPopover,
}