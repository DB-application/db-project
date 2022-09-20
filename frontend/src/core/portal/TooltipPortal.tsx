import {RefObject, useCallback, useRef, useState} from "react";
import {useEventHandler} from "../hooks/useEventHandler";
import {Portal} from "./Portal";
import {Tooltip} from "../../common/tooltip/Tooltip";
import {PopoverAlign, PopoverSide} from "../../common/popover/getPopoverPosition";
import {tooltipAppearAnimation, tooltipHideAnimation} from "../../common/tooltip/tooltipAnimations";
import {useAppearPopover} from "./useAppearPopover";

type PropsType = {
    elementRef: RefObject<any>,
    showTooltip?: boolean,
    text: string,
    side?: PopoverSide,
    align?: PopoverAlign,
}

function TooltipPortal({
    elementRef,
    showTooltip = true,
    text,
    side = 'bottom',
    align = 'center',
}: PropsType) {
    const tooltipRef = useRef<HTMLDivElement|null>(null)
    const [show, setShow] = useState(false)

    useAppearPopover({
        show,
        controlRef: elementRef,
        popoverRef: tooltipRef,
        align,
        side,
        animation: tooltipAppearAnimation
    })

    const _closeTooltipWithAnimation = useCallback(async () => {
        tooltipRef && tooltipRef.current && await tooltipHideAnimation(tooltipRef.current)
        setShow(false)
    }, [tooltipRef])

    let appearTimer: NodeJS.Timeout

    const appearTooltip = useCallback(() => {
        appearTimer = setTimeout(() => setShow(true), 400)
    }, [])

    const closeTooltip = useCallback(() => {
        clearTimeout(appearTimer)
        _closeTooltipWithAnimation()
    }, [])

    useEventHandler('mouseenter', elementRef, appearTooltip)
    useEventHandler('mouseleave', elementRef, closeTooltip)
    useEventHandler('click', elementRef, closeTooltip)

    if (!show || !showTooltip) {
        return null
    }

    return (
        <Portal
            parentId={'tooltip'}
            children={<Tooltip
                text={text}
                align={align}
                side={side}
                ref={tooltipRef}
            />}
        />
    )
}

export {
    TooltipPortal,
}