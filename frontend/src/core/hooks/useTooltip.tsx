import {RefObject, useState} from "react";
import {Tooltip} from "../../common/tooltip/Tooltip";
import {useEventHandler} from "./useEventHandler";
import {useExternalLayer} from "./useExternalLayer";
import {getExternalLayer} from "../layers/externalLayers";

type PropsType = {
    elementRef: RefObject<any>,
    showTooltip: boolean,
    text: string,
}

function useTooltip({
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

    useExternalLayer({
        layerType: 'tooltip',
        layer: getExternalLayer('tooltip'),
        createBinding: () => <Tooltip
            text={text}
            elementRef={elementRef}
        />,
        show: show && showTooltip,
    })
}

export {
    useTooltip,
}

