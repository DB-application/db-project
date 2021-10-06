import {getExternalLayer} from "../layers/externalLayers";
import {useHtmlElementEventHandler} from "./useHtmlElementEventHandler";
import {useExternalLayer} from "./useExternalLayer";

type PropsType = {
    binding: any,
    show: boolean,
    close: () => void,
}

function usePopup({
    binding,
    show,
    close,
}: PropsType) {
    const layer = getExternalLayer('popup')

    function overlayClick(event: Event) {
        !event.defaultPrevented && close()
    }

    useHtmlElementEventHandler('mousedown', layer, overlayClick)

    useExternalLayer({
        layerType: 'popup',
        layer,
        createBinding: () => binding,
        show,
    })
}

export {
    usePopup,
}