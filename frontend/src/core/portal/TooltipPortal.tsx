import {RefObject, useRef, useState} from "react";
import {useEventHandler} from "../hooks/useEventHandler";
import {Portal} from "./Portal";
import {Tooltip} from "../../common/tooltip/Tooltip";
import {PopoverAlign, PopoverSide} from "../../common/popover/getPopoverPosition";
import {tooltipHideAnimation} from "../../common/tooltip/tooltipAnimations";
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

    useAppearPopover(show, elementRef, tooltipRef, align, side)

    const _closeTooltipWithAnimation = async () => {
        tooltipRef && tooltipRef.current && await tooltipHideAnimation(tooltipRef.current)
        setShow(false)
    }

    let appearTimer: NodeJS.Timeout

    function appearTooltip() {
        appearTimer = setTimeout(() => setShow(true), 400)
    }

    function closeTooltip() {
        clearTimeout(appearTimer)
        _closeTooltipWithAnimation()
    }

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
                elementRef={elementRef}
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