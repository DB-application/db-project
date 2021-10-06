import {useExternalLayer} from "./useExternalLayer";
import React, {RefObject} from "react";
import {getExternalLayer} from "../layers/externalLayers";
import {useHtmlElementEventHandler} from "./useHtmlElementEventHandler";
import {verify} from "../verify";
import { Popover } from "../../common/popover/Popover";

type PropsType = {
    elementRef: RefObject<any>,
    show: boolean,
    setShow: (show: boolean) => void,
    content: JSX.Element,
}

function usePopover({
    elementRef,
    show,
    setShow,
    content,
}: PropsType) {
    const root = verify(document.getElementById('root'))

    useHtmlElementEventHandler('mousedown', root,  () => setShow(false))

    useExternalLayer({
        layerType: 'popover',
        layer: getExternalLayer('popover'),
        createBinding: () => <Popover
            control={elementRef}
            content={content}
            closePopover={() => setShow(false)}
        />,
        show,
    })
}

export {
    usePopover,
}