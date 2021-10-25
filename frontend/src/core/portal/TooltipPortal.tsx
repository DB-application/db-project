import {RefObject, useState} from "react";
import {useEventHandler} from "../hooks/useEventHandler";
import {Portal} from "./Portal";
import {Tooltip} from "../../common/tooltip/Tooltip";
import {PopoverAlign, PopoverSide} from "../../common/popover/getPopoverPosition";

type PropsType = {
    elementRef: RefObject<any>,
    showTooltip: boolean,
    text: string,
    side?: PopoverSide,
    align?: PopoverAlign,
}

function TooltipPortal({
    elementRef,
    showTooltip,
    text,
    side,
    align,
}: PropsType) {
    const [show, setShow] = useState(false)

    let appearTimer: NodeJS.Timeout

    function appearTooltip() {
        appearTimer = setTimeout(() => setShow(true), 400)
    }

    function closeTooltip() {
        clearTimeout(appearTimer)
        setShow(false)
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
            />}
        />
    )
}

export {
    TooltipPortal,
}