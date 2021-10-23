import {RefObject, useState} from "react";
import {useEventHandler} from "../hooks/useEventHandler";
import {Portal} from "./Portal";
import {Tooltip} from "../../common/tooltip/Tooltip";

type PropsType = {
    elementRef: RefObject<any>,
    showTooltip: boolean,
    text: string,
}

function TooltipPortal({
    elementRef,
    showTooltip,
    text,
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
            />}
        />
    )
}

export {
    TooltipPortal,
}